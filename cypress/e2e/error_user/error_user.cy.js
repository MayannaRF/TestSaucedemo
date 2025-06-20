describe('Usuários problemático - teste para o usuario:error_user', () => {
    
    Cypress.Commands.add('login', (username, password) => {
        cy.visit('/');
        cy.get('[data-test="username"]').type(username);
        cy.get('[data-test="password"]').type(password);
        cy.get('[data-test="login-button"]').click();
        cy.url().should('include', '/inventory.html');
    });

    beforeEach(() => {
        cy.login('error_user', 'secret_sauce');
        cy.url().should('include', '/inventory.html');
    });

    it('REGRESSÃO: Deve garantir que todos os botões "Add to cart" funcionem corretamente', () => {

        // Conta o número total de botões "Add to cart" disponíveis
        cy.get('button.btn_inventory').as('addButtons')

        cy.get('@addButtons').each(($btn) => {
            cy.wrap($btn).click()
        })

        // Verifica se o número de itens no carrinho é igual ao número de cliques
        cy.get('@addButtons').then(($btns) => {
            const totalProdutos = $btns.length
            cy.get('.shopping_cart_badge').should('have.text', String(totalProdutos))
        })
    })

    it('REGRESSÃO: Deve garantir que os botoes remover estão funcionando', () => {

        // Conta o número total de botões "Add to cart" disponíveis
        cy.get('button.btn_inventory').as('addButtons')
        var i = 0
        cy.get('@addButtons').each(($btn) => {
            cy.wrap($btn).click()
            cy.get('button.btn_inventory').eq(i).should('contain', 'Remove').click()
            i++
        })
    })

    it('Deve validar os botoes da tela Your Cart',()=>{

        // Adiciona o primeiro produto
        cy.get('button.btn_inventory').eq(0).click()
        cy.get('.shopping_cart_badge').should('have.text', '1')

        // Vai para o carrinho
        cy.get('.shopping_cart_link').click()
        cy.url().should('include', '/cart.html')

        // Valida botão "Continue Shopping"
        cy.get('[data-test="continue-shopping"]').click()
        cy.url().should('include', '/inventory.html')

        // Volta para o carrinho
        cy.get('.shopping_cart_link').click()
        cy.url().should('include', '/cart.html')

        // Valida botão "Checkout"
        cy.get('[data-test="checkout"]').click()
        cy.url().should('include', '/checkout-step-one.html')

        // Volta para o carrinho novamente
        cy.go('back')
        cy.url().should('include', '/cart.html')

        // Valida botão "Remove"
        cy.get('.cart_item').should('have.length', 1)
        cy.get('button.cart_button').contains('Remove').click()

        // Valida que item foi removido
        cy.get('.cart_item').should('have.length', 0)
        cy.get('.shopping_cart_badge').should('not.exist')
    })
   
    it('REGRESSÃO: Deve garantir que todos os campos do chekckout podem ser preechidos',()=>{

        // Adiciona o primeiro produto (já que o terceiro tá com bug)
        cy.get('button.btn_inventory').eq(0).click()

        // Vai para o carrinho
        cy.get('.shopping_cart_link').click()
        cy.url().should('include', '/cart.html')

        // Verifica se o item está no carrinho
        cy.get('.cart_item').should('have.length', 1)
        cy.get('.inventory_item_name').should('exist')

        // Avança para o checkout
        cy.get('[data-test="checkout"]').click()
        cy.url().should('include', '/checkout-step-one.html')

        // Preenche o formulário
        cy.get('[data-test="firstName"]').type('Name')
        cy.get('[data-test="lastName"]').type('Last')
        cy.get('[data-test="postalCode"]').type('12345')
        cy.get('[data-test="continue"]').click()
        cy.url().should('include', '/checkout-step-two.html')
    })

    it('REGRESSÃO: Deve garantir que no Checkout: Overview a compra pode ser finalizada',() => {

        // Adiciona o primeiro produto
        cy.get('button.btn_inventory').eq(0).click()

        // Vai para o carrinho
        cy.get('.shopping_cart_link').click()
        cy.url().should('include', '/cart.html')

        // Verifica se o item está no carrinho
        cy.get('.cart_item').should('have.length', 1)
        cy.get('.inventory_item_name').should('exist')

        // Avança para o checkout
        cy.get('[data-test="checkout"]').click()
        cy.url().should('include', '/checkout-step-one.html')

        // Preenche o formulário
        //Aqui o campo do lastName não pode ser peenchido no momento devido a um erro 
        cy.get('[data-test="firstName"]').type('Name')
        //cy.get('[data-test="lastName"]').type('Last')
        cy.get('[data-test="postalCode"]').type('12345')
        cy.get('[data-test="continue"]').click()
        cy.url().should('include', '/checkout-step-two.html')

        // Verifica se item está presente no resumo
        cy.get('.cart_item').should('have.length', 1)

        // Finaliza a compra
        cy.get('[data-test="finish"]').click()
        cy.url().should('include', '/checkout-complete.html')

        // Verifica mensagem de sucesso
        cy.get('.complete-header').should('have.text', 'Thank you for your order!')
    })
})
