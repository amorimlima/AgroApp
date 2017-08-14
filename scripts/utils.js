const path = require('path');

exports.getDependency = dependency => `../node_modules/${dependency}/${dependency}.min.js`;
exports.fullPath = partial => path.join(__dirname, partial);