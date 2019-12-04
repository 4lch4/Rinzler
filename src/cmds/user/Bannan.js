const BaseCmd = require('../util/BaseImageCommand')

class Bannan extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'bannan',
      memberName: 'bannan',
      group: 'user',
      description: 'Returns a random Bannan image/gif.',
      examples: ['+bannan', '+bannan 4']
    })
  }
}

module.exports = Bannan
