const logger = require('./logger')
const needle = require('needle')

class AnselAid {
  constructor (opts = {}) {
    if (opts.devFlag) this.baseUrl = 'http://localhost:4242'
    else this.baseUrl = 'https://ansel.4lch4.com'
  }

  async getCommandImage (commandName, imageIndex) {
    logger.log(`Executing BaseImageCommand#getCommandImage(${commandName}, ${imageIndex || 'undefined'})...`)

    if (imageIndex && !isNaN(imageIndex) && imageIndex >= 0) {
      return needle('get', `${this.baseUrl}/reaction?name=${commandName}&index=${imageIndex}`)
    } else return needle('get', `${this.baseUrl}/reaction?name=${commandName}`)
  }
}

module.exports = AnselAid
