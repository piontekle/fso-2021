// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
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