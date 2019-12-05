const BaseCmd = require('../_bases/BaseReactionCmd')

class FoodPorn extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'foodporn',
      memberName: 'foodporn',
      group: 'reactions',
      description: 'Returns a random FoodPorn image/gif.',
      examples: ['+foodporn', '+foodporn 4']
    })
  }
}

module.exports = FoodPorn
