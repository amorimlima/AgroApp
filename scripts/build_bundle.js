const fs = require('fs');
const path = require('path');
const uglifyJs = require('uglify-js');
const concat = require('concat-files');

const services = fs.readdirSync('./static/scripts/src/services');
const controllers = fs.readdirSync('./static/scripts/src/controllers');
const run = fs.readdirSync('./static/scripts/src/run');
const config = fs.readdirSync('./static/scripts/src/config');
let file = '';
let minified = '';

file += fs.readFileSync('./static/scripts/src/app.js');

services.forEach(fileName => {
  file += fs.readFileSync(`./static/scripts/src/services/${fileName}`) + '\n';
});

controllers.forEach(fileName => {
  file += fs.readFileSync(`./static/scripts/src/controllers/${fileName}`) + '\n';
});

run.forEach(fileName => {
  file += fs.readFileSync(`./static/scripts/src/run/${fileName}`) + '\n';
});

config.forEach(fileName => {
  file += fs.readFileSync(`./static/scripts/src/config/${fileName}`) + '\n';
});

minified = uglifyJs.minify(file);

fs.writeFileSync('./static/scripts/bin/bundle.js', minified.code);