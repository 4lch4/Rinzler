const BaseCmd = require('../util/BaseImageCommand')

class Lewd extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'lewd',
      memberName: 'lewd',
      group: 'reactions',
      description: 'Returns a random Lewd image/gif.',
      examples: ['+lewd', '+lewd 4']
    })
  }
}

module.exports = Lewd
