const BaseCmd = require('../util/BaseImageCommand')

class Rin extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'rin',
      memberName: 'rin',
      group: 'user',
      description: 'Returns a random Rin image/gif.',
      examples: ['+rin', '+rin 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Rin
