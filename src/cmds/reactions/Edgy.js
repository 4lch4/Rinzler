const BaseCmd = require('../util/BaseImageCommand')

class Edgy extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'edgy',
      memberName: 'edgy',
      group: 'reactions',
      description: 'Returns a random Edgy image/gif.',
      examples: ['+edgy', '+edgy 4']
    })
  }
}

module.exports = Edgy
