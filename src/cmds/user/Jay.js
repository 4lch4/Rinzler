const BaseCmd = require('../util/BaseImageCommand')

class Jay extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'jay',
      memberName: 'jay',
      group: 'user',
      description: 'Returns a random Jay image/gif.',
      examples: ['+jay', '+jay 4']
    })
  }
}

module.exports = Jay
