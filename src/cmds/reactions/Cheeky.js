const BaseCmd = require('../_bases/BaseReactionCmd')

class Cheeky extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'cheeky',
      group: 'actions',
      memberName: 'cheeky',
      aliases: ['bleh'],
      description: 'Returns a random cheeky gif.',
      examples: ['+cheeky', '+bleh']
    })
  }
}

module.exports = Cheeky
