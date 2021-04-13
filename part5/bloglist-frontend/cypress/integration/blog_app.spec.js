const baseUrl = 'http://localhost:3000'
const apiUrl = 'http://localhost:3003/api'

describe('Blog app', function () {
  beforeEach(function() {
    cy.request('POST', `${apiUrl}/testing/reset`)
    cy.createUser({
      name: 'Domonic Toretto',
      username: 'dtoretto',
      password: 'family',
    })
    cy.visit(baseUrl)
  })

  describe('on first visit', () => {
    it('front page can be opened', function() {
      cy.contains('Blogs')
      cy.contains('Login')
    })
  
    it('login form can be opened', function() {
      cy.getByTestId('login-show').click()
    })
  
    it('user can login', function () {
      cy.contains('Login').click()
      cy.getByTestId('username').type('dtoretto')
      cy.getByTestId('password').type('family')
      cy.getByTestId('login-button').click()
      cy.contains('Domonic Toretto is logged in')
    })

    it('login fails with wrong password', function() {
      cy.contains('Login').click()
      cy.getByTestId('username').type('dtoretto')
      cy.getByTestId('password').type('fastfurious')
      cy.getByTestId('login-button').click()
      cy.contains('Incorrect username or password')
    })
  })

  describe('when logged in', () => {
    beforeEach(function() {
      cy.login({ username: 'dtoretto', password: 'family' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.getByTestId('title').type('A Test for the Ages')
      cy.getByTestId('author').type('Sir Test McTestson')
      cy.getByTestId('url').type('https://testing123.com')
      cy.contains('create').click()
      cy.contains('A Test for the Ages')
    })

    it.only('a blog can be liked', function() {
      cy.createBlog({ title: 'Neo Tests', author: 'Neo Matrix', url: 'matrix.com'})
      cy.contains('view').click()
      cy.contains('0')

      cy.contains('like').click()
      cy.contains('1')
    })
  })
})