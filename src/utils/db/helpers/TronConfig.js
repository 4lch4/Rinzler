const TConfig = require('../models/TronConfig')
const DBBase = require('../DBBase')

const { Errors, Messages } = require('../../../i18n/enUS/TronConfig')

const TRON_AVATAR = 'https://cdn.discordapp.com/avatars/650351963187183657/d89bcc66f178ad1006f545556776221b.webp?size=2048'

const ValidSettings = {
  announcements: ['announcements', 'announcement', 'announcementschannel', 'announcementchannel'],
  hbic: ['hbic', 'admin', 'headbitch', 'owner'],
  init: ['init', 'initiate', 'initialize'],
  alot: ['alotflag', 'alot'],
  list: ['list', 'ls']
}

class TronConfig extends DBBase {
  /**
   * Initiates a config object for a server if it hasn't already been started.
   * 
   */
  async initiateServerConfig(msg) {
    // Verify a config doesn't already exist for this server.
    const exists = await this.serverHasConfig(msg.guild.id)

    // If it doesn't exist, proceed with initialization.
    if (!exists) {
      // Send initialization message, thanking the user for their interest in Tron.
      await msg.reply(Messages.InitializeReply)

      // Get the values for the initial settings.
      const initConfig = await this.getInitialConfig(msg)

      // Verify the user didn't cancel the initialization.
      if (initConfig === 'cancel') return
      else return this.createServerConfig(initConfig)
    } else return msg.reply(Errors.InitializeConfigExists) // If it does exist, let the user know.
  }

