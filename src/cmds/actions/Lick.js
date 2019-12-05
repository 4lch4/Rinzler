const BaseCmd = require('../_bases/BaseActionCmd')

class Lick extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'lick',
      memberName: 'lick',
      group: 'actions',
      description: 'Returns a random Lick image/gif.',
      examples: ['+lick', '+lick 4'],
      stdReply: 'you\'ve been licked by'
    })
  }
}
module.exports = Lick
