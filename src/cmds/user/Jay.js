const BaseCmd = require('../util/BaseImageCommand')

class Jay extends BaseCmd {
  constructor(client) {
    super(client, {
      name: 'jay',
      memberName: 'jay',
      group: 'user',
      description: 'Returns a random Jay image/gif.',
      examples: ['+jay', '+jay 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Jay
