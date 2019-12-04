const BaseCmd = require('../util/BaseImageCommand')

class Ami extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'ami',
      memberName: 'ami',
      group: 'user',
      description: 'Returns a random Ami image/gif.',
      examples: ['+ami', '+ami 4']
    })
  }
}

module.exports = Ami
