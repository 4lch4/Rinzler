const BaseCmd = require('../util/BaseImageCommand')

class Ami extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'ami',
      memberName: 'ami',
      group: 'user',
      description: 'Returns a random Ami image/gif.',
      examples: ['+ami', '+ami 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Ami
