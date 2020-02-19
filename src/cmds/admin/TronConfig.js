const { Messages, Errors } = require('../../i18n/enUS/TronConfig')
const THelper = require('../../utils/db/helpers/TronConfig')
const BaseCmd = require('../_bases/BaseCmd')

class TronConfig extends BaseCmd {
  constructor(client) {
    super(client, {
      name: 'tronconfig',
      memberName: 'tronconfig',
      group: 'admin',
      description: 'Configure Tron settings for your server. Only usable by server admins.',
      aliases: ['tconfig'],
      examples: ['+tconfig announcements #announcements', '+tronconfig alot false'],
      guildOnly: true,
      userPermissions: ['ADMINISTRATOR'],
      argsType: 'multiple'
    })
  }

  /**
   * 
   * @param {Message} msg 
   * @param {*} args 
   */
  async run(msg, args) {
    try {
      // Initialize a THelper class.
      const tHelper = new THelper()

      // If no args are provided by the user,
      if (args.length === 0) {
        // Perform getResponse queries to get the settings/values from the user.
        await msg.channel.send(Messages.InitializeZeroArgsReply)

        // Get the setting they wish to change.
        const settingNameIn = await BaseCmd.getResponse(msg, val => tHelper.validateSettingName(val), msg.author.id, Errors.InvalidSettingName)

        // Convert the user provided string to the mongo db version of it.
        const settingName = tHelper.parseSettingName(settingNameIn)

        switch (settingName) {
          case 'hbic':
            const hbic = await tHelper.getHBICResponse(msg)
            if (hbic) await tHelper.updateConfig({ hbic: hbic })
            break

          case 'announcementChannel':
            const announcementChannel = await tHelper.getAnnouncementChannelResponse(msg)
            if (announcementChannel) await tHelper.updateConfig({ announcementChannel: announcementChannel })
            break

          case 'alotFlag':
            const alotFlag = await tHelper.getAlotFlagResponse(msg)
            if (alotFlag) tHelper.updateConfig({ alotFlag: alotFlag })
            break
        }
      } else {
        // Parse the args provided by the user.
        const userArgs = tHelper.parseArgs(args)

        // Check if the user provided an invalid setting name, let them know.
        if (userArgs instanceof Error) return msg.reply(Errors.InvalidSettingName)

        // Check if the user wants to initiate a server config.
        else if (userArgs === 'init') return tHelper.initiateServerConfig(msg)

        // Check if the user wants to list the available settings.
        else if (userArgs === 'list') return msg.channel.send('', listEmbed)

        // Check if the user provided a setting name & value.
        else if (userArgs.name && userArgs.value) {
          let saveRes

          // Check the name of the setting they wish to modify and attempt to update the server config.
          switch (userArgs.name) {
            // User wishes to update the announcementChannel setting.
            case 'announcementChannel':
              saveRes = await tHelper.updateConfig(msg.guild.id, { announcementChannel: tHelper.getAnnouncementChannelId(userArgs.value) })
              break

            // User wishes to update the hbic setting.
            case 'hbic':
              saveRes = await tHelper.updateConfig(msg.guild.id, { hbic: tHelper.getHBICid(userArgs.value) })
              break

            // User wishes to update the alotFlag setting.
            case 'alotFlag':
              saveRes = await tHelper.updateConfig(msg.guild.id, { alotFlag: tHelper.booleanizeAlotFlag(userArgs.value) })
              break

            default:
              return msg.reply(`the setting name you provided (${userArgs.name}) does not seem to be valid. Please try again :slight_frown:`)
          }

          return msg.reply(`has updated the \`${userArgs.name}\` setting, here are your new server settings:`, tHelper.newSettingsEmbed(msg, saveRes))
        }
      }
    } catch (err) {
      msg.reply(Errors.UnexpectedError)
      this.error(err)
    }
  }
}

module.exports = TronConfig

//#region Type Data
const { Message } = require('discord.js')
//#endregion Type Data