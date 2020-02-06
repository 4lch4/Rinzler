const SuggestionModel = require('../models/Suggestion')
const DBBase = require('../DBBase')

class SuggestionDB extends DBBase {
  /**
   * Creates a new Suggestion object using the given values & saves it to the
   * MongoDB.
   *
   * @param {string} content The body/content of the Suggestion.
   * @param {*} author The User object of the Suggestion creator/author.
   *
   * @returns {Promise<Object>} The Suggestion that was created & stored.
   */
  async createSuggestion (content, author) {
    // Verify the Suggestion object contains required properties.
    if (!content || content.length === 0) return new Error('No content was provided for the new suggestion.')
    if (!author || !author.id || !author.username) return new Error('No author, or an invalid author, was provided for the new suggestion.')

    // Create Suggestion object
    return SuggestionModel(this.connection).create({
      _id: this.generateId(),
      author: {
        _id: author.id,
        username: author.username,
        discriminator: author.discriminator
      },
      content: content
    })
  }
}

module.exports = SuggestionDB

/**
 * @typedef {Object} Suggestion
 *
 * @prop {string} [_id] The unique identifier of the Suggestion. Will be generated if one isn't provided.
 * @prop {Author} author The creator/author of the Suggestion.
 * @prop {string} content The body/content of the Suggestion.
 */

/**
 * @typedef {Object} Author
 *
 * @prop {string} [id] The unique identifier of the Author object. Will be generated if one isn't provided.
 * @prop {string} username The display name/username of the Author.
 */
