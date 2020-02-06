const SHelper = require('../../utils/db/helpers/Suggestion')
const tools = require('../../utils/tools').MiscTools
const BaseCmd = require('../_bases/BaseCmd')

class Suggestion extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'suggestion',
      memberName: 'suggestion',
      group: 'features',
      aliases: ['suggest'],
      description: 'Stores your suggestion in a database for our team to evaluate.',
      examples: ['+suggestion I think you should add a cry command.', '+suggest Y\'all suck.'],
      argsType: 'single'
    })
  }

  async run (msg, input) {
    try {
      const suggestion = new SHelper()
      const success = await suggestion.createSuggestion(input, msg.author)

      if (success) {
        await msg.reply('thank you for your suggestion!')
        return tools.sendOwnerMessage(`A new suggestion has been added by ${msg.author.tag}.\n\n${input}`, this.client)
      } else return msg.reply('there seems to have been an error... Please contact support.')
    } catch (err) {
      if (err.message === 'No content provided for the new suggestion.') {
        return msg.reply('Please provide content for suggestion, a blank suggestion isn\'t helpful.')
      } else {
        this.error(err)
        return msg.reply('there seems to have been an error, please contact `+support`.')
      }
    }
  }
}

module.exports = Suggestion
