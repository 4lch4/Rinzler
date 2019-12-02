const BaseCmd = require('../util/BaseImageCommand')

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

  async run (msg, args) {
    const image = await this.getCommandImage(msg.command.name, args)
    return BaseCmd.sendMessage(msg.channel, '', this.client.user, { files: [image.body] })
  }
}

module.exports = FoodPorn
