const BaseCmd = require('../util/BaseImageCommand')

class Battsie extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'battsie',
      memberName: 'battsie',
      group: 'user',
      description: 'Returns a random Battsie image/gif.',
      examples: ['+battsie', '+battsie 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Battsie
