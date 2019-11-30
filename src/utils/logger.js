const path = require('path')

const SNL = require('simple-node-logger')
const SNLManager = new SNL()
SNLManager.createConsoleAppender()
SNLManager.createRollingFileAppender({
  logDirectory: path.join(__dirname, '..', '..', 'logs'),
  fileNamePattern: 'rinzler-<date>.log',
  dateFormat: 'YYYY.MM.DD-HHa'
})

module.exports = SNLManager.createLogger()
