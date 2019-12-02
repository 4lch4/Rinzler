const BaseCmd = require('../util/BaseImageCommand')

class Rose extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'rose',
      memberName: 'rose',
      group: 'user',
      description: 'Returns a random Rose image/gif.',
      examples: ['+rose', '+rose 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Rose
