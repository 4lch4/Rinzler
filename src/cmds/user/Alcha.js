const BaseCmd = require('../util/BaseImageCommand')

class Alcha extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'alcha',
      memberName: 'alcha',
      group: 'user',
      description: 'Returns a random image/gif from Alcha\'s folder.',
      aliases: ['alchaholic', 'grampcha'],
      examples: ['+alcha', '+alcha 0']
    })
  }

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = Alcha

/*
const Command = require('../BaseCmd')
const ioTools = new (require('../../util/IOTools'))()

class Alcha extends Command {
  constructor (client) {
    super(client, {
      name: 'alcha',
      memberName: 'alcha',
      group: 'user',
      description: 'Returns a random image/gif from Alcha\'s folder.',
      aliases: ['alchaholic', 'grampcha'],
      examples: ['+alcha', '+alcha 0']
    })
  }

  async run (msg, args) {
    let image = await ioTools.getRandomImage('alcha', args)
    return Command.sendMessage(msg.channel, '', this.client.user, { files: [image] })
  }
}

module.exports = Alcha

*/
