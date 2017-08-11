const fs = require('fs');
const path = require('path');
const sass = require('npm-sass');
const cssmin = require('cssmin');
const Promise = require('bluebird');

const sassAsync = Promise.promisify(sass);

sassAsync(path.join(__dirname, '../static/styles/src/style.scss'))
  .then(compiled => {
    const minified = cssmin(compiled.css.toString());
    fs.writeFile(path.join(__dirname, '../static/styles/bin/styles.css'), minified);
  });