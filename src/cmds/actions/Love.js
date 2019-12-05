const BaseCmd = require('../_bases/BaseActionCmd')

class Love extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'love',
      memberName: 'love',
      group: 'actions',
      description: 'Returns a random Love image/gif.',
      examples: ['+love', '+love 4'],
      stdReply: 'you\'ve been loved by'
    })
  }
}
module.exports = Love
