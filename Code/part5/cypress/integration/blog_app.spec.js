describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.addDummyUser({ username: 'dummyuser', name: 'dumdum', password: 'password' })
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function () {
    cy.contains('login').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.login({ username: 'dummyuser', password: 'password' })
      cy.contains('dumdum logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('wrongUser')
      cy.get('#password').type('wrongPass')
      cy.get('.error').contains('Wrong Credentials').and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('Blog app', function () {

    describe.only('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'dummyuser', password: 'password' })
        cy.contains('Create new')
        cy.createBlog({
          title: 'dummyBlog',
          author: 'dumdum',
          url: 'test.com',
          likes: 10
        })
      })

      it('A blog can be created', function () {
        cy.contains('dummyBlog')
      })

      it('Blog can be liked', function () {
        cy.contains('dummyBlog')
        cy.contains('show').click()
        cy.contains('like').click()
        cy.contains(1)
      })

      it('Can delete blog', function () {
        cy.contains('show').click()
        cy.contains('remove').click()
        cy.get('dummyBlog').should('not.exist')
      })

      it('All blogs sorted', function () {
        cy.createBlog({
          title: 'test 1',
          author: 'dumdum',
          url: 'test.com',
          likes: 50
        })
        cy.createBlog({
          title: 'test 2',
          author: 'dumdum',
          url: 'test.com',
          likes: 100
        })

        cy.get('#blogs').then( blogs => {
          cy.wrap(blogs[0]).contains('100')
          cy.wrap(blogs[1]).contains('50')
          cy.wrap(blogs[2]).contains('10')
        })
      })
    })
  })
})
