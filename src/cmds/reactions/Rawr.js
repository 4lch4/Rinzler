const BaseCmd = require('../util/BaseImageCommand')

class Rawr extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'rawr',
      memberName: 'rawr',
      group: 'reactions',
      description: 'Returns a random Rawr image/gif.',
      examples: ['+rawr', '+rawr 4']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Rawr
