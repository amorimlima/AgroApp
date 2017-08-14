const fs = require('fs');
const path = require('path');
const sass = require('npm-sass');
const cssmin = require('cssmin');
const Promise = require('bluebird');
const { fullPath } = require('./utils');
const sassAsync = Promise.promisify(sass);

const srcDir = fullPath('../static/styles/src');
const binDir = fullPath('../static/styles/bin');

if (!fs.existsSync(binDir)) fs.mkdirSync(binDir);

sassAsync(path.join(__dirname, '../static/styles/src/style.scss'))
  .then(compiled => {
    const minified = cssmin(compiled.css.toString());
    fs.writeFile(`${binDir}/styles.css`, minified);
  });