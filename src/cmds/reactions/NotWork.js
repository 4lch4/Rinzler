const BaseCmd = require('../util/BaseImageCommand')

class NotWork extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'notwork',
      memberName: 'notwork',
      group: 'reactions',
      description: 'Returns a random NotWork image/gif.',
      examples: ['+notwork', '+notwork 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = NotWork
