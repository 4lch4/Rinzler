const BaseCmd = require('../util/BaseImageCommand')

class Miku extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'miku',
      memberName: 'miku',
      group: 'user',
      description: 'Returns a random Miku image/gif.',
      examples: ['+miku', '+miku 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Miku
