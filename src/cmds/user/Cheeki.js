const BaseCmd = require('../util/BaseImageCommand')

class Cheeki extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'cheeki',
      memberName: 'cheeki',
      group: 'user',
      description: 'Returns a random Cheeki image/gif.',
      examples: ['+cheeki', '+cheeki 4']
    })
  }
}

module.exports = Cheeki
