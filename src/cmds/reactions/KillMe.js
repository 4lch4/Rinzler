const BaseCmd = require('../util/BaseImageCommand')

class KillMe extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'killme',
      memberName: 'killme',
      group: 'reactions',
      description: 'Returns a random KillMe image/gif.',
      examples: ['+killme', '+killme 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = KillMe
