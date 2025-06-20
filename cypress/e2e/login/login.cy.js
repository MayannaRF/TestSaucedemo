describe('Tela de Login', () => {
  
  //Criação do comando login 
  Cypress.Commands.add('login', (username, password) => {
    cy.visit('/');
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
  });

  //Usuário cadastrado 
  it('Deve fazer login e verificar o título da home', () => {
    
    cy.login('standard_user', 'secret_sauce')
    cy.url().should('include', '/inventory.html')

    cy.get('.title').should('have.text', 'Products')
  })
  
  //Usuário não cadastrado
  it('Deve exibir erro para usuário não cadastrado', () => {
  
    cy.login('user_invalid', 'secret_sauce')
  
    cy.get('[data-test="error"]').should('contain', 'Username and password do not match')
  })

  //Usuário bloqueado
  it('Deve exibir mensagem de erro para usuário bloqueado', () => {
    
    cy.login('locked_out_user', 'secret_sauce')

    cy.get('[data-test="error"]').should('contain', 'Sorry, this user has been locked out.')
  })

  // Senha inválida
  it('Deve exibir erro para senha inválida', () => {
    
    cy.login('standard_user', 'password_invalid')

    cy.get('[data-test="error"]').should('contain', 'Username and password do not match')
  })

  //Campos obrigatórios
  it('Deve exibir erro para usuário e senha vazios', () => {
    cy.visit('/')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]').should('be.visible')
  })

});
