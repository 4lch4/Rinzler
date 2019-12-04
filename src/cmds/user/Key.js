const BaseCmd = require('../util/BaseImageCommand')

class Key extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'key',
      memberName: 'key',
      group: 'user',
      description: 'Returns a random Key image/gif.',
      examples: ['+key', '+key 4']
    })
  }
}

module.exports = Key
