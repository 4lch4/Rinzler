const BaseCmd = require('../_bases/BaseReactionCmd')

class Battsie extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'battsie',
      memberName: 'battsie',
      group: 'user',
      description: 'Returns a random Battsie image/gif.',
      examples: ['+battsie', '+battsie 4']
    })
  }
}

module.exports = Battsie
