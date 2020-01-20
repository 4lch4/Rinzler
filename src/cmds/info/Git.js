const BaseCmd = require('../_bases/BaseCmd')
const pkgInfo = require('../../../package.json')

class Git extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'git',
      group: 'features',
      memberName: 'git',
      description: 'Returns a link to the Github repository for Tron.',
      examples: ['+git'],
      aliases: ['github', 'repo']
    })
  }

  async run (msg, args) {
    let repoUrl = pkgInfo.repository.url
    repoUrl = repoUrl.substring(repoUrl.indexOf('https'), repoUrl.indexOf('.git'))

    return BaseCmd.sendMessage(msg.channel, `${msg.author.username}, you can find the git repo for Tron here: ${repoUrl}`, this.client.user)
  }
}

module.exports = Git
