# Fullstack Open Part 2

**courseinfo pt 2:** Exercises 2.1 - 2.5

**phonebook:** Exercises 2.6 - 2.11, 2.15 - 2.20

**countries:** Exercises 2.12 - 2.14

## Section Summary

### Rendering a Collection, Modules

We got a refresher on JS Arrays and get introduced to the `.map()` function, which returns a new array created with whatever function you pass to it, to display arrays/collections dynamically. We also learn about the `key` attribute which needs to be added to any components returned by the map. It's frowned upon to use the array index as the key because it's not unique to the variable and could be repeated elsewhere on your page. Lastly, we learned to extract modules into their own file and export/import them.

### Forms

Overview of forms and their inputs, `onSubmit` attribute, and adding to state from the form input. Then looked at how to filter display elements (`.filter()`). We start our Phonebook app for adding contacts.

### Getting Data from the Server

We install `JSON Server` to act as our development server, so we can preserve contacts we add and not just hard code into our application. We add `axios` to our app as well to make CRUD calls to our server (we only work through `GET`/read in this section, getting country info and the weather).

We then look at `promises` and using them with our `axios` calls to make sure our calls complete before moving to the next action. This is necessary because JS engines run asynchronously.

Three states of promises:
1. **pending:** final value unavailable
2. **fulfilled:** final value is available/action completed
3. **rejected:** error prevented final value from being unavailable

**Other resources:**
- [What the Heck is the Event Loop Anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [Single Thread Web Browser](https://medium.com/techtrument/multithreading-javascript-46156179cf9a)

Another React hook, `useEffect` is introduced. This hook is triggered by change in state, or if you just want to trigger something on initial render, add an empty array `[]`.

### Altering Data in the Server

This is when we add to our CRUD actions with create, update, and delete to our JSON server. We learn `PATCH` vs `PUT` (update vs. completely replace with update). We cleaned up our app a bit by extracting our server communication functions into it's own `services.js` file.

### Adding Styles to the React App

We learn about adding styles to `index.css` and importing them. Quick review of CSS selectors (because we did our [Mozilla CSS tutorial](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics)). Then we learned the power of inline styles if we want to add styles to our app  code, as React allows (down side is that pseudoclasses aren't as straightforward).

We take this new power to add user feedback to our app in the form of success and error banners on user actions.
