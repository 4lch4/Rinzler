const BaseCmd = require('../_bases/BaseActionCmd')

class Shank extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'shank',
      memberName: 'shank',
      group: 'actions',
      description: 'Returns a random Shank image/gif.',
      examples: ['+shank', '+shank 4'],
      stdReply: 'you\'ve been shanked by',
      tronReply: '\u{1F47F} YOU DARE TRY TO SHANK ME, MORTAL?!'
    })
  }
}
module.exports = Shank
