const BaseCmd = require('../_bases/BaseReactionCmd')

class Wave extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'wave',
      memberName: 'wave',
      group: 'reactions',
      description: 'Returns a random Wave image/gif.',
      examples: ['+wave', '+wave 4']
    })
  }
}
module.exports = Wave
