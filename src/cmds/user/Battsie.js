const BaseCmd = require('../util/BaseImageCommand')

class Battsie extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'battsie',
      memberName: 'battsie',
      group: 'user',
      description: 'Returns a random Battsie image/gif.',
      examples: ['+battsie', '+battsie 4']
    })
  }
}

module.exports = Battsie
