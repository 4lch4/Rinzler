const BaseCmd = require('../util/BaseImageCommand')

class Cheeki extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'cheeki',
      memberName: 'cheeki',
      group: 'user',
      description: 'Returns a random Cheeki image/gif.',
      examples: ['+cheeki', '+cheeki 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Cheeki
