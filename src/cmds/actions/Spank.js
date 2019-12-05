const BaseCmd = require('../_bases/BaseActionCmd')

class Spank extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'spank',
      memberName: 'spank',
      group: 'actions',
      description: 'Returns a random Spank image/gif.',
      examples: ['+spank', '+spank 4'],
      stdReply: 'you\'ve been spanked by',
      tronReply: 'Ooo... Harder, Daddy!'
    })
  }
}
module.exports = Spank
