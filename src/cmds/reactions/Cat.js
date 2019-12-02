const BaseCmd = require('../util/BaseImageCommand')

class Cat extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'cat',
      memberName: 'cat',
      group: 'reactions',
      description: 'Returns a random Cat image/gif.',
      examples: ['+cat', '+cat 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Cat
