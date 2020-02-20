const BaseCmd = require('../_bases/BaseCmd')

class Purge extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'purge',
      group: 'admin',
      memberName: 'purge',
      description: 'Purges the last given amount of messages, or all of the messages from a specific User within the last 100 messages, in the channel.',
      userPermissions: ['MANAGE_MESSAGES'],
      clientPermissions: ['MANAGE_MESSAGES'],
      examples: ['+purge'],
      aliases: ['purges'],
      argsType: 'multiple',
      guildOnly: true
    })
  }

  /**
   * Runs the Purge command.
   *
   * @param {CommandMessage} msg The CommandMessage object that called the cmd.
   * @param {String[]} args The arguments provided by the user.
   */
  async run (msg, args) {
    try {
      // console.log(args)
      // Validate the User provided args.
      if (args.length > 0) {
        // Test if the User mentioned anyone.
        if (msg.mentions.users.size > 0 & isNaN(args[0])) { // User(s) mentioned, purge their messages.
          // Iterate through each User mentioned and delete their messages up to the provided amount.
          for (const user of msg.mentions.users) await deleteUsersMessages(user[1], msg)
          // // Iterate through each User mentioned.
          // for (const user of msg.mentions.users) {
          //   // Iterate through each message in the Channel.
          //   for (const message of msg.channel.messages) {
          //     // If the message was authored by the mentioned User, delete it.
          //     if (user[1].id === message[1].author.id) await message[1].delete()
          //   }
          // }
        } else if (msg.mentions.users.size > 0 & !isNaN(args[0])) { // User(s) mentioned and an amount of messages to delete was provided.
          // Iterate through each User mentioned and delete their messages up to the provided amount.
          for (const user of msg.mentions.users) await deleteUsersMessages(user[1], msg, args[0])
          // for (const user of msg.mentions.users) {
          //   // Set the count variable to whatever the User provided.
          //   let count = args[0]

          //   // Iterate through each message in the channel.
          //   for (const message of msg.channel.messages) {
          //     // If the message was authored by the mentioned User, and the count is over 0, delete it.
          //     if (user[1].id === message[1].author.id & count > 0) {
          //       // Delete the message.
          //       await message[1].delete()

          //       // Lower the count to indicate the message was deleted.
          //       count--
          //     }
          //   }
          // }
        } else if (!isNaN(args[0])) { // Amount of messages to delete has been provided.
          const deletedMsgs = await msg.channel.bulkDelete(Number(args[0]))
          return msg.channel.send(`You successfully deleted ${deletedMsgs.size} messages.`)
        } else return msg.reply('the arguments you provided were invalid. Please check the help for this command and try again.')

        return msg.channel.send('Purge complete!')
      } else return msg.reply('you must provide a number of messages to delete or tag a User if you want to remove all of the messages they\'ve sent in the last 100 messages of this channel.')
    } catch (err) {
      this.error(err)
      return msg.reply('unfortunately I have experienced an unexpected error. This incident has been logged and will hopefully be resolved soon. If not, feel free to reach out to `@4lch4#0042`.')
    }
  }
}

module.exports = Purge

/**
 * Deletes the given Users messages in the channel where the CommandMessage was
 * posted. If the msgCount parameter is provided, then that amount of messages
 * will be deleted.
 *
 * @param {User} user The User whose messages you would like to delete.
 * @param {CommandMessage} msg The CommandMessage object used to instantiate the command.
 * @param {Number} [msgCount] How many messages to delete.
 */
const deleteUsersMessages = async (user, msg, msgCount) => {
  const messages = await msg.channel.fetchMessages({ limit: 100 })

  for (const message of messages) {
    if (user.id === message[1].author.id && (msgCount === undefined | msgCount > 0)) {
      await message[1].delete()
      if (msgCount) msgCount--
    }
  }
}

// #region Type Data
const { CommandMessage } = require('discord.js-commando')
const { User } = require('discord.js')
// #endregion Type Data
