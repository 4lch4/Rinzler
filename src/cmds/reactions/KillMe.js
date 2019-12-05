const BaseCmd = require('../_bases/BaseReactionCmd')

class KillMe extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'killme',
      memberName: 'killme',
      group: 'reactions',
      description: 'Returns a random KillMe image/gif.',
      examples: ['+killme', '+killme 4']
    })
  }
}

module.exports = KillMe
