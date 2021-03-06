const coinbase = new (require('../../utils/Coinbase'))()
const BaseCmd = require('../_bases/BaseCmd')

class Bitcoin extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'bitcoin',
      group: 'features',
      aliases: ['btc'],
      memberName: 'bitcoin',
      description: 'Displays current bitcoin prices and allows you to convert the values.',
      examples: ['+bitcoin', '+btc CAD', '+btc eur 2017-02-14'],
      args: [{
        key: 'currency',
        label: 'currency',
        prompt: '',
        type: 'string',
        default: 'USD',
        validate: val => {
          if (coinbase.currencies.indexOf(val.toUpperCase()) !== -1) return true
          else return 'you have provided an invalid currency code. Please refer to https://www.currency-iso.org/dam/downloads/lists/list_one.xml for a full list of values.'
        }
      }, {
        key: 'date',
        label: 'date',
        prompt: '',
        type: 'string',
        default: 'now',
        validate: val => {
          if (val.match(/\d{4}-\d{2}-\d{2}/)) return true
          else return 'you have provided an invalid date. The correct format is `YYYY-MM-DD`.'
        }
      }]
    })
  }

  async run (msg, { currency, date }) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    })

    if (date === 'now') {
      const price = await coinbase.getCurrentPrice(currency)
      return BaseCmd.sendMessage(msg.channel, `The current price for **1 BTC = ${formatter.format(price)}**.`, this.client.user)
    } else {
      const price = await coinbase.getHistoricPrice(date, currency)
      return BaseCmd.sendMessage(msg.channel, `The price for **1 BTC** on **${date}** was **${formatter.format(price)}**.`, this.client.user)
    }
  }
}

module.exports = Bitcoin
