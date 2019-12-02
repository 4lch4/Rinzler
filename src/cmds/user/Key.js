const BaseCmd = require('../util/BaseImageCommand')

class Key extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'key',
      memberName: 'key',
      group: 'user',
      description: 'Returns a random Key image/gif.',
      examples: ['+key', '+key 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Key
