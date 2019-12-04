const BaseCmd = require('../util/BaseImageCommand')

class NotWork extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'notwork',
      memberName: 'notwork',
      group: 'reactions',
      description: 'Returns a random NotWork image/gif.',
      examples: ['+notwork', '+notwork 4']
    })
  }
}

module.exports = NotWork
