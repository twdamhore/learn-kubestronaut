#!/usr/bin/env node
'use strict';
var fs = require('fs');
var path = require('path');

for (var s = 1; s <= 10; s++) {
  var pad = s < 10 ? '0' + s : '' + s;
  var f = path.join(__dirname, 'fixes-' + pad + '.json');
  if (!fs.existsSync(f)) {
    console.log('Set ' + pad + ': NOT YET');
    continue;
  }
  try {
    var d = JSON.parse(fs.readFileSync(f, 'utf8'));
    var bad = 0;
    d.forEach(function(q) {
      if (!q.options || q.options.length !== 4) bad++;
    });
    console.log('Set ' + pad + ': ' + d.length + ' fixes, ' + bad + ' with wrong option count');
  } catch (e) {
    console.log('Set ' + pad + ': PARSE ERROR - ' + e.message.substring(0, 80));
  }
}
