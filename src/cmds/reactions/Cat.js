const BaseCmd = require('../util/BaseImageCommand')

class Cat extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'cat',
      memberName: 'cat',
      group: 'reactions',
      description: 'Returns a random Cat image/gif.',
      examples: ['+cat', '+cat 4']
    })
  }
}

module.exports = Cat
