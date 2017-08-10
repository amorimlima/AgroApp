const fs = require('fs');
const cssmin = require('cssmin');

module.exports = () => {
  const file = fs.readFileSync('./static/styles/style.css', encoding = 'utf8');
  const min = cssmin(file);

  fs.writeFileSync('./static/styles/bin/style.css', min);
};
