const BaseCmd = require('../util/BaseImageCommand')

class Dance extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'dance',
      memberName: 'dance',
      group: 'reactions',
      description: 'Returns a random Dance image/gif.',
      examples: ['+dance', '+dance 4']
    })
  }
}

module.exports = Dance
