const path = require('path')

module.exports = function (file) {
  const ext = path.extname(file);
  return path.basename(file, ext);
}