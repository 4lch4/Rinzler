const BaseCmd = require('../util/BaseImageCommand')

class Miku extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'miku',
      memberName: 'miku',
      group: 'user',
      description: 'Returns a random Miku image/gif.',
      examples: ['+miku', '+miku 4']
    })
  }
}

module.exports = Miku
