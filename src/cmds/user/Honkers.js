const BaseCmd = require('../_bases/BaseReactionCmd')

class Honkers extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'honkers',
      memberName: 'honkers',
      group: 'user',
      description: 'Returns a random Honkers image/gif.',
      examples: ['+honkers', '+honkers 4']
    })
  }
}

module.exports = Honkers
