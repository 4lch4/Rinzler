const BaseCmd = require('../util/BaseImageCommand')

class Lewd extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'lewd',
      memberName: 'lewd',
      group: 'reactions',
      description: 'Returns a random Lewd image/gif.',
      examples: ['+lewd', '+lewd 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Lewd
