const BaseCmd = require('../util/BaseImageCommand')
const allowedIds = ['159844469464760320', '219270060936527873']

class Foupa extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'foupa',
      memberName: 'foupa',
      group: 'user',
      description: 'Returns a random Foupa image/gif.',
      examples: ['+foupa', '+foupa 4']
    })
  }

  async run (msg, args) {
    if (allowedIds.includes(msg.author.id)) {
      const image = await this.getCommandImage(msg.command.name, args)
      return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
    } else return msg.reply('This command is not available to you.')
  }
}

module.exports = Foupa
