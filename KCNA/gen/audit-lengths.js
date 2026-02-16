#!/usr/bin/env node
/**
 * Audit option lengths across all KCNA question sets.
 * Reports:
 *  - How often the correct answer is the longest option
 *  - Per-question length variance
 *  - Questions where options differ by more than 10%
 */
'use strict';

var fs = require('fs');
var vm = require('vm');
var path = require('path');

var dataDir = path.join(__dirname, '..', 'data');
var totalQs = 0;
var correctIsLongest = 0;
var correctIsShortest = 0;
var outsideTenPct = 0;
var worstOffenders = [];

for (var s = 1; s <= 10; s++) {
  var pad = s < 10 ? '0' + s : '' + s;
  var code = fs.readFileSync(path.join(dataDir, 'set-' + pad + '.js'), 'utf8');
  var sandbox = {};
  vm.runInNewContext(code, sandbox);
  var qs = sandbox.questions;

  var setLongest = 0;
  var setOutside = 0;

  for (var i = 0; i < qs.length; i++) {
    var q = qs[i];
    totalQs++;

    var lengths = q.options.map(function(o) { return o.length; });
    var correctLen = lengths[q.answer];
    var maxLen = Math.max.apply(null, lengths);
    var minLen = Math.min.apply(null, lengths);
    var avgLen = lengths.reduce(function(a, b) { return a + b; }, 0) / 4;

    // Is correct answer the longest?
    if (correctLen === maxLen && lengths.filter(function(l) { return l === maxLen; }).length === 1) {
      correctIsLongest++;
      setLongest++;
    }

    // Is correct answer the shortest?
    if (correctLen === minLen && lengths.filter(function(l) { return l === minLen; }).length === 1) {
      correctIsShortest++;
    }

    // Check +/- 10% from average
    var outside = false;
    for (var j = 0; j < 4; j++) {
      var deviation = Math.abs(lengths[j] - avgLen) / avgLen;
      if (deviation > 0.10) {
        outside = true;
        break;
      }
    }
    if (outside) {
      outsideTenPct++;
      setOutside++;

      var spread = Math.round((maxLen - minLen) / avgLen * 100);
      if (spread > 50) {
        worstOffenders.push({
          id: q.id,
          lengths: lengths,
          correctIdx: q.answer,
          spread: spread
        });
      }
    }
  }

  console.log('Set ' + pad + ': correct=longest ' + setLongest + '/100, outside 10% tolerance: ' + setOutside + '/100');
}

console.log('\n=== TOTALS ===');
console.log('Total questions: ' + totalQs);
console.log('Correct answer is longest: ' + correctIsLongest + '/' + totalQs + ' (' + Math.round(correctIsLongest/totalQs*100) + '%)');
console.log('Correct answer is shortest: ' + correctIsShortest + '/' + totalQs + ' (' + Math.round(correctIsShortest/totalQs*100) + '%)');
console.log('Options outside +/-10% tolerance: ' + outsideTenPct + '/' + totalQs + ' (' + Math.round(outsideTenPct/totalQs*100) + '%)');
console.log('\nExpected if random: correct=longest ~25%');

if (worstOffenders.length > 0) {
  console.log('\n=== WORST OFFENDERS (spread > 50%) ===');
  worstOffenders.sort(function(a, b) { return b.spread - a.spread; });
  for (var w = 0; w < Math.min(20, worstOffenders.length); w++) {
    var o = worstOffenders[w];
    var marker = o.lengths.map(function(l, idx) {
      return 'ABCD'[idx] + '=' + l + (idx === o.correctIdx ? '*' : '');
    }).join(' ');
    console.log('  ' + o.id + ': ' + marker + ' (spread ' + o.spread + '%)');
  }
  console.log('  ... and ' + (worstOffenders.length - 20) + ' more' );
}
