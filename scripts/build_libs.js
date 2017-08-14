const fs = require('fs');
const path = require('path');
const { fullPath, getDependency } = require('./utils');

const package = JSON.parse(fs.readFileSync(fullPath('../package.json')));
const libDir = fullPath('../static/scripts/lib');
const libs = Object
  .keys(package.dependencies)
  .filter(dependency => dependency.includes('angular'))
  .map(lib => fs.readFileSync(fullPath(getDependency(lib))))
  .map(lib => lib.toString());

if (!fs.existsSync(libDir)) fs.mkdirSync(libDir);

fs.writeFileSync(path.join(libDir, 'libs.js'), libs.toString());
