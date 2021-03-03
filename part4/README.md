# Fullstack Open Part 3



## Section Summary

### Structure of backend application, introduction to testing

We looked at how our existing app matches up with Node best practices, including having separate folders for controllers and utilities such as a logger and middleware. One of the important parts of this is making our `index.js` file simple and only responsible for starting up the app.

Lastly, installed `jest` and set up our testing environment, including adding a testing script, adding

```
  "jest": {
    "testEnvironment": "node"
  }
```

to our `package.json`, and setting `"jest": true` in our `eslintrc`.  We went over the basics of `describe()` and `test()` and implementing unit tests.

### Testing the Backend

We started by defining our `NODE_ENV` for prod, dev, and testing, and installed `cross-env` to make sure it runs on Windows as well. We added a test DB URI to our env/config to keep things simple (it would be better to run it locally).

We moved on to write integration tests, or tests that test our API. We installed `supertest` to run our app for testing, and address clearing the DB `beforeEach` test and adding sample entries for testing. Then learned the benefits of the new `async/await` syntax for promises and to avoid long chains of promises. But what happened to error handling, you ask? The trusty ol' `try/catch` handling. But wait, there's more. There's a library `express-async-errors` to get rid of that bulk. The library automatically passes exceptions to our error handling middleware.

Last, we looked at using the `forEach()` loop and needing to write it into a `Promise.all()` in order to  *await* any promises in the loop. If the promises need to be executed in order/synchronously (vs in parallel/asynchronously), a `for...of` block would be required.

### User Administration


### Token Authentication
