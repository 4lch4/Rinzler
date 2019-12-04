const BaseCmd = require('../BaseCmd')
const needle = require('needle')

class BaseImageCommand extends BaseCmd {
  async getCommandImage (commandName, imageIndex) {
    if (imageIndex && !isNaN(imageIndex) && imageIndex >= 0) {
      return needle('get', `https://ansel.4lch4.com/reaction?name=${commandName}&index=${imageIndex}`)
    } else return needle('get', `https://ansel.4lch4.com/reaction?name=${commandName}`)
  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)

    if (image.body.length > 0) return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
    else return BaseCmd.sendMessage(msg.channel, 'Unfortunately, I do not have any images for this command. Please let `Alcha#0042` know of this problem so he can fix it right away.')
  }
}

module.exports = BaseImageCommand
