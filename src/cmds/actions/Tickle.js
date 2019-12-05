const BaseCmd = require('../_bases/BaseActionCmd')

class Tickle extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'tickle',
      memberName: 'tickle',
      group: 'actions',
      description: 'Returns a random Tickle image/gif.',
      examples: ['+tickle', '+tickle 4'],
      stdReply: 'you\'ve been tickled by',
      tronReply: 'Stoooop, that tickles!! \u{1F606}'
    })
  }
}
module.exports = Tickle
