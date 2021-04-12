# Fullstack Open Part 5

**bloglist-frontend:** Exercises 5.1 - 

## Section Summary

### Login in frontend

Adding a form for submission of login credentials is added, along with conditional rendering based on whether or not a user is held in state. When submitting a new note, we set the token from the user to the headers so it works with our backend authentication. This is all while the user (and therefore its token) is set in state, which is inconvenient if the user refreshes. Solution? Set it in the local storage.

```javascript
// Set item in storage
window.localStorage.setItem('key', 'value')
// Get item from storage
window.localStorage.getItem('key')
// Remove item from storage
window.localStorage.removeItem('key')
```
We can save the whole user to storage by parsing it into JSON using `JSON.stringify(user)`. We can add a logout by using the `.removeItem()` function.

It's also good to note that the token isn't necessarily safe in the local storage. It does leave sensitive user data subject to Cross Site Scripting (XXS) attacks. If a token getting leaked would be a major security risk, then the best is to not store it locally, but the most practical solution is generally to minimize the risk of XXS attacks in the first place.

**Other Resources:**

- [Minimizing Risk of XXS Attacks Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html)

### prop.children and proptypes

Accessed at `props.children`, `children` are built into React and will render the defined React elements placed between the component in question's tags. This allowed us to build a togglable component to toggle visibility on and off, by placing an element within the `Togglable` tags. We also added a `ref` (with use of the `useRef()` and `useImperitiveHandle()` hooks) to be able to access the `toggleVisibility()` function in the higher/parent component.

We then covered `PropTypes` and added `prop-types` to our app in order to type restrict and name required props in our components. Then we set up `eslint` to make our styles consistent (`create-react-app` installs its own ESLint version). I updated the `ecmaVersion` to 2020 to allow for optional chaining.

### Test React apps

We went over adding testing libraries and the `render()` function that renders our components with the props we supply. It creates a `container` that we can test with functions like `expect()...toHaveTestContent()` or `component.getByText()`. `.querySelector()` is another option for finding elements rendered in the page. We can log what's rendered to the console using `prettyDom`.

In order to click buttons, like `toggleImportance`, we use the testing library's `fireEvent`. In order to mock an onClick handler, we use `jest.fn()`. `fireEvent` can also be used for inputs. Ex:

```javascript
const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')

  fireEvent.change(input, { 
    target: { value: 'testing of forms could be easier' } 
  })
  fireEvent.submit(form)
  ```

Running the below command will show us coverage:

```bash
CI=true npm test -- --coverage
```

The tests we covered were unit tests, and we won't go into the complicatedness of integration tests. Instead we'll focus on end to end tests next.

Jest also provides snapshot testing, where it will alert developers of a change in HTML. If the change is expected, great. If not, that's probably an indication of a bug.

### End to end testing

End to end (E2E) tests allow us to test our system as a whole. We'll be using [Cypress](https://www.cypress.io/), a testing library that runs completely in the browser. We'll install it to our frontend app (although it could be in either front or back end) and add the following script:

```JSON
"cypress:open": "cypress open"
```

We add the following to our backend because Cypress does not start the system when they are run:

```JSON
"start:test": "cross-env NODE_ENV=test node index.js"
```

We started on tests, using `cy.visit()` to get to our page, `cy.contains()` and `cy.get()` to find elements, and finally `cy.click()` and `cy.type()` to perform actions. We added the cypress eslint plugin and updated our `.eslintrc` accordingly to get rid of linting errors. Then we looked at adding `id`s (or `data-testid`s) to be able to differentiate between multiple inputs or elements with the same text and using `cy.get()`.

So what about the database? We want it to be in the same state every time, so we added a router for testing to empty the database each time. We can use `cy.request(TYPE, url, body)` to make the post request(s). If we need to test nontext, `contain()` won't work and we can use the `.should(action, value)` syntax. We can also add multiple conditions to a should, chaining `.and()`. Additionally, we need to use `find()` when chaining when there would be more than one of a similar element. `get()` would return the whole page. Cypress commands are promises, so if we need to debug at all, we'll have to use `.then()` to get the values they return.

To bypass having to go through the login every time, we setup the login request and localStorage setting in the beforeEach instead of the login process. This will speed up tests that required being logged in. We added a Cypress command so that the login will now be reusable across tests (addionitionally did a custom command for getting by testId to make the gets easier for my method). 

Finally, we added a script to run our tests from the command line if needed:

```JSON
"test:e2e": "cypress run"
```

**Other Resources:**

- [Cypress Simple But Import Guide](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Cypress-Can-Be-Simple-Sometimes)