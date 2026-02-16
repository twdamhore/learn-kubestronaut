#!/usr/bin/env node
/**
 * For each set, ensure the correct answer is the longest option
 * approximately 25% of the time by slightly padding the correct
 * answer text with natural-sounding suffixes.
 *
 * For questions where correct should NOT be longest, pad the
 * longest wrong answer slightly if needed.
 */
'use strict';

var fs = require('fs');
var vm = require('vm');
var path = require('path');

var file = process.argv[2];
if (!file) {
  console.error('Usage: node pad-correct.js <set-file>');
  process.exit(1);
}

var filePath = path.resolve(file);
var code = fs.readFileSync(filePath, 'utf8');
var sandbox = {};
vm.runInNewContext(code, sandbox);
var questions = sandbox.questions;

// Natural suffixes to pad correct answers when we want them longest
var correctPads = [
  ' in this scenario',
  ' for this workload',
  ' in this configuration',
  ' as described here',
  ' in this situation',
  ' in such a case',
  ' under these conditions',
  ' for this use case',
  ' in this particular case',
  ' when configured this way',
  ' based on these requirements',
  ' given the described setup',
  ' in this cluster setup',
  ' for this environment',
  ' in the given context'
];

// Natural suffixes to pad wrong answers when correct should NOT be longest
var wrongPads = [
  ', although this could vary',
  ', based on cluster defaults',
  ', depending on configuration',
  ', regardless of the setup',
  ', which affects all workloads',
  ', as per the specification',
  ', during the reconciliation',
  ', from the control plane',
  ', in the default namespace',
  ', across all cluster nodes',
  ', according to the manifest',
  ', per the API specification',
  ', following standard practice',
  ', within the given namespace',
  ', for all running containers'
];

// Seeded random
var seed = 42 + parseInt(path.basename(filePath).replace(/\D/g, ''), 10);
function rand() {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
}
function pick(arr) { return arr[Math.floor(rand() * arr.length)]; }
function shuffleIndices(n) {
  var a = [];
  for (var i = 0; i < n; i++) a.push(i);
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(rand() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

// Analyze current state
function countLongest() {
  var count = 0;
  for (var i = 0; i < questions.length; i++) {
    var q = questions[i];
    var lens = q.options.map(function(o) { return o.length; });
    if (lens[q.answer] >= Math.max.apply(null, lens)) count++;
  }
  return count;
}

var before = countLongest();
console.log('Before: correct=longest ' + before + '/100');

// Target: 23-27 where correct is longest
var TARGET = 25;
var indices = shuffleIndices(questions.length);

if (before < TARGET) {
  // Need to make correct the longest in more questions
  var needed = TARGET - before;
  var done = 0;
  for (var idx = 0; idx < indices.length && done < needed; idx++) {
    var qi = indices[idx];
    var q = questions[qi];
    var lens = q.options.map(function(o) { return o.length; });
    var maxLen = Math.max.apply(null, lens);

    // Skip if correct is already longest
    if (lens[q.answer] >= maxLen) continue;

    // Pad correct answer to be longest by a small margin
    var gap = maxLen - lens[q.answer] + 2;
    var suffix = pick(correctPads);
    // Trim suffix to just enough chars if it's too long
    if (suffix.length > gap + 15) {
      suffix = suffix.substring(0, gap + 5);
    }
    q.options[q.answer] = q.options[q.answer] + suffix;
    done++;
  }
} else if (before > TARGET + 3) {
  // Need to make correct NOT the longest in some questions
  var excess = before - TARGET;
  var done = 0;
  for (var idx = 0; idx < indices.length && done < excess; idx++) {
    var qi = indices[idx];
    var q = questions[qi];
    var lens = q.options.map(function(o) { return o.length; });
    var maxLen = Math.max.apply(null, lens);

    // Skip if correct is not the longest
    if (lens[q.answer] < maxLen) continue;

    // Find a wrong answer and pad it to be longer than correct
    for (var j = 0; j < 4; j++) {
      if (j !== q.answer) {
        var suffix = pick(wrongPads);
        q.options[j] = q.options[j] + suffix;
        break;
      }
    }
    done++;
  }
}

var after = countLongest();
console.log('After:  correct=longest ' + after + '/100');

// Write back to file by replacing option strings
// Re-read original for comparison
var origSandbox = {};
vm.runInNewContext(code, origSandbox);

var lines = code.split('\n');
var output = [];
var qIndex = 0;
var inOptions = false;
var optionLines = [];
var bracketDepth = 0;

for (var li = 0; li < lines.length; li++) {
  var line = lines[li];

  if (/^\s*options:\s*\[/.test(line) && !inOptions) {
    inOptions = true;
    optionLines = [];
    bracketDepth = 0;
    for (var ci = 0; ci < line.length; ci++) {
      if (line[ci] === '[') bracketDepth++;
      if (line[ci] === ']') bracketDepth--;
    }
    if (bracketDepth <= 0) {
      inOptions = false;
      output.push(line);
      qIndex++;
    } else {
      optionLines.push(line);
    }
    continue;
  }

  if (inOptions) {
    optionLines.push(line);
    for (var ci = 0; ci < line.length; ci++) {
      if (line[ci] === '[') bracketDepth++;
      if (line[ci] === ']') bracketDepth--;
    }
    if (bracketDepth <= 0) {
      inOptions = false;

      if (qIndex < questions.length) {
        var q = questions[qIndex];
        var indent = optionLines[0].match(/^(\s*)/)[1];
        output.push(indent + 'options: [');
        for (var oi = 0; oi < 4; oi++) {
          var escaped = q.options[oi].replace(/\\/g, '\\\\').replace(/"/g, '\\"');
          output.push(indent + '  "' + escaped + '"' + (oi < 3 ? ',' : ''));
        }
        output.push(indent + '],');
      } else {
        for (var oli = 0; oli < optionLines.length; oli++) {
          output.push(optionLines[oli]);
        }
      }
      qIndex++;
      continue;
    }
    continue;
  }

  output.push(line);
}

fs.writeFileSync(filePath, output.join('\n'));
console.log('File updated: ' + filePath);
