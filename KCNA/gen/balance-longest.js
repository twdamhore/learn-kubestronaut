#!/usr/bin/env node
/**
 * Rebalances which option is longest so that the correct answer
 * is the longest option ~25% of the time (random chance).
 *
 * Since all options are already within ~10% length tolerance,
 * this just swaps option positions to redistribute which one
 * happens to be longest.
 */
'use strict';

var fs = require('fs');
var vm = require('vm');
var path = require('path');

var file = process.argv[2];
if (!file) {
  console.error('Usage: node balance-longest.js <set-file>');
  process.exit(1);
}

var filePath = path.resolve(file);
var code = fs.readFileSync(filePath, 'utf8');
var sandbox = {};
vm.runInNewContext(code, sandbox);
var questions = sandbox.questions;

// Target: 22-28 questions where correct is longest (25% +/- 3)
var TARGET_MIN = 22;
var TARGET_MAX = 28;

// Count current state
var correctIsLongest = [];
var correctNotLongest = [];

for (var i = 0; i < questions.length; i++) {
  var q = questions[i];
  var lengths = q.options.map(function(o) { return o.length; });
  var maxLen = Math.max.apply(null, lengths);
  var isLongest = lengths[q.answer] === maxLen;
  if (isLongest) {
    correctIsLongest.push(i);
  } else {
    correctNotLongest.push(i);
  }
}

console.log('Before: correct=longest ' + correctIsLongest.length + '/100');

var changes = 0;

if (correctIsLongest.length < TARGET_MIN) {
  // Need MORE questions where correct is longest
  // Pick from correctNotLongest: swap correct with longest wrong
  var needed = 25 - correctIsLongest.length;
  // Shuffle to pick randomly
  shuffle(correctNotLongest);

  for (var n = 0; n < needed && n < correctNotLongest.length; n++) {
    var qi = correctNotLongest[n];
    var q = questions[qi];
    var lengths = q.options.map(function(o) { return o.length; });

    // Find longest wrong option
    var longestIdx = -1;
    var longestLen = 0;
    for (var j = 0; j < 4; j++) {
      if (j !== q.answer && lengths[j] > longestLen) {
        longestLen = lengths[j];
        longestIdx = j;
      }
    }

    if (longestIdx >= 0) {
      // Swap correct with longest wrong
      var temp = q.options[q.answer];
      q.options[q.answer] = q.options[longestIdx];
      q.options[longestIdx] = temp;
      q.answer = longestIdx;
      changes++;
    }
  }
} else if (correctIsLongest.length > TARGET_MAX) {
  // Need FEWER questions where correct is longest
  // Pick from correctIsLongest: swap correct with a shorter wrong
  var excess = correctIsLongest.length - 25;
  shuffle(correctIsLongest);

  for (var n = 0; n < excess && n < correctIsLongest.length; n++) {
    var qi = correctIsLongest[n];
    var q = questions[qi];
    var lengths = q.options.map(function(o) { return o.length; });

    // Find shortest wrong option
    var shortestIdx = -1;
    var shortestLen = Infinity;
    for (var j = 0; j < 4; j++) {
      if (j !== q.answer && lengths[j] < shortestLen) {
        shortestLen = lengths[j];
        shortestIdx = j;
      }
    }

    if (shortestIdx >= 0) {
      var temp = q.options[q.answer];
      q.options[q.answer] = q.options[shortestIdx];
      q.options[shortestIdx] = temp;
      q.answer = shortestIdx;
      changes++;
    }
  }
}

// Re-count
var newCount = 0;
for (var i = 0; i < questions.length; i++) {
  var q = questions[i];
  var lengths = q.options.map(function(o) { return o.length; });
  var maxLen = Math.max.apply(null, lengths);
  if (lengths[q.answer] === maxLen) newCount++;
}

console.log('After:  correct=longest ' + newCount + '/100');
console.log('Changes: ' + changes + ' option swaps');

// Write changes back using same approach as fix-answers.js
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

  if (/^\s*options:\s*\[/.test(line)) {
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
      var optionsStr = optionLines.join('\n');
      var optRegex = /("(?:[^"\\]|\\.)*")/g;
      var origOpts = [];
      var match;
      while ((match = optRegex.exec(optionsStr)) !== null) {
        origOpts.push(match[1]);
      }

      if (origOpts.length === 4 && qIndex < questions.length) {
        var q = questions[qIndex];
        var origQ = origSandbox.questions[qIndex];
        var newOpts = [];
        for (var oi = 0; oi < 4; oi++) {
          var optText = q.options[oi];
          for (var oj = 0; oj < 4; oj++) {
            if (origQ.options[oj] === optText) {
              newOpts.push(origOpts[oj]);
              break;
            }
          }
        }

        if (newOpts.length === 4) {
          var indent = optionLines[0].match(/^(\s*)/)[1];
          output.push(indent + 'options: [');
          for (var oi = 0; oi < 4; oi++) {
            output.push(indent + '  ' + newOpts[oi] + (oi < 3 ? ',' : ''));
          }
          output.push(indent + '],');
        } else {
          for (var oli = 0; oli < optionLines.length; oli++) {
            output.push(optionLines[oli]);
          }
        }
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

  if (/^\s*answer:\s*\d+/.test(line) && qIndex > 0 && qIndex <= questions.length) {
    var ansQ = questions[qIndex - 1];
    line = line.replace(/answer:\s*\d+/, 'answer: ' + ansQ.answer);
  }

  output.push(line);
}

fs.writeFileSync(filePath, output.join('\n'));
console.log('File updated: ' + filePath);

function shuffle(arr) {
  var seed = 12345;
  function rand() {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  }
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(rand() * (i + 1));
    var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
  return arr;
}
