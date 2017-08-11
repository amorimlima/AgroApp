const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

const package = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')));
let concat = '';

Object
  .keys(package.dependencies)
  .filter(dependency => dependency.includes('angular'))  
  .forEach(dependency => {
    concat += fs.readFileSync(path.join(__dirname, `../node_modules/${dependency}/${dependency}.min.js`));
  });

fs.writeFileSync(path.join(__dirname, '../static/scripts/lib/libs.js'), concat);