const BaseCmd = require('../BaseCmd')
const needle = require('needle')

class BaseImageCommand extends BaseCmd {
  async getCommandImage (commandName, imageIndex) {
    if (imageIndex && !isNaN(imageIndex) && imageIndex >= 0) {
      return needle('get', `https://ansel.4lch4.com/reaction?name=${commandName}&index=${imageIndex}`)
    } else return needle('get', `https://ansel.4lch4.com/reaction?name=${commandName}`)
  }
}

module.exports = BaseImageCommand
