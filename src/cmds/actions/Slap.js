const BaseCmd = require('../_bases/BaseActionCmd')

class Slap extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'slap',
      memberName: 'slap',
      group: 'actions',
      description: 'Returns a random Slap image/gif.',
      examples: ['+slap', '+slap 4'],
      stdReply: 'you\'ve been slapped by',
      tronReply: 'Not cool dude... Not cool.'
    })
  }
}
module.exports = Slap
