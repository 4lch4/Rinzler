const BaseCmd = require('../util/BaseImageCommand')

class Bannan extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'bannan',
      memberName: 'bannan',
      group: 'user',
      description: 'Returns a random Bannan image/gif.',
      examples: ['+bannan', '+bannan 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Bannan
