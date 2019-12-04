const BaseCmd = require('../util/BaseImageCommand')

class Rekt extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'rekt',
      memberName: 'rekt',
      group: 'reactions',
      description: 'Returns a random Rekt image/gif.',
      examples: ['+rekt', '+rekt 4']
    })
  }
}

module.exports = Rekt
