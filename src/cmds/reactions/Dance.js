const BaseCmd = require('../util/BaseImageCommand')

class Dance extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'dance',
      memberName: 'dance',
      group: 'reactions',
      description: 'Returns a random Dance image/gif.',
      examples: ['+dance', '+dance 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Dance
