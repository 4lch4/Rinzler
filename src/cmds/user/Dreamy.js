const BaseCmd = require('../util/BaseImageCommand')

class Dreamy extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'dreamy',
      memberName: 'dreamy',
      group: 'user',
      description: 'Returns a random Dreamy image/gif.',
      examples: ['+dreamy', '+dreamy 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Dreamy
