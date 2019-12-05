const BaseCmd = require('../_bases/BaseReactionCmd')

class Dingle extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'dingle',
      memberName: 'dingle',
      group: 'user',
      description: 'Returns a random Dingle image/gif.',
      examples: ['+dingle', '+dingle 4']
    })
  }
}

module.exports = Dingle
