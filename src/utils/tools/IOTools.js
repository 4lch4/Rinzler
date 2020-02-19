const fs = require('fs-extra')
const path = require('path')

const DATA_DIR = path.join(__dirname, '..', '..', '..', 'data')

module.exports = class IOTools {
  async readDataFile (filename) {
    return fs.readFile(path.join(DATA_DIR, filename), 'utf-8')
  }
}
