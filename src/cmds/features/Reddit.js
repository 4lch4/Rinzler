const r = require('../../utils/tools').RedditTools
const BaseCmd = require('../_bases/BaseCmd')

const ValidArgs = {
  sort: ['hot', 'top', 'controversial', 'new'],
  from: ['day', 'week', 'month', 'year', 'all'],
  limit: { min: 25, max: 75 }
}

class Reddit extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'reddit',
      group: 'features',
      memberName: 'reddit',
      aliases: ['r'],
      description: 'Returns a post from the front page of the given subreddit.',
      examples: ['+reddit r/Aww', '+r facepalm', '+r facepalm top all 50'],
      args: [{
        key: 'subreddit',
        label: 'Subreddit',
        type: 'string',
        prompt: 'Which subreddit would you like a post from?'
      }, {
        key: 'sort',
        label: 'Sort',
        default: 'hot',
        type: 'string',
        prompt: 'Would you like to sort by `hot`, `top`, `controversial`, or `new`?',
        validate: val => {
          return ValidArgs.sort.includes(val) || 'Would you like to sort by `hot`, `top`, `controversial`, or `new`?'
        }
      }, {
        key: 'from',
        label: 'From',
        default: 'day',
        type: 'string',
        prompt: 'Would you like to pull from the `day`, `week`, `month`, `year`, or `all` time?',
        validate: val => {
          return ValidArgs.from.includes(val) || 'Would you like to pull from the `day`, `week`, `month`, `year`, or `all` time?'
        }
      }, {
        key: 'limit',
        label: 'Limit',
        default: '25',
        type: 'integer',
        min: ValidArgs.limit.min,
        max: ValidArgs.limit.max,
        prompt: `How many posts would you like to pull (${ValidArgs.limit.min} - ${ValidArgs.limit.max})?`
      }]
    })
  }

  async run (msg, { subreddit, sort, from, limit }) {
    const start = subreddit.indexOf('/')
    if (start !== -1) subreddit = subreddit.slice(start + 1)

    try {
      const post = await r.getRandomHotPost(subreddit, sort, from, limit)
      return BaseCmd.sendMessage(msg.channel, post, this.client.user)
    } catch (err) {
      if (err.message === 'Cannot read property \'children\' of undefined') {
        return msg.channel.send('This subreddit does not exist or is private.')
      } else {
        this.error(err)
        return msg.channel.send('There seems to have been an error. Please contact `+support`.')
      }
    }
  }
}

module.exports = Reddit
