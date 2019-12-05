const BaseCmd = require('../_bases/BaseActionCmd')

class Kiss extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'kiss',
      memberName: 'kiss',
      group: 'actions',
      description: 'Returns a random Kiss image/gif.',
      examples: ['+kiss', '+kiss 4'],
      stdReply: 'you\'ve been kissed by'
    })
  }
}
module.exports = Kiss
