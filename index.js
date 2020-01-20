const { CommandoClient, SQLiteProvider } = require('discord.js-commando')
const sendMessage = require('./src/cmds/_bases/BaseCmd').sendMessage
const config = require('./src/utils/config')
const logger = require('./src/utils/logger')
const Tools = require('./src/utils/Tools')
const dTools = new Tools().DateTools
const mTools = new Tools().MiscTools
const sqlite = require('sqlite')
const path = require('path')

const client = new CommandoClient({
  commandPrefix: config.cmdPrefix,
  owner: config.owner,
  disableEveryone: true
})

client.registry
  .registerDefaultTypes()
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerGroups([
    ['actions', 'Action Command Group'],
    ['reactions', 'Reaction Command Group'],
    ['admin', 'Admin Command Group'],
    ['info', 'Informative Commands Group'],
    ['features', 'Feature Command Group'],
    ['nsfw', 'NSFW Command Group'],
    ['user', 'User Command Group']
  ])
  .registerCommandsIn({
    dirname: path.join(__dirname, 'src', 'cmds'),
    excludeDirs: /(util)|(_bases)/
  })

sqlite.open(path.join(__dirname, 'data', 'settings.sqlite3'))
  .then(db => client.setProvider(new SQLiteProvider(db)))

client.on('ready', () => {
  const readyTime = dTools.formattedUTCTime

  sendMessage(client.channels.get(config.testChannel), `<@219270060936527873>, Rinzler has come online > **${readyTime}**`, client.user)

  /**
   * Rotates the activity setting on Tron every 2 minutes (120,000ms) to a
   * random value  in config.activities. Ideally, I'd like to add information
   * such as  current number of guilds/users we support and add it to the list
   * of "activities" as well.
   *
   * When an update occurs, it is logged in the info log.
   */
  setInterval(function () {
    const activities = config.activities
    const random = mTools.getRandom(0, activities.length)
    const activity = activities[random]

    logger.info(`Updating activity to ${activity}`)

    client.user.setActivity(activity)
  }, 120000)

  logger.info(`Rinzler has come online > ${readyTime}`)
})

client.on('commandError', (cmd, err) => logger.error(err))
client.on('error', err => logger.error(err))
client.on('warn', info => logger.info(info))

// client.on('message', msg => {
// switch (msg.author.id) {
//   case '150319175326236672': // Zenny
//     if (zenCount === 10) {
//       zenCount = 0
//       return msg.reply('meh.')
//     } else zenCount++
//     break
// }

// if (msg.content.split(' ').includes('alot')) {
//   ioTools.getImage('alot.png').then(image => {
//     sendMessage(msg.channel, '', client.user, { files: [image] })
//   }).catch(console.error)
// }
// })

client.login(config.discordSecret).catch(err => { logger.error(err) })
