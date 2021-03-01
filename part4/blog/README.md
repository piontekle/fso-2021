# Fullstack Open Exercises Part 4 (4.1 - ) Bloglist

Backend application built with Node and Express to RESTfully serve lists of blogs that users have saved

## Available Scripts

In the project directory, you can run:

### `npm start`

To start the server. Go to `http://localhost:3001` to see any response from the server.

### `npm run dev`

To start the server in development mode. It will automatically restart when changes are saved.

### `npm run lint`

Run the linter to find formatting and syntax errors.

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
    },
    {
        "title": "WFH Habits that KILL",
        "author": "The Real LPizzle",
        "url": "www.getreal.com/wfh-habits-kill",
        "likes": 100000,
        "id": "123abc456"
    }
]
```

POST `/`

Requires title (string), author (string), url (string), and likes (number). Creates a new entry of blog info, returns new blog info

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
}
```
