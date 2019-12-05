const BaseCmd = require('../_bases/BaseActionCmd')

class Punch extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'punch',
      memberName: 'punch',
      group: 'actions',
      description: 'Returns a random Punch image/gif.',
      examples: ['+punch', '+punch 4'],
      stdReply: 'you\'ve been punched by',
      tronReply: 'You\'re far too slow to be trying that... Train for 1,000 more years, then come back to give it a shot.'
    })
  }
}
module.exports = Punch
