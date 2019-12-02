const BaseCmd = require('../util/BaseImageCommand')

class Edgy extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'edgy',
      memberName: 'edgy',
      group: 'reactions',
      description: 'Returns a random Edgy image/gif.',
      examples: ['+edgy', '+edgy 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Edgy
