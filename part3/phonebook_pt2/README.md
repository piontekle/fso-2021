# Fullstack Open Exercises Part 3a (3.1 - ) Phonebook Pt 2 - Backend

Backend application built with Node and Express to RESTfully serve book of contacts.

## Available Scripts

In the project directory, you can run:

### `npm start`

To start the server. Go to `http://localhost:3001` to see any response from the server.

### `npm run dev`

To start the server in development mode. It will automatically restart when changes are saved.

## Routes

### `/api/persons`

GET `/`

Returns list of contacts

Ex:
```
[
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  }
]
```

GET `/:id`

Returns requested person

Ex:
```
{
  name: "Arto Hellas",
  number: "040-123456",
  id: 1
}
```

GET `/info`

Returns summary of site information