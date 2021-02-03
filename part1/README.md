# Fullstack Open Part 1

**courseinfo:** Exercises 1.1 - 1.5

**unicafe:** Exercises 1.6 - 1.11

**anecdotes:** Exercises 1.12 - 1.14

## Section Summary

### Intro to React

Part 1 starts with brief introduction of React and the all-important `create-react-app` to create our first app. We started with a single `App` component and identified repeated parts to pull out into separate components to clean up the code a little as well as practice passing props. All components were written inside of the `index.js` file.

### Intro to JS

Following was an intro to JavaScript (not Java), getting the basic data types and declarations. Coming together with our React learning, the focus is on Classes and Objects. Functional components are more efficient and powered by React hooks, but it's good to have that background (some of the debate is here)[https://github.com/petsel/not-awesome-es6-classes]. We cleaned up our `courseinfo` app with our new JS knowledge.

**Other Resources:**
- (Re-introduction to JavaScript)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript] (all hail Mozilla)
- (You Don't Know JS Series)[https://github.com/getify/You-Dont-Know-JS]

### Component state, event handlers

As the title suggests, we went over how to handle events (`onClick`, etc.) and React state. In functional components, state is changed in the `useState` handler. It's important not to manipulate state directly (use `.concat()` instead of `.push()` for arrays, etc.).

Change in state triggers re-rendering, so when we pass state as props, the change will be reflected in the children.

### Debugging

We added states and worked through debugging through both the use of a `debugger` and ol' reliable `console.log()`.
