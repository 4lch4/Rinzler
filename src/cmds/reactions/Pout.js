const BaseCmd = require('../util/BaseImageCommand')

class Pout extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'pout',
      memberName: 'pout',
      group: 'reactions',
      description: 'Returns a random Pout image/gif.',
      examples: ['+pout', '+pout 4']
    })
  }
}

module.exports = Pout
