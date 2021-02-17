require('dotenv').config()
const express = require('express');
const morgan = require('morgan');

const app = express();

const Person = require('./models/person');

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.json())
app.use(express.static('build'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
});

app.get('/info', (request, response) => {
  const total = persons.length
  const date = new Date();

  response.send(`<div>Phonebook has info for ${total} people</div><div>${date}</div>`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  })
});

app.get('/api/persons/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const person = Person.findById(id);

  if (person) {
    response.status(200).json(person);
  }
  response.status(404).send('Person not found');
});

app.delete('/api/persons/:id', (request, response) => {
  const id = parseInt(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(200).send({ status: 'ok' });
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (body.name === undefined || body.number === undefined) {
   return response.status(400).json({ error: 'Missing information' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(newPerson => {
    response.json(newPerson)
  })
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
