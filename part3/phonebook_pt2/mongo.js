const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide a password')
  process.exit(1)
}

const user = process.argv[3] || process.env.DB_USER
const password = process.argv[2] || process.env.DB_PASS
const name = process.argv[4] || process.env.DB_NAME

if (!user || !password || !name) {
  console.log('Missing DB auth variables.')
  process.exit(1)
}

const url =
  `mongodb+srv://${user}:${password}@cluster0.a0w9u.mongodb.net/${name}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('Conntected to DB ', name)
  }).catch(err => {
    console.log('Error connecting to DB:', err)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 6) {
  Person
    .find({})
    .then(persons => {
      console.log('phonebook:')
      persons.forEach(person => {
        console.log(person.name, ' ', person.number)
      })
      mongoose.connection.close()
    })
    .catch(err => {
      console.log('Error retrieving people:', err)
    })
} else {
  const person = new Person({
    name: process.argv[5],
    number: process.argv[6],
  })

  person.save().then(() => {
    console.log('person saved!')
    mongoose.connection.close()
  }).catch(err => console.log(err))
}
