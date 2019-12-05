const BaseCmd = require('../_bases/BaseActionCmd')

class Kill extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'kill',
      memberName: 'kill',
      group: 'actions',
      description: 'Returns a random Kill image/gif.',
      examples: ['+kill', '+kill 4'],
      stdReply: 'you\'ve been killed by',
      tronReply: 'YOU DARE TRY TO KILL ME, MORTAL?!',
      replyEmoji: '\u{1F5E1}'
    })
  }
}
module.exports = Kill
