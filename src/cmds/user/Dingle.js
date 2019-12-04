const BaseCmd = require('../util/BaseImageCommand')

class Dingle extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'dingle',
      memberName: 'dingle',
      group: 'user',
      description: 'Returns a random Dingle image/gif.',
      examples: ['+dingle', '+dingle 4']
    })
  }
}

module.exports = Dingle
