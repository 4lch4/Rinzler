const { CommandoClient, SQLiteProvider } = require('discord.js-commando')
const sendMessage = require('./src/cmds/_bases/BaseCmd').sendMessage
const TStats = new (require('./src/utils/db/helpers/TronStats'))()
const dTools = require('./src/utils/tools').DateTools
const mTools = require('./src/utils/tools').MiscTools
const config = require('./src/utils/config')
const logger = require('./src/utils/logger')
const sqlite = require('sqlite')
const path = require('path')

// #region Client Initialization
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

// #region Event Listeners
client.on('ready', () => {
  const readyTime = dTools.formattedUTCTime
  const readyMsg = `Rinzler has come online > **${readyTime} UTC**`

  sendMessage(client.channels.get(config.testChannel), `<@219270060936527873>, ${readyMsg}`, client.user)
  TStats.saveStartupTime(readyTime).catch(err => logger.error(err))

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

  logger.info(readyMsg)
})

client.on('disconnect', listener => {
  logger.warn('Rinzler was disconnected...')
  logger.warn(listener)
})

client.on('reconnecting', listener => {
  logger.warn('Rinzler is reconnecting...')
  logger.warn(listener)
})

client.on('commandError', (cmd, err) => {
  logger.error(`Error when executing ${cmd.name} command...`)
  logger.error(err)
})

client.on('commandRun', (cmd, promise, msg) => TStats.incrementCmdUsage(cmd, msg))
client.on('error', err => logger.error(err))
client.on('warn', info => logger.warn(info))
// #endregion Event Listeners
// #endregion Client Initialization

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

// Login to Discord and get shit started.
client.login(config.discordSecret).catch(err => { logger.error(err) })
