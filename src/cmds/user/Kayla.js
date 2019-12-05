const BaseCmd = require('../_bases/BaseCmd')
const allowedIds = [
  '142092834260910080',
  '217870035090276374',
  '219270060936527873'
]

class Kayla extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'kayla',
      memberName: 'kayla',
      group: 'user',
      description: 'Returns a random Kayla image/gif.',
      examples: ['+kayla', '+kayla 4']
    })
  }

  async run (msg, args) {
    if (allowedIds.includes(msg.author.id)) {
      const image = await this.getCommandImage(msg.command.name, args)
      return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
    } else return msg.reply('This command is not available to you.')
  }
}

module.exports = Kayla
