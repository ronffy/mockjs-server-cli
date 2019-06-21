const fs = require('fs');
const path = require('path');

let mock = {};
fs.readdirSync(path.join(__dirname, './mock')).forEach(file => {
  if (file[0] !== '_') {
    Object.assign(mock, require('./mock/' + file));
  }
})

module.exports = mock;