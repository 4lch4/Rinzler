const BaseCmd = require('../util/BaseImageCommand')

class Dodge extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'dodge',
      memberName: 'dodge',
      group: 'reactions',
      description: 'Returns a random Dodge image/gif.',
      examples: ['+dodge', '+dodge 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Dodge
