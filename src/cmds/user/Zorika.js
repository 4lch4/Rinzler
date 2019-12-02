const BaseCmd = require('../util/BaseImageCommand')

class Zorika extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'zorika',
      memberName: 'zorika',
      group: 'user',
      description: 'Returns a random Zorika image/gif.',
      examples: ['+zorika', '+zorika 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Zorika
