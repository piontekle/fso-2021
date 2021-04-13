# Fullstack Open Exercises Part 4 (4.1 - 4.23) Bloglist

Backend application built with Node and Express to RESTfully serve lists of blogs that users have saved

## Available Scripts

In the project directory, you can run:

### `npm start`

To start the server. Go to `http://localhost:3001` to see any response from the server.

### `npm run dev`

To start the server in development mode. It will automatically restart when changes are saved.

### `npm run lint`

Run the linter to find formatting and syntax errors.

### `npm test`

Run the test suite.

### `npm run start:test`

Start server in test environment for e2e tests

### Testing

Testing implemented with `Jest` and `supertest`.

## Deployment

TBD

## Routes

### `/api/lists`

GET `/`

Returns list of blog info entries

Ex:
```
[
    {
        "title": "Blog Tests R Us",
        "author": "The Real LPizzle",
        "url": "www.getreal.com",
        "likes": 2,
        "id": "789efg1011"
        "userId": "23434234"
    },
    {
        "title": "WFH Habits that KILL",
        "author": "The Real LPizzle",
        "url": "www.getreal.com/wfh-habits-kill",
        "likes": 100000,
        "id": "123abc456",
        "userId": "23434234"
    }
]
```

POST `/`

Requires title (string) and  url (string). Also takes author (string)and likes (number). Likes will default to 0 if not supplied. Creates a new entry of blog info, returns new blog info

Request ex:
```
{
  "title": "WFH Habits that KILL",
  "author": "The Real LPizzle",
  "url": "www.getreal.com/wfh-habits-kill",
  "likes": 100000
}
```

Response ex:
```
{
  "title": "Blog Tests R Us",
  "author": "The Real LPizzle",
  "url": "www.getreal.com",
  "likes": 2,
  "id": "123abc456"
  "userId": "23434234"
}
```

PUT `/:id`

Requires id param and blog object. Updates an existing blog post.

Request ex:
```
{
  "title": "WFH Habits that KILL",
  "author": "The Real LPizzle",
  "url": "www.getreal.com/wfh-habits-kill",
  "likes": 100000
}
```

Response ex:
```
{
  "title": "Blog Tests R Us",
  "author": "The Real LPizzle",
  "url": "www.getreal.com",
  "likes": 2,
  "id": "123abc456",
  "user": "12312412"
}
```

DELETE `/:id`

Requires id param. Deletes an existing blog post.

### `api/users`

GET `/`

Returns list of users with their blog lists.

POST `/`

Requires username (string, at least 3 characters) and password (string, at least 3 characters). Also takes name (string).

Request ex:
```
{
  "username": "batman",
  "name": "Bruce",
  "password": "nanananana"
}
```

Response ex:
```
{
  "username": "batman",
  "name": "Bruce",
  "password": "nanananana"
  "_id": "213434234"
}
```

### `api/login`

POST `/`

Requires existing username (string) and password (string). Creates and responds with a token.

Request ex:
```
{
  "username": "batman",
  "password": "nanananana"
}
```

Response ex:
```
{
  "token": "eyds2340kjfd23",
  "username": "batman",
  "password": "nanananana"
}
```