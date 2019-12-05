const BaseCmd = require('../_bases/BaseActionCmd')

class Poke extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'poke',
      memberName: 'poke',
      group: 'actions',
      description: 'Returns a random Poke image/gif.',
      examples: ['+poke', '+poke 4'],
      stdReply: 'you\'ve been poked by',
      tronReply: 'Stoooop, that tickles!! \u{1F606}'
    })
  }
}
module.exports = Poke
