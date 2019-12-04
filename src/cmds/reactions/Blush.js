const BaseCmd = require('../util/BaseImageCommand')

class Blush extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'blush',
      memberName: 'blush',
      group: 'reactions',
      description: 'Returns a random Blush image/gif.',
      examples: ['+blush', '+blush 4']
    })
  }
}

module.exports = Blush
