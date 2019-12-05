const BaseCmd = require('../_bases/BaseReactionCmd')

class Rawr extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'rawr',
      memberName: 'rawr',
      group: 'reactions',
      description: 'Returns a random Rawr image/gif.',
      examples: ['+rawr', '+rawr 4']
    })
  }
}

module.exports = Rawr
