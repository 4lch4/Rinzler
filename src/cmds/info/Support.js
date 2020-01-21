const BaseCmd = require('../_bases/BaseCmd')

class Support extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'support',
      group: 'info',
      memberName: 'support',
      description: 'Returns information on how to retrieve support for Tron.'
    })
  }

  async run (msg) {
    return msg.reply('Join the official server for Tron and post a message in the support channel:\n\n' + 'https://discord.gg/dSGH7qB')
  }
}

module.exports = Support
