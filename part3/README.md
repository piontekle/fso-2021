# Fullstack Open Part 3

**phoneboo_pt2:** Exercises 3.1 - 3.22

## Section Summary

### Node.js and Express

Back-back-back it up to the backend. Introducing Node, backend framework based on Google's V8 engine. It frees us of the need to transpile our JS in order for the browser to read it and function. Enter the `npm init` command to start a Node app. For web serving, we `require` the built-in `http` module (import/export is in ES6 and Node doesn't yet support ES6).

Since `http` can get cumbersome, enter the `Express` library for building our server.

We want the app to be RESTful. Representational State Transfer is an architectural style for scalable web applications. OK, what does that mean? Every resource (data, etc.) has a unique URL associated with it, allowing for consistent representation of interfaces (what's happening between frontend & backend). We go over sending/receiving data from the server.

**HTTP Request Types**

Definitions:
 - safe: does not have any side effects on the server
 - idempotent: side effects of N>0 identical requests are the same as a single request (i.e. 10 requests have the same side effects as 1 request)


GET - retrieve data, safe and indempotent\
POST - send data to server, replacing for update\
PUT - send data to server, updating a record, indempotent\
DELETE - delete data from server, indempotent

**Middleware:** functions used to handle request and response objects\
Ex: `json-parser` takes the raw data from the request, parses it into JS, and assigns it to the request (`body`)

**Other Resources:**
- [Semantic Versioning](https://docs.npmjs.com/about-semantic-versioning)
- [Node REPL](https://nodejs.org/docs/latest-v8.x/api/repl.html)

### Deploying to the Internet

CORS: Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the first resource was served. A web page may freely embed cross-origin images, stylesheets, scripts, iframes, and videos. Certain "cross-domain" requests, notably Ajax requests, are forbidden by default by the same-origin security policy (i.e. by default browser only communicates with servers of the same origin) [Mozilla CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

Enter [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) for deployment. Create and push the app according to the docs. Then for the frontend, we need to run `npm run build` to get the production build of our frontend app. In order to use the frontend, we copy the build to the root directory of the backend app. This means every time there's a change in the frontend, we need to rebuild & copy the build to the backend. To streamline, add these scripts to `package.json`:

```
"scripts": {
  //...
  "build:ui": "rm -rf build && cd ../../osa2/materiaali/notes-new && npm run build --prod && cp -r build ../../../osa3/notes-backend/",
  "deploy": "git push heroku main",
  "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && npm run deploy",    
  "logs:prod": "heroku logs --tail"
}
```

**Other Resources:**
- [Deployment Pipeline](https://martinfowler.com/bliki/DeploymentPipeline.html)

### Saving data to MongoDB

MongoDB is a NoSQL document based database (vs. relational). They use [collections](https://docs.mongodb.com/manual/core/databases-and-collections/) and [documents](https://docs.mongodb.com/manual/core/document/).

We created our database with a user and network access to anywhere IP address-wise, and get our connection URI. Then go over creating a schema and saving new objects (`new()` and `.save`). Review `find({})` to retrieve all documents or filling the brackets with attributes to filter.

We covered error handling, using `next(error)` to forward the error along to am iddleware error handler we created. Then covered deleting and updating. Another important note is paying attention to the order of our Middleware. The `.use(json)` has to be before all our requests in order for them to be parsed correctly, for example. And the error handler and unknown routes should be close to last. They're called in the order they're coded.

### Validation and ESLint

In order to ensure our DB entries have the correct information, we can use the Mongoose validation in our schema. Wrap that all together and get that deployed.

Last but not least, we covered linting and using ESLint to keep our code good looking and consistent. After installing, initialize with

```
node_modules/.bin/eslint --init
```

...and answer the questions. Then add the `eslint .` script and fix the errors. Pretty straight forward.
