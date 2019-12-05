const BaseCmd = require('../_bases/BaseActionCmd')

class Kick extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'kick',
      memberName: 'kick',
      group: 'actions',
      description: 'Returns a random Kick image/gif.',
      examples: ['+kick', '+kick 4'],
      stdReply: 'you\'ve been kicked by',
      tronReply: 'YOU DARE TRY TO KICK ME, MORTAL!?'
    })
  }
}
module.exports = Kick
