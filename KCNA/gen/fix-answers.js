#!/usr/bin/env node
/**
 * Rebalances answer distribution in a KCNA data file by swapping options.
 * Usage: node fix-answers.js <set-file>
 *
 * Strategy: For each question whose answer is in an over-represented bucket,
 * swap the correct option with an option in an under-represented bucket.
 */
'use strict';

var fs = require('fs');
var vm = require('vm');
var path = require('path');

var file = process.argv[2];
if (!file) {
  console.error('Usage: node fix-answers.js <set-file>');
  process.exit(1);
}

var filePath = path.resolve(file);
var code = fs.readFileSync(filePath, 'utf8');

// Parse the file to get questions
var sandbox = {};
vm.runInNewContext(code, sandbox);

var questions = sandbox.questions;
var TARGET = 25; // target per answer bucket

// Count current distribution
var dist = [0, 0, 0, 0];
for (var i = 0; i < questions.length; i++) {
  dist[questions[i].answer]++;
}

console.log('Before: A=' + dist[0] + ' B=' + dist[1] + ' C=' + dist[2] + ' D=' + dist[3]);

// Determine which buckets are over and under
function needsMore(bucket) { return dist[bucket] < TARGET; }
function hasExcess(bucket) { return dist[bucket] > TARGET; }

// Swap options in a question: move correct answer from fromIdx to toIdx
function swapAnswer(q, fromIdx, toIdx) {
  var temp = q.options[fromIdx];
  q.options[fromIdx] = q.options[toIdx];
  q.options[toIdx] = temp;
  q.answer = toIdx;
}

// Iterate questions and rebalance
// Process in a deterministic but shuffled order to avoid bias
var indices = questions.map(function(_, i) { return i; });
// Simple seeded shuffle for reproducibility
var seed = 42;
function nextRand() {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
}
for (var i = indices.length - 1; i > 0; i--) {
  var j = Math.floor(nextRand() * (i + 1));
  var tmp = indices[i]; indices[i] = indices[j]; indices[j] = tmp;
}

var changes = 0;
for (var pass = 0; pass < 5; pass++) {
  for (var idx = 0; idx < indices.length; idx++) {
    var qi = indices[idx];
    var q = questions[qi];
    var currentAnswer = q.answer;

    if (!hasExcess(currentAnswer)) continue;

    // Find best target bucket (most under-represented)
    var bestTarget = -1;
    var bestDeficit = 0;
    for (var t = 0; t < 4; t++) {
      if (t === currentAnswer) continue;
      var deficit = TARGET - dist[t];
      if (deficit > bestDeficit) {
        bestDeficit = deficit;
        bestTarget = t;
      }
    }

    if (bestTarget === -1) continue;

    swapAnswer(q, currentAnswer, bestTarget);
    dist[currentAnswer]--;
    dist[bestTarget]++;
    changes++;

    // Check if we're balanced enough
    var maxDiff = Math.max.apply(null, dist) - Math.min.apply(null, dist);
    if (maxDiff <= 3) break;
  }
  var maxDiff = Math.max.apply(null, dist) - Math.min.apply(null, dist);
  if (maxDiff <= 3) break;
}

console.log('After:  A=' + dist[0] + ' B=' + dist[1] + ' C=' + dist[2] + ' D=' + dist[3]);
console.log('Changes: ' + changes + ' questions had options swapped');

// Now we need to write the changes back to the file.
// Strategy: find each question's options array and answer field in the source and update them.
// This is the tricky part - we need to do precise text replacement.

// Read the file again and process question by question
var lines = code.split('\n');
var output = [];
var qIndex = 0;
var inOptions = false;
var optionLines = [];
var optionStartLine = -1;
var braceDepth = 0;

for (var li = 0; li < lines.length; li++) {
  var line = lines[li];

  // Track when we enter a question's options array
  if (/^\s*options:\s*\[/.test(line)) {
    inOptions = true;
    optionLines = [];
    optionStartLine = li;
    braceDepth = 0;
    // Count brackets on this line
    for (var ci = 0; ci < line.length; ci++) {
      if (line[ci] === '[') braceDepth++;
      if (line[ci] === ']') braceDepth--;
    }
    if (braceDepth <= 0) {
      // Single-line options - unlikely but handle
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
      if (line[ci] === '[') braceDepth++;
      if (line[ci] === ']') braceDepth--;
    }
    if (braceDepth <= 0) {
      inOptions = false;

      // Parse the original options from the collected lines
      var optionsStr = optionLines.join('\n');
      // Extract individual option strings
      var optRegex = /("(?:[^"\\]|\\.)*")/g;
      var origOpts = [];
      var match;
      while ((match = optRegex.exec(optionsStr)) !== null) {
        origOpts.push(match[1]);
      }

      if (origOpts.length === 4 && qIndex < questions.length) {
        // Get the new order from our rebalanced questions
        var q = questions[qIndex];
        // We need to figure out how options were swapped
        // Since we modified questions in-place, we need to reconstruct
        // Actually, we already have the final state in questions[qIndex].options
        // We need to find the mapping from original options to new positions

        // Re-read original question to get original options
        var origSandbox = {};
        vm.runInNewContext(code, origSandbox);
        var origQ = origSandbox.questions[qIndex];

        // Build new options array using the rebalanced question's option order
        var newOpts = [];
        for (var oi = 0; oi < 4; oi++) {
          // Find this option in the original options
          var optText = q.options[oi];
          for (var oj = 0; oj < 4; oj++) {
            if (origQ.options[oj] === optText) {
              newOpts.push(origOpts[oj]);
              break;
            }
          }
        }

        if (newOpts.length === 4) {
          // Reconstruct the options block with proper indentation
          var indent = optionLines[0].match(/^(\s*)/)[1];
          output.push(indent + 'options: [');
          for (var oi = 0; oi < 4; oi++) {
            output.push(indent + '  ' + newOpts[oi] + (oi < 3 ? ',' : ''));
          }
          output.push(indent + '],');
        } else {
          // Fallback: output original
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

  // Update answer field
  if (/^\s*answer:\s*\d+/.test(line) && qIndex > 0 && qIndex <= questions.length) {
    var ansQ = questions[qIndex - 1];
    line = line.replace(/answer:\s*\d+/, 'answer: ' + ansQ.answer);
  }

  output.push(line);
}

fs.writeFileSync(filePath, output.join('\n'));
console.log('File updated: ' + filePath);
