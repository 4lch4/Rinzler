const BaseCmd = require('../_bases/BaseReactionCmd')

class Zorika extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'zorika',
      memberName: 'zorika',
      group: 'user',
      description: 'Returns a random Zorika image/gif.',
      examples: ['+zorika', '+zorika 4']
    })
  }
}

module.exports = Zorika
