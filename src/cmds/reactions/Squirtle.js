const BaseCmd = require('../util/BaseImageCommand')

class Squirtle extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'squirtle',
      memberName: 'squirtle',
      group: 'reactions',
      description: 'Returns a random Squirtle image/gif.',
      examples: ['+squirtle', '+squirtle 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Squirtle
