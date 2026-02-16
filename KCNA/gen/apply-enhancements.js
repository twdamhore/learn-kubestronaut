#!/usr/bin/env node
// Applies enhancement JSON (ref links + wrong-option analysis) to set data files.
// Usage: node apply-enhancements.js <set-number>
// Reads: gen/enhance-<set>.json  Modifies: data/set-<set>.js
'use strict';

var fs = require('fs');
var path = require('path');

var setNum = process.argv[2];
if (!setNum) {
  console.error('Usage: node apply-enhancements.js <set-number>  (e.g. 01)');
  process.exit(1);
}

var enhFile = path.join(__dirname, 'enhance-' + setNum + '.json');
var dataFile = path.join(__dirname, '..', 'data', 'set-' + setNum + '.js');

if (!fs.existsSync(enhFile)) {
  console.error('Enhancement file not found: ' + enhFile);
  process.exit(1);
}

var enhancements = JSON.parse(fs.readFileSync(enhFile, 'utf8'));
var code = fs.readFileSync(dataFile, 'utf8');

// Escape a plain-text string for safe insertion into a JS double-quoted string literal.
function escapeForJSString(text) {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '')
    .replace(/\t/g, '\\t');
}

// Find the end position of the explanation string for a given question id.
// Returns { start, end } where start is after opening " and end is the closing ".
function findExplanationBounds(src, qid) {
  var idMarker = 'id: "' + qid + '"';
  var idIdx = src.indexOf(idMarker);
  if (idIdx === -1) return null;

  var explMarker = 'explanation: "';
  var explIdx = src.indexOf(explMarker, idIdx);
  if (explIdx === -1) return null;

  // Safety: don't cross into the next question
  var nextId = src.indexOf('\n    id: "s', idIdx + idMarker.length);
  if (nextId !== -1 && explIdx > nextId) return null;

  var strStart = explIdx + explMarker.length;
  var pos = strStart;
  while (pos < src.length) {
    if (src[pos] === '\\') {
      pos += 2;
    } else if (src[pos] === '"') {
      break;
    } else {
      pos++;
    }
  }
  return { start: strStart, end: pos };
}

// Collect insertions
var insertions = [];
var skipped = 0;
var keys = Object.keys(enhancements);

for (var k = 0; k < keys.length; k++) {
  var qid = keys[k];
  var enh = enhancements[qid];

  var bounds = findExplanationBounds(code, qid);
  if (!bounds) {
    console.error('  SKIP ' + qid + ': explanation not found');
    skipped++;
    continue;
  }

  // Check if this explanation already has a Reference link (idempotency)
  var currentExpl = code.substring(bounds.start, bounds.end);
  if (currentExpl.indexOf('Reference:') !== -1) {
    console.error('  SKIP ' + qid + ': already has Reference link');
    skipped++;
    continue;
  }

  var parts = [];

  // Wrong-option analysis (only if provided and not already covered)
  if (enh.wrong && enh.wrong.trim()) {
    parts.push('\\n\\nWhy other options are wrong:\\n' + escapeForJSString(enh.wrong));
  }

  // Reference link
  if (enh.ref && enh.ref.trim()) {
    parts.push('\\n\\nReference: ' + escapeForJSString(enh.ref));
  }

  if (parts.length > 0) {
    insertions.push({ pos: bounds.end, text: parts.join(''), qid: qid });
  }
}

// Sort by position descending so earlier insertions don't shift later ones
insertions.sort(function(a, b) { return b.pos - a.pos; });

// Apply
for (var i = 0; i < insertions.length; i++) {
  code = code.substring(0, insertions[i].pos) + insertions[i].text + code.substring(insertions[i].pos);
}

fs.writeFileSync(dataFile, code, 'utf8');
console.log('Set ' + setNum + ': ' + insertions.length + ' enhanced, ' + skipped + ' skipped');
