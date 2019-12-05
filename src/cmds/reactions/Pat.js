const BaseCmd = require('../_bases/BaseReactionCmd')

class Pat extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'pat',
      memberName: 'pat',
      group: 'reactions',
      description: 'Returns a random Pat image/gif.',
      examples: ['+pat', '+pat 4']
    })
  }
}
module.exports = Pat
