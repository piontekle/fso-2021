const baseUrl = 'http://localhost:3000'
const apiUrl = 'http://localhost:3003/api'

Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-testid="${testId}"]`)
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${apiUrl}/login`, {
    username, password
  }).then(res => {
    localStorage.setItem('loggedInUser', JSON.stringify(res.body))
    cy.visit(baseUrl)
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: `${apiUrl}/lists`,
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
    }
  })

  cy.visit(baseUrl)
})

Cypress.Commands.add('createUser', ({ name, username, password }) => {
  const user = { name, username, password }
  cy.request('POST', `${apiUrl}/users`, user)
})

Cypress.Commands.add('testOrder', (testId, order) => {
  cy.getByTestId(testId).each((el, i) => {
    cy.wrap(el).should('contain.text', order[i])
  })
})