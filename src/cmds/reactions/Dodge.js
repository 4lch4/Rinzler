const BaseCmd = require('../util/BaseImageCommand')

class Dodge extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'dodge',
      memberName: 'dodge',
      group: 'reactions',
      description: 'Returns a random Dodge image/gif.',
      examples: ['+dodge', '+dodge 4']
    })
  }
}

module.exports = Dodge
