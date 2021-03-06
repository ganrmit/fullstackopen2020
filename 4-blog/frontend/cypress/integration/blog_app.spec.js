// skipped exercise 5.22, man I am sick of testing

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mon')
      cy.get('#password').type('existent')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#blogTitle').type('my blog title')
      cy.get('#blogAuthor').type('my blog author')
      cy.get('#blogUrl').type('www.myblogurl.com')
      cy.get('#blog-create-button').click()
      cy.contains('a new blog my blog title')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#blogTitle').type('my blog title')
        cy.get('#blogAuthor').type('my blog author')
        cy.get('#blogUrl').type('www.myblogurl.com')
        cy.get('#blog-create-button').click()
      })

      it('can be liked', function() {
        cy.get('button.show').click()
        cy.contains('likes 0')
        cy.get('button.like').click()
        cy.contains('likes 1')
      })

      it('can be deleted by the user who made it', function() {
        cy.get('button.show').click()
        cy.get('button.remove').click()
        cy.contains('a new blog my blog title').should('not.exist')
      })
    })
  })
})