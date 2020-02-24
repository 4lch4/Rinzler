const mongoose = require('mongoose')

const SuggestionSchema = mongoose.Schema({
  // The id of the suggestion.
  _id: String,

  // The author of the suggestion.
  author: {
    _id: String,
    username: String,
    discriminator: String
  },

  // The content of the suggestion itself.
  content: String
})

module.exports = connection => {
  return connection.useDb('data').model('Suggestion', SuggestionSchema, 'suggestions')
}
