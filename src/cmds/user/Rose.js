const BaseCmd = require('../util/BaseImageCommand')

class Rose extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'rose',
      memberName: 'rose',
      group: 'user',
      description: 'Returns a random Rose image/gif.',
      examples: ['+rose', '+rose 4']
    })
  }
}

module.exports = Rose
