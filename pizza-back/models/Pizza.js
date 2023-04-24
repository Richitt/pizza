
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
let pizzaSchema = new Schema({
  person: {
    type: String
  },
  'meat-type': {
    type: String
  },
  date: {
    type: Date
  }
}, {
    collection: 'pizzas'
  })
  
module.exports = mongoose.model('Pizza', pizzaSchema)