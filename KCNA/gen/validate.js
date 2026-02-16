#!/usr/bin/env node
// Structural validator for KCNA practice exam data files
'use strict';

var fs = require('fs');
var path = require('path');
var vm = require('vm');

var dataDir = path.join(__dirname, '..', 'data');
var issues = [];
var totalQuestions = 0;
var allIds = new Set();
var globalAnswerDist = [0, 0, 0, 0];

var EXPECTED_DOMAINS = {
  'Kubernetes Fundamentals': 46,
  'Container Orchestration': 22,
  'Cloud Native Architecture': 16,
  'Cloud Native Observability': 8,
  'Cloud Native Application Delivery': 8
};

for (var s = 1; s <= 10; s++) {
  var setNum = s < 10 ? '0' + s : '' + s;
  var file = path.join(dataDir, 'set-' + setNum + '.js');

  if (!fs.existsSync(file)) {
    issues.push('[set-' + setNum + '] FILE MISSING: ' + file);
    continue;
  }

  var code = fs.readFileSync(file, 'utf8');
  var sandbox = {};
  try {
    vm.runInNewContext(code, sandbox);
  } catch (e) {
    issues.push('[set-' + setNum + '] PARSE ERROR: ' + e.message);
    continue;
  }

  // Check globals
  if (sandbox.EXAM_SET !== s) {
    issues.push('[set-' + setNum + '] EXAM_SET=' + sandbox.EXAM_SET + ', expected ' + s);
  }
  if (!sandbox.EXAM_TITLE || typeof sandbox.EXAM_TITLE !== 'string') {
    issues.push('[set-' + setNum + '] EXAM_TITLE missing or not a string');
  }
  if (!Array.isArray(sandbox.questions)) {
    issues.push('[set-' + setNum + '] questions is not an array');
    continue;
  }

  var qs = sandbox.questions;
  if (qs.length !== 100) {
    issues.push('[set-' + setNum + '] Question count: ' + qs.length + ', expected 100');
  }
  totalQuestions += qs.length;

  // Domain distribution
  var domainCounts = {};
  var answerDist = [0, 0, 0, 0];
  var setIds = new Set();
  var svgCount = 0;
  var verifyCount = 0;
  var idPattern = new RegExp('^s' + setNum + '-q\\d{3}$');

  for (var i = 0; i < qs.length; i++) {
    var q = qs[i];
    var prefix = '[set-' + setNum + ' q' + (i + 1) + '] ';

    // ID checks
    if (!q.id) {
      issues.push(prefix + 'Missing id');
    } else {
      if (!idPattern.test(q.id)) {
        issues.push(prefix + 'ID format wrong: "' + q.id + '" (expected s' + setNum + '-qNNN)');
      }
      if (setIds.has(q.id)) {
        issues.push(prefix + 'Duplicate ID within set: ' + q.id);
      }
      setIds.add(q.id);
      if (allIds.has(q.id)) {
        issues.push(prefix + 'Duplicate ID across sets: ' + q.id);
      }
      allIds.add(q.id);
    }

    // Required fields
    if (!q.text || typeof q.text !== 'string') {
      issues.push(prefix + 'Missing or empty text');
    } else if (q.text.length < 30) {
      issues.push(prefix + 'Question text suspiciously short (' + q.text.length + ' chars)');
    }

    if (!Array.isArray(q.options)) {
      issues.push(prefix + 'options is not an array');
    } else if (q.options.length !== 4) {
      issues.push(prefix + 'Options count: ' + q.options.length + ', expected 4');
    } else {
      for (var j = 0; j < q.options.length; j++) {
        if (!q.options[j] || typeof q.options[j] !== 'string') {
          issues.push(prefix + 'Option ' + j + ' is empty or not a string');
        }
      }
      // Check for duplicate options
      var optSet = new Set(q.options.map(function(o) { return o.toLowerCase().trim(); }));
      if (optSet.size !== q.options.length) {
        issues.push(prefix + 'Duplicate options detected');
      }
    }

    if (typeof q.answer !== 'number' || q.answer < 0 || q.answer > 3) {
      issues.push(prefix + 'Invalid answer index: ' + q.answer);
    } else {
      answerDist[q.answer]++;
      globalAnswerDist[q.answer]++;
    }

    if (!q.explanation || typeof q.explanation !== 'string') {
      issues.push(prefix + 'Missing or empty explanation');
    } else if (q.explanation.length < 20) {
      issues.push(prefix + 'Explanation suspiciously short (' + q.explanation.length + ' chars)');
    }

    if (!q.domain || typeof q.domain !== 'string') {
      issues.push(prefix + 'Missing domain');
    } else if (!EXPECTED_DOMAINS.hasOwnProperty(q.domain)) {
      issues.push(prefix + 'Unknown domain: "' + q.domain + '"');
    }

    domainCounts[q.domain] = (domainCounts[q.domain] || 0) + 1;

    if (q.diagram) svgCount++;
    if (q.verify) verifyCount++;

    // Check SVG validity (basic)
    if (q.diagram && typeof q.diagram === 'string') {
      if (q.diagram.indexOf('<svg') === -1) {
        issues.push(prefix + 'diagram field does not contain <svg> tag');
      }
      if (q.diagram.indexOf('</svg>') === -1) {
        issues.push(prefix + 'diagram field missing closing </svg> tag');
      }
    }

    // Check verify command format
    if (q.verify && typeof q.verify === 'string') {
      var tools = ['kubectl','microk8s','curl','helm','cat','grep','crictl','etcdctl',
        'nslookup','fluxctl','flux','argocd','tekton','trivy','cosign','istioctl',
        'velero','kubeadm','ctr','runc','docker','git','ls','systemctl','logcli'];
      var found = false;
      for (var ti = 0; ti < tools.length; ti++) {
        if (q.verify.indexOf(tools[ti]) !== -1) { found = true; break; }
      }
      if (!found) {
        issues.push(prefix + 'verify command has no recognizable CLI tool: "' + q.verify.substring(0, 60) + '"');
      }
    }

    // Check difficulty range
    if (q.difficulty !== undefined) {
      if (typeof q.difficulty !== 'number' || q.difficulty < 50 || q.difficulty > 100) {
        issues.push(prefix + 'difficulty out of range: ' + q.difficulty);
      }
    }
  }

  // Domain distribution check
  for (var d in EXPECTED_DOMAINS) {
    var actual = domainCounts[d] || 0;
    var expected = EXPECTED_DOMAINS[d];
    if (actual !== expected) {
      issues.push('[set-' + setNum + '] Domain "' + d + '": got ' + actual + ', expected ' + expected);
    }
  }

  // Answer distribution check
  var ansMin = Math.min.apply(null, answerDist);
  var ansMax = Math.max.apply(null, answerDist);
  if (ansMax - ansMin > 10) {
    issues.push('[set-' + setNum + '] Answer distribution imbalanced: A=' + answerDist[0] + ' B=' + answerDist[1] + ' C=' + answerDist[2] + ' D=' + answerDist[3]);
  }

  // Lab exercises check
  if (!Array.isArray(sandbox.labExercises)) {
    issues.push('[set-' + setNum + '] labExercises is not an array');
  } else if (sandbox.labExercises.length < 4) {
    issues.push('[set-' + setNum + '] Only ' + sandbox.labExercises.length + ' lab exercises (expected 6)');
  } else {
    for (var k = 0; k < sandbox.labExercises.length; k++) {
      var lab = sandbox.labExercises[k];
      if (!lab.title) issues.push('[set-' + setNum + '] Lab ' + (k+1) + ': missing title');
      if (!lab.description) issues.push('[set-' + setNum + '] Lab ' + (k+1) + ': missing description');
      if (!lab.commands) issues.push('[set-' + setNum + '] Lab ' + (k+1) + ': missing commands');
      if (!lab.expected && !lab.expectedOutput) issues.push('[set-' + setNum + '] Lab ' + (k+1) + ': missing expected/expectedOutput');
    }
  }

  console.log('Set ' + setNum + ': ' + qs.length + ' questions, ' + svgCount + ' SVGs, ' + verifyCount + ' verify cmds, ' +
    'answer dist A=' + answerDist[0] + ' B=' + answerDist[1] + ' C=' + answerDist[2] + ' D=' + answerDist[3] +
    ', labs=' + (sandbox.labExercises ? sandbox.labExercises.length : 0));
}

console.log('\n=== TOTALS ===');
console.log('Total questions: ' + totalQuestions);
console.log('Global answer dist: A=' + globalAnswerDist[0] + ' B=' + globalAnswerDist[1] + ' C=' + globalAnswerDist[2] + ' D=' + globalAnswerDist[3]);
console.log('Unique IDs: ' + allIds.size);

if (issues.length === 0) {
  console.log('\n✓ ALL CHECKS PASSED - No issues found');
} else {
  console.log('\n=== ISSUES (' + issues.length + ') ===');
  for (var x = 0; x < issues.length; x++) {
    console.log('  ' + issues[x]);
  }
}

process.exit(issues.length > 0 ? 1 : 0);
