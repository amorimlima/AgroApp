const fs = require('fs');
const path = require('path');
const { minify } = require('uglify-js');
const { fullPath } = require('./utils');

const srcDir = fullPath('../static/scripts/src');
const binDir = fullPath('../static/scripts/bin');
const files = [ 'services', 'controllers', 'config', 'run', 'helpers' ] // Layers
  .map(layer => [ layer, fs.readdirSync(`${srcDir}/${layer}`) ])
  .reduce((files, layer) => files.concat(layer[1].map(file => `${srcDir}/${layer[0]}/${file}`)), [])
  .map(file => fs.readFileSync(file))
  .map(file => file.toString());

files.push(fs.readFileSync(`${srcDir}/app.js`).toString());

if (!fs.existsSync(binDir)) fs.mkdirSync(binDir);

fs.writeFileSync(path.join(binDir, 'bundle.js'), minify(files).code);
