const BaseCmd = require('../_bases/BaseActionCmd')

class Bite extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'bite',
      group: 'actions',
      memberName: 'bite',
      aliases: ['bites', 'nom', 'noms', 'nomnom', 'omnom'],
      description: 'Returns a random bite gif and includes the mentioned users username.',
      examples: ['+bite @Alcha#0042', '+nom', '+noms @Alcha#0042'],
      stdReply: 'you\'ve been bitten by',
      tronReply: 'YOU DARE TRY TO BITE ME?! Who do you think you are?!'
    })
  }
}

module.exports = Bite
