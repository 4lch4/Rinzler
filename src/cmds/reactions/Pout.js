const BaseCmd = require('../util/BaseImageCommand')

class Pout extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'pout',
      memberName: 'pout',
      group: 'reactions',
      description: 'Returns a random Pout image/gif.',
      examples: ['+pout', '+pout 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Pout
