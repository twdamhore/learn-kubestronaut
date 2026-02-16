#!/usr/bin/env node
/**
 * Extract questions with option length problems into per-set JSON files.
 * Each output file contains only the questions needing fixes with their
 * current options and target length info.
 */
'use strict';

var fs = require('fs');
var vm = require('vm');
var path = require('path');

var dataDir = path.join(__dirname, '..', 'data');
var outDir = __dirname;

for (var s = 1; s <= 10; s++) {
  var pad = s < 10 ? '0' + s : '' + s;
  var code = fs.readFileSync(path.join(dataDir, 'set-' + pad + '.js'), 'utf8');
  var sandbox = {};
  vm.runInNewContext(code, sandbox);
  var qs = sandbox.questions;

  var problems = [];
  for (var i = 0; i < qs.length; i++) {
    var q = qs[i];
    var lengths = q.options.map(function(o) { return o.length; });
    var avgLen = lengths.reduce(function(a, b) { return a + b; }, 0) / 4;
    var maxDev = 0;
    for (var j = 0; j < 4; j++) {
      var dev = Math.abs(lengths[j] - avgLen) / avgLen;
      if (dev > maxDev) maxDev = dev;
    }

    var correctIsLongest = (lengths[q.answer] === Math.max.apply(null, lengths) &&
      lengths.filter(function(l) { return l === Math.max.apply(null, lengths); }).length === 1);

    if (maxDev > 0.10 || correctIsLongest) {
      problems.push({
        id: q.id,
        qIndex: i,
        text: q.text,
        options: q.options,
        answer: q.answer,
        lengths: lengths,
        avgLen: Math.round(avgLen),
        correctIsLongest: correctIsLongest
      });
    }
  }

  var outFile = path.join(outDir, 'problems-' + pad + '.json');
  fs.writeFileSync(outFile, JSON.stringify(problems, null, 2));
  console.log('Set ' + pad + ': ' + problems.length + ' questions need fixing -> ' + outFile);
}
