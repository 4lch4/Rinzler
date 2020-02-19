const BaseCmd = require('../_bases/BaseCmd')

const { IOTools: ioTools, MiscTools: mTools } = require('../../utils/tools')

class Quotes extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'quote',
      group: 'features',
      memberName: 'quote',
      description: 'Returns a random quote of interest.',
      examples: ['+quote']
    })
  }

  async run (msg) {
    const fileLines = (await ioTools.readDataFile('Quotes.txt')).split('\n')
    const random = mTools.getRandom(0, fileLines.length)

    return msg.channel.send(fileLines[random])
  }
}

module.exports = Quotes
