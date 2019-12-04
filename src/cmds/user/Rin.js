const BaseCmd = require('../util/BaseImageCommand')

class Rin extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'rin',
      memberName: 'rin',
      group: 'user',
      description: 'Returns a random Rin image/gif.',
      examples: ['+rin', '+rin 4']
    })
  }
}

module.exports = Rin
