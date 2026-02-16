#!/usr/bin/env node
/**
 * Merge fixed options from fixes-XX.json back into set-XX.js data files.
 * Usage: node merge-fixes.js <set-number>
 * E.g.: node merge-fixes.js 01
 */
'use strict';

var fs = require('fs');
var vm = require('vm');
var path = require('path');

var setNum = process.argv[2];
if (!setNum) {
  console.error('Usage: node merge-fixes.js <set-number>');
  process.exit(1);
}

var dataDir = path.join(__dirname, '..', 'data');
var fixFile = path.join(__dirname, 'fixes-' + setNum + '.json');
var srcFile = path.join(dataDir, 'set-' + setNum + '.js');

if (!fs.existsSync(fixFile)) {
  console.error('Fixes file not found: ' + fixFile);
  process.exit(1);
}

var fixes = JSON.parse(fs.readFileSync(fixFile, 'utf8'));
var code = fs.readFileSync(srcFile, 'utf8');

// Parse original to get question index mapping
var sandbox = {};
vm.runInNewContext(code, sandbox);
var origQuestions = sandbox.questions;

// Build a map from question id to fix
var fixMap = {};
for (var i = 0; i < fixes.length; i++) {
  fixMap[fixes[i].id] = fixes[i];
}

// Process the file line by line, replacing options
var lines = code.split('\n');
var output = [];
var currentQId = null;
var inOptions = false;
var optionLines = [];
var bracketDepth = 0;
var qIndex = -1;

for (var li = 0; li < lines.length; li++) {
  var line = lines[li];

  // Track current question by id field
  var idMatch = line.match(/^\s*id:\s*"(s\d{2}-q\d{3})"/);
  if (idMatch) {
    currentQId = idMatch[1];
    qIndex++;
  }

  // Detect start of options array
  if (/^\s*options:\s*\[/.test(line) && !inOptions) {
    var fix = currentQId ? fixMap[currentQId] : null;

    if (fix && fix.options && fix.options.length === 4) {
      inOptions = true;
      optionLines = [];
      bracketDepth = 0;

      // Count brackets
      for (var ci = 0; ci < line.length; ci++) {
        if (line[ci] === '[') bracketDepth++;
        if (line[ci] === ']') bracketDepth--;
      }

      if (bracketDepth <= 0) {
        // Single-line options - replace entire line
        var indent = line.match(/^(\s*)/)[1];
        var newLine = indent + 'options: [';
        for (var oi = 0; oi < 4; oi++) {
          var escaped = fix.options[oi].replace(/\\/g, '\\\\').replace(/"/g, '\\"');
          newLine += '\n' + indent + '  "' + escaped + '"' + (oi < 3 ? ',' : '');
        }
        newLine += '\n' + indent + '],';
        output.push(newLine);
        inOptions = false;
      } else {
        optionLines.push(line);
      }
      continue;
    }
    // No fix needed, pass through
    output.push(line);
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
      var fix = currentQId ? fixMap[currentQId] : null;

      if (fix && fix.options && fix.options.length === 4) {
        var indent = optionLines[0].match(/^(\s*)/)[1];
        output.push(indent + 'options: [');
        for (var oi = 0; oi < 4; oi++) {
          var escaped = fix.options[oi].replace(/\\/g, '\\\\').replace(/"/g, '\\"');
          output.push(indent + '  "' + escaped + '"' + (oi < 3 ? ',' : ''));
        }
        output.push(indent + '],');
      } else {
        for (var oli = 0; oli < optionLines.length; oli++) {
          output.push(optionLines[oli]);
        }
      }
    }
    continue;
  }

  output.push(line);
}

fs.writeFileSync(srcFile, output.join('\n'));

// Verify the result
var verifySandbox = {};
vm.runInNewContext(fs.readFileSync(srcFile, 'utf8'), verifySandbox);
var vqs = verifySandbox.questions;
var applied = 0;
var correctLongest = 0;
var outsideTol = 0;

for (var i = 0; i < vqs.length; i++) {
  var q = vqs[i];
  var lengths = q.options.map(function(o) { return o.length; });
  var avgLen = lengths.reduce(function(a, b) { return a + b; }, 0) / 4;
  var maxLen = Math.max.apply(null, lengths);

  if (q.options.length !== 4) {
    console.error('ERROR: ' + q.id + ' has ' + q.options.length + ' options!');
  }

  if (lengths[q.answer] === maxLen && lengths.filter(function(l) { return l === maxLen; }).length === 1) {
    correctLongest++;
  }

  var outside = false;
  for (var j = 0; j < 4; j++) {
    if (Math.abs(lengths[j] - avgLen) / avgLen > 0.10) { outside = true; break; }
  }
  if (outside) outsideTol++;

  if (fixMap[q.id]) applied++;
}

console.log('Set ' + setNum + ': ' + applied + ' fixes applied');
console.log('  correct=longest: ' + correctLongest + '/100');
console.log('  outside 10% tolerance: ' + outsideTol + '/100');
console.log('  file: ' + srcFile);
