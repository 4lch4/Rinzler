const BaseCmd = require('../util/BaseImageCommand')

class Dingle extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'dingle',
      memberName: 'dingle',
      group: 'user',
      description: 'Returns a random Dingle image/gif.',
      examples: ['+dingle', '+dingle 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Dingle
