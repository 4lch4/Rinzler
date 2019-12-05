const BaseCmd = require('../_bases/BaseReactionCmd')

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
}

module.exports = Alcha
