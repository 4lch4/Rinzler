const BaseCmd = require('../_bases/BaseActionCmd')

class Hug extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'hug',
      memberName: 'hug',
      group: 'actions',
      aliases: ['hugs'],
      description: 'Returns a random Hug image/gif.',
      examples: ['+hug', '+hug 4'],
      stdReply: 'you\'ve been hugged by'
    })
  }
}

module.exports = Hug
