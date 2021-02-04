# Fullstack Open Part 3



## Section Summary

### Node.js and Express

Back-back-back it up to the backend. Introducing Node, backend framework based on Google's V8 engine. It frees us of the need to transpile our JS in order for the browser to read it and function. Enter the `npm init` command to start a Node app. For web serving, we `require` the built-in `http` module (import/export is in ES6 and Node doesn't yet support ES6).

Since `http` can get cumbersome, enter the `Express` library for building our server.

We want the app to be RESTful. Representational State Transfer is an architectural style for scalable web applications. OK, what does that mean? Every resource (data, etc.) has a unique URL associated with it, allowing for consistent representation of interfaces (what's happening between frontend & backend). We go over sending/receiving data from the server.

**Other Resources:**
- [Semantic Versioning](https://docs.npmjs.com/about-semantic-versioning)
- [Node REPL](https://nodejs.org/docs/latest-v8.x/api/repl.html)
