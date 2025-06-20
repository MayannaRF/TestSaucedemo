describe('Fluxo completo de compra', () => {
  it('Deve realizar uma compra com sucesso do início ao fim', () => {
    
    // Login usando o username standard_user
    cy.visit('/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory.html')

    // Adiciona o primeiro produto ao carrinho
    cy.get('button.btn_inventory').eq(0).click()

    // Vai para o carrinho
    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart.html')

    // Valida que o item foi adicionado
    cy.get('.cart_item').should('have.length', 1)

    // Avança para o checkout
    cy.get('[data-test="checkout"]').click()
    cy.url().should('include', '/checkout-step-one.html')

    // Preenche os dados do formulário
    cy.get('[data-test="firstName"]').type('Name')
    cy.get('[data-test="lastName"]').type('Last')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    cy.url().should('include', '/checkout-step-two.html')

    // Finaliza a compra
    cy.get('[data-test="finish"]').click()
    cy.url().should('include', '/checkout-complete.html')

    // Verifica mensagem de sucesso
    cy.get('.complete-header').should('have.text', 'Thank you for your order!')
  })
})