const express = require('express');
const morgan = require('morgan');

const app = express();

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  },
];

const generateID = () => {
  return Math.floor(Math.random() * Math.floor(100000))
}

const validatePerson = (newPerson) => {
  if (!newPerson) return "Missing request body";

  if (!newPerson.name) return "Missing contact name";
  if (!newPerson.number) return "Missing contact number";

  const personExists = persons.find(person => person.name.toLowerCase() == newPerson.name.toLowerCase());
  if (personExists) return "Contact already exists";

  return "ok";
}

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
});

app.get('/info', (request, response) => {
  const total = persons.length
  const date = new Date();

  response.send(`<div>Phonebook has info for ${total} people</div><div>${date}</div>`)
})

app.get('/api/persons', (request, response) => {
  response.send(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.status(200).json(person);
  }
  response.status(404).send('Person not found');
});

app.delete('/api/persons/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const persons = persons.filter(person => person.id !== id);

  response.status(200).send({ status: 'ok' });
});

app.post('/api/persons', (request, response) => {
  const newPerson = request.body;
  const valid = validatePerson(newPerson);

  if (valid === "ok") {
    newPerson.id = generateID();
    persons = persons.concat(newPerson);

    response.status(200).json(newPerson);
  } else {
    response.status(500).json({ err: valid });
  }
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
