# Fullstack Open Exercises Part 3a (3.1 - 3.22) Phonebook Pt 2 - Backend

Backend application built with Node and Express to RESTfully serve book of contacts.

## Available Scripts

In the project directory, you can run:

### `npm start`

To start the server. Go to `http://localhost:3001` to see any response from the server.

### `npm run dev`

To start the server in development mode. It will automatically restart when changes are saved.

### `npm run build:ui`

Build `phonebook` frontend app and copy its build to the root directory.

### `npm run deploy`

After building, push code to the deployment.

### `npm run deploy:full`

Runs build and deploy scripts.

### `npm run logs:prod`

Display the deployment logs in real time.

## Deployment

After deploying, find the [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) app at:

https://tranquil-river-04148.herokuapp.com/

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

POST `/`

Requires name (at least 3 characters), number (at least 8 digits). Creates a new contact, returns new contact

Request ex:
```
{
  "name": "Terry Jefferds",
  "number": "999-999-9999"
}
```

Response ex:
```
{
  "name": "Terry Jefferds",
  "number": "999-999-9999",
  "id": 99
}
```
PUT `/:id`

Requires same name as intended contact, with new number. Creates a new contact, returns new contact

Request ex:
```
{
  "name": "Terry Jefferds",
  "number": "99-99-9999"
}
```

Response ex:
```
{
  "name": "Terry Jefferds",
  "number": "99-99-9999",
  "id": 99
}
```

DELETE `/:id`

Deletes person with id, returns status ok

### `/info`

GET `/`

Returns summary of site information
