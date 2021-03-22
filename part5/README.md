# Fullstack Open Part 5

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

### prop.children and proptypes

### Test React apps


### End to end testing
