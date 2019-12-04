const BaseCmd = require('../util/BaseImageCommand')

class Squirtle extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'squirtle',
      memberName: 'squirtle',
      group: 'reactions',
      description: 'Returns a random Squirtle image/gif.',
      examples: ['+squirtle', '+squirtle 4']
    })
  }
}

module.exports = Squirtle
