const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.DB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('Conntected to DB');
  }).catch(err => {
    console.log('Error connecting to DB:', err.message);
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema)
