const fs = require('fs')
const path = require('path')
const camelCase = require('lodash.camelcase')
const getFileName = require('./getFileName')

module.exports = function scanDir (dir, obj = {}, options) {
  const items = fs.readdirSync(dir)
  for (const item of items) {
    const itemPath = path.resolve(dir, item)
    const stat = fs.statSync(itemPath)
    if (stat.isFile()) {
      let fileName = getFileName(item)
      if (fileName !== '*' && options.camelCase === true) {
        fileName = camelCase(fileName)
      }
      try {
        obj[fileName] = require(itemPath)
      } catch (e) {
        console.error(`Failed to load '${itemPath}' as ${fileName}: ${e.message}`)
      }
    } else if (stat.isDirectory() && options.recurse) {
      const itemName = options.camelCase === true ? camelCase(item) : item
      obj[itemName] = {}
      scanDir(itemPath, obj[itemName], options)
    }
  }
  return obj
}