  async getServerConfig (serverId) {
    return new Promise((resolve, reject) => {
      TConfig(this.connection).findById(serverId, (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })
  }

  async createServerConfig(serverConfig) {
    const valid = validateConfig(serverConfig)
    if (valid instanceof Error) return valid
    else {
      return TConfig(this.connection).create(serverConfig)
    }
  }

  /**
   * Checks the database to see if a config already exists for the given server
   * id.
   * 
   * @param {String|Number} serverId The id of the server to check for.
   * 
   * @returns {Promise<Boolean>} Does the server have a config?
   */
  serverHasConfig(serverId) {
    return new Promise((resolve, reject) => {
      TConfig(this.connection).findById(serverId, (err, config) => {
        if (err) reject(err)
        else {
          console.log('config..?')
          console.log(config)
          resolve(config)
        }
      })
    })
  }

  updateConfig(serverId, updateObj) {
    return new Promise((resolve, reject) => {
      TConfig(this.connection).findByIdAndUpdate(serverId, updateObj, { new: true }, (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })
  }

  newSettingsEmbed(msg, saveRes) {
    return {
      embed: {
        title: `**${msg.guild.name}** Settings`,
        color: 3066993,
        timestamp: new Date().toISOString(),
        footer: {
          icon_url: TRON_AVATAR,
          text: `**${msg.guild.name}** Latest Settings`
        },
        author: {
          name: 'Tron',
          icon_url: TRON_AVATAR,
          url: 'https://tronbot.info'
        },
        fields: [{
          name: 'HBIC',
          value: `<@${saveRes.hbic}>`,
          inline: true
        }, {
          name: 'Announcements Channel',
          value: `<#${saveRes.announcementChannel}>`,
          inline: true
        }, {
          name: 'Alot Flag',
          value: saveRes.alotFlag,
          inline: true
        }]
      }
    }
  }

  /**
   * Validates the given setting name is a valid name/alias for a configurable
   * setting.
   * 
   * @param {String} settingName The setting name to validate.
   * 
   * @returns {Boolean} Is it a valid setting?
   */
  validateSettingName(settingName) {
    settingName = settingName.toLowerCase()

    if (ValidSettings.alot.includes(settingName) |
      ValidSettings.announcements.includes(settingName) |
      ValidSettings.hbic.includes(settingName)) return true
    else return false
  }

  /**
   * Parses the given user provided String and returns the MongoDB version of the
   * setting name.
   *
   * @param {String} settingName The user provided version of the setting name.
   *
   * @returns {String|undefined} The MongoDB safe setting name or undefined if none could be found.
   */
  parseSettingName(settingName) {
    if (ValidSettings.alot.includes(settingName)) return 'alotFlag'
    if (ValidSettings.announcements.includes(settingName)) return 'announcementChannel'
    if (ValidSettings.hbic.includes(settingName)) return 'hbic'

    return undefined
  }

  /**
   * Parses the incoming arguments that were provided by the user and returns an
   * object with the arguments neatly organized.
   * 
   * @param {string[]} args The arguments provided by the user to be parsed.
   */
  parseArgs(args) {
    // Likely contains a setting name/value
    if (args.length >= 2) {
      if (this.validateSettingName(args[0])) {
        const settingName = this.parseSettingName(args[0])
        const settingValue = args.slice(1).join()

        return {
          name: settingName,
          value: settingValue
        }
      } else return new Error('The setting name provided was invalid.')
    } else if (args.length === 1) {
      if (ValidSettings.init.includes(args[0].toLowerCase())) return 'init'
      else if (ValidSettings.list.includes(args[0].toLowerCase())) return 'list'
    }

    return args
  }

  /**
   * Initializes a config object/item for the given server id to be used going
   * forward when working with this server.
   * 
   * @param {Message} msg The Message object from when the command was called.
   */
  async getInitialConfig(msg) {
    try {
      if (!msg) return new Error('No message object was provided.')
      let initConfig = {
        _id: msg.guild.id
      }

      const hbic = await this.getHBICResponse(msg)
      if (hbic) initConfig = { hbic: hbic, ...initConfig }
      else return 'cancel'

      const announcementChannel = await this.getAnnouncementChannelResponse(msg)
      if (announcementChannel) initConfig = { announcementChannel: announcementChannel, ...initConfig }
      else return 'cancel'

      const alotFlag = await this.getAlotFlagResponse(msg)
      if (alotFlag) initConfig = { alotFlag: alotFlag, ...initConfig }
      else return 'cancel'

      return initConfig
    } catch (err) { return err }
  }

  /**
   * Validates the given String is a valid channel mention.
   *
   * @param {String} val The input String from the user to validate.
   */
  validateAnnouncementChannelInput(val) {
    return (val.startsWith('<#') && val.endsWith('>')) || val.toLowerCase() === 'n/a'
  }

  /**
   * 
   * @param {String} announcementChannel The channel to parse the id from.
   */
  getAnnouncementChannelId(announcementChannel) {
    if (announcementChannel.includes('!')) return announcementChannel.slice(3, announcementChannel.length - 1)
    else return announcementChannel.slice(2, announcementChannel.length - 1)
  }

  /**
   * 
   * @param {Message} msg The Message object that initiated the command.
   * 
   * @returns {Promise<String>} The id of the channel to use for announcements.
   */
  async getAnnouncementChannelResponse(msg) {
    try {
      await msg.channel.send('When Tron has announcements, such as new features or maintenance, which channel would you like that to go in?\n\n_(Simply tag the channel you would like to use or reply N/A for none.)_')
      const announcementChannel = await BaseCmd.getResponse(msg, val => this.validateAnnouncementChannelInput(val), msg.author.id, 'Please tag a valid channel for announcements or reply N/A for none.')
      if (announcementChannel) return this.getAnnouncementChannelId(announcementChannel)
      else {
        msg.channel.send('Guess we\'ll pick this up later?')
        return undefined
      }
    } catch (err) { return err }
  }

  /**
   * Validates the given String it is equal to one of the following:
   * 
   * - yes/y
   * - no/n
   * - true
   * - false
   *
   * @param {String} val The input String from the user to validate.
   * @returns {boolean} Whether or not the input String is valid.
   */
  validateAlotFlagInput(val) {
    switch (val.toLowerCase()) {
      case 'yes':
      case 'y':
      case 'no':
      case 'n':
      case 'true':
      case 'false':
        return true;

      default:
        return false;
    }
  }

  /**
   * Converts the given String from yes/no/true/false to a boolean value in order
   * to be saved in the database. If the input is none of the previously mentioned
   * values, the default of true is returned.
   * 
   * @param {String} input The String version of the Alot flag to convert.
   * 
   * @returns {Boolean} Boolean value of the input String.
   */
  booleanizeAlotFlag(input) {
    switch (input.toLowerCase()) {
      case 'yes':
      case 'y':
      case 'true':
      case 't':
        return true

      case 'no':
      case 'n':
      case 'false':
      case 'f':
        return false

      default:
        return true
    }
  }

  /**
   * 
   * @param {Message} msg The Message object that initiated the command.
   */
  async getAlotFlagResponse(msg) {
    try {
      await msg.channel.send('Would you like Tron to post the alot creature when the word `alot` is detected in a message?\n\nNot sure why this would be a joke? This is for you: https://www.grammarly.com/blog/a-lot-alot-allot/')
      const alotFlag = await BaseCmd.getResponse(msg, val => this.validateAlotFlagInput(val), msg.author.id, 'Please provide a valid value for the alot flag (yes/no/true/false).')

      if (alotFlag) return this.booleanizeAlotFlag(alotFlag)
      else {
        msg.channel.send('Guess we\'ll pick this up later?')
        return undefined
      }
    } catch (err) { return err }
  }

  /**
   * Validates the user input to ensure it is a valid user being tagged.
   * 
   * @param {String} val The value provided by the user that is to be validated.
   */
  validateHBICInput(val) {
    return val.startsWith('<@') && val.endsWith('>')
  }

  async getHBICResponse(msg) {
    try {
      await msg.channel.send("To start, who is the servers HBIC, otherwise known as the **H**ead **B**itch **I**n **C**harge?\n\n_(Just tag whoever is your server HBIC/owner)_")
      const HBIC = await BaseCmd.getResponse(msg, val => this.validateHBICInput(val), msg.author.id, 'Please tag a valid user.')
      if (HBIC) return this.getHBICid(HBIC)
      else {
        msg.channel.send('Guess we\'ll pick this up later?')
        return undefined
      }
    } catch (err) { return err }
  }

  /**
   * Parses the input string and returns the ID of the HBIC.
   * 
   * @param {String} hbic The string containing the id of the HBIC.
   */
  getHBICid(hbic) {
    if (hbic.includes('!')) return hbic.substring(3, hbic.length - 1)
    else return hbic.substring(2, hbic.length - 1)
  }

  listEmbed() {
    return {
      embed: {
        title: "Valid Settings",
        description: "This is a collection of all the settings you can change for your server and the alias for those settings.That means you can use the full name or the alias when referencing it:\n\n— `+tconfig hbic @4lch4#0042`\n— `+tconfig admin @4lch4#0042`\n— `+tconfig owner @4lch4#0042`",
        color: 3066993,
        timestamp: new Date().toISOString(),
        author: {
          name: 'Tron',
          url: 'https://tronbot.info',
          icon_url: TRON_AVATAR
        },
        footer: {
          icon_url: TRON_AVATAR,
          text: 'Valid Settings List'
        },
        fields: [
          {
            name: 'hbic',
            value: "hbic\nadmin\nheadBitch\nowner",
            inline: true
          },
          {
            name: 'announcementsChannel',
            value: "announcement\nannouncements\nannouncementChannel\nannouncementsChannel",
            inline: true
          },
          {
            name: 'alotFlag',
            value: "alotFlag\nalot",
            inline: true
          }
        ]
      }
    }
  }
}

module.exports = TronConfig

/**
 * Validates the given ServerConfig object to ensure it contains the proper
 * values.
 *
 * @param {ServerConfig} serverConfig The server config object to validate.
 */
const validateConfig = serverConfig => {
  if (!serverConfig._id) return new Error('The required parameter _id was not provided, please provide a server id.')
  if (!serverConfig.announcementChannel) return new Error('The required announcementChannel parameter was not provided.')
  if (!serverConfig.hbic) return new Error('The required hbic parameter was not provided.')
  if (!serverConfig.alotFlag) return new Error('The required alotFlag parameter was not provided.')

  return true
}

/**
 * @typedef {Object} ServerConfig
 * 
 * @prop {String} _id The id of the server this config is for.
 * @prop {String} announcementChannel The channel for posting any announcements regarding Tron.
 * @prop {String} hbic The user id for the Head Bitch In Charge.
 * @prop {Boolean} alotFlag Whether or not to reply with the alot creature.
 */

const { Model } = require('mongoose')