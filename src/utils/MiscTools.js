const { MessageEmbed } = require('discord.js')
const giphy = require('giphy-js-sdk-core')
const colors = require('./colors')
const Chance = require('chance')
const chance = new Chance()

module.exports = class MiscTools {
  async queryGiphy (query, username, avatarUrl) {
    const queryStr = require('querystring')
    try {
      var results = await giphy.search('gifs', { q: queryStr.escape(query) })
      var random = this.getRandom(0, results.data.length)
      if (results.data[random] === undefined) return Promise.resolve(null)
      else var embedUrl = results.data[random].images.original.url

      return Promise.resolve(new MessageEmbed()
        .setAuthor(username, avatarUrl, 'http://tronbot.info')
        .setColor(colors.Decimal.deepPurple.P500)
        .setFooter('Powered by Giphy.', 'https://s3.amazonaws.com/ionic-marketplace/ionic-giphy/icon.png')
        .setImage(embedUrl)
      )
    } catch (err) { return Promise.reject(err) }
  }

  upperFirstC (string) {
    const temp = string.toLowerCase()
    return temp.charAt(0).toUpperCase() + temp.slice(1)
  }

  numberWithCommas (num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  pickImage (images) {
    if (this.containsData(images)) {
      const random = this.getRandom(0, images.length)
      if (images[random] === undefined) return this.pickImage(images)
    }
  }

  containsData (object) {
    return object !== null &&
          object !== undefined &&
          object.length !== 0
  }

  /**
   * Returns a random integer between the min (inclusive) and max (exclusive).
   *
   * @param {*} min
   * @param {*} max
   */
  getRandom (min, max) {
    if (min < max) {
      return chance.integer({
        min: min,
        max: (max - 1)
      })
    } else {
      return 0
    }
  }

  /**
   *
   * @param {string} message
   * @param {Client} client
   */
  sendOwnerMessage (message, client) {
    return client.users.get('219270060936527873').send(message)
  }
}
