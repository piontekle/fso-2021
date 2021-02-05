const express = require('express');
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
