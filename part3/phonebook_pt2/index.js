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

app.get('/info', (request, response, next) => {
  Person.find({})
    .then(persons => {
      const date = new Date();

      response.send(`<div>Phonebook has info for ${persons.length} people</div><div>${date}</div>`)
    })
    .catch(err => next(err));
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  })
  .catch(err => next(err));
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(err => next(err));
});

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(res => {
      response.status(204).end();
    })
    .catch(err => next(err));
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
  .catch(err => next(err))
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(err => next(err));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
