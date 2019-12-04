const BaseCmd = require('../util/BaseImageCommand')

class Dreamy extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'dreamy',
      memberName: 'dreamy',
      group: 'user',
      description: 'Returns a random Dreamy image/gif.',
      examples: ['+dreamy', '+dreamy 4']
    })
  }
}

module.exports = Dreamy
