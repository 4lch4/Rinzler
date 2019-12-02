const BaseCmd = require('../util/BaseImageCommand')

class Rekt extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'rekt',
      memberName: 'rekt',
      group: 'reactions',
      description: 'Returns a random Rekt image/gif.',
      examples: ['+rekt', '+rekt 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Rekt
