const BaseCmd = require('../util/BaseImageCommand')

class Blush extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'blush',
      memberName: 'blush',
      group: 'reactions',
      description: 'Returns a random Blush image/gif.',
      examples: ['+blush', '+blush 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Blush
