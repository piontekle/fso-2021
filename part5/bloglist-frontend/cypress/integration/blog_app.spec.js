const baseUrl = 'http://localhost:3000'
const apiUrl = 'http://localhost:3003/api'

describe('Blog app', function () {
  beforeEach(function() {
    cy.request('POST', `${apiUrl}/testing/reset`)
    const user = {
      name: 'Domonic Toretto',
      username: 'dtoretto',
      password: 'family',
    }
    cy.request('POST', `${apiUrl}/users`, user)
    cy.visit(baseUrl)
  })

  describe('on first visit', () => {
    it('front page can be opened', function() {
      cy.contains('Blogs')
      cy.contains('Login')
    })
  
    it('login form can be opened', function() {
      cy.get(`[data-testid="login-show"]`).click()
    })
  
    it('user can login', function () {
      cy.contains('Login').click()
      cy.get(`[data-testid="username"]`).type('dtoretto')
      cy.get(`[data-testid="password"]`).type('family')
      cy.get(`[data-testid="login-button"]`).click()
      cy.contains('Domonic Toretto is logged in')
    })

    it('login fails with wrong password', function() {
      cy.contains('Login').click()
      cy.get(`[data-testid="username"]`).type('dtoretto')
      cy.get(`[data-testid="password"]`).type('fastfurious')
      cy.get(`[data-testid="login-button"]`).click()
      cy.contains('Incorrect username or password')
    })
  })

  describe('when logged in', () => {
    beforeEach(function() {
      cy.request('POST', `${apiUrl}/login`, {
        username: 'dtoretto', password: 'family'
      }).then(res => {
        localStorage.setItem('loggedInUser', JSON.stringify(res.body))
        cy.visit(baseUrl)
      })
    })

    it.only('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get(`[data-testid="title"]`).type('A Test for the Ages')
      cy.get(`[data-testid="author"]`).type('Sir Test McTestson')
      cy.get(`[data-testid="url"]`).type('https://testing123.com')
      cy.contains('create').click()
      cy.contains('A Test for the Ages')
    })
  })
})