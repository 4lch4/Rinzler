const BaseCmd = require('../_bases/BaseReactionCmd')

class Ami extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'ami',
      memberName: 'ami',
      group: 'user',
      description: 'Returns a random Ami image/gif.',
      examples: ['+ami', '+ami 4']
    })
  }
}

module.exports = Ami
