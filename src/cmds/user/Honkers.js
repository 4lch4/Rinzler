const BaseCmd = require('../util/BaseImageCommand')

class Honkers extends BaseCmd {
  constructor(client) {
    super(client, {
      name: 'honkers',
      memberName: 'honkers',
      group: 'user',
      description: 'Returns a random Honkers image/gif.',
      examples: ['+honkers', '+honkers 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Honkers
