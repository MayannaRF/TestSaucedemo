 describe('Usuários problemático - teste para o usuario: problem_user', () => {
    
    //esse é o com erro de IMAGEM
    it('Deve logar com problem_user e verificar se produtos são exibidos corretamente', () => {
        cy.visit('/')
        cy.get('[data-test="username"]').type('problem_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.url().should('include', '/inventory.html')
        
        // Verificação visual simples (os itens têm nomes e preços)
        cy.get('.inventory_item').each(($item) => {
        cy.wrap($item).find('.inventory_item_name').should('exist')
        cy.wrap($item).find('.inventory_item_price').should('exist')
        })
        
        // Verificação visual simples (os itens com imagens duplicadas)
        
        const imagens = []

        cy.get('.inventory_item_img img').each(($img) => {
            imagens.push($img.prop('src'))
        }).then(() => {
            const total = imagens.length
            const unicos = new Set(imagens)
            expect(unicos.size).to.equal(total) // valida que todas são diferentes
        })
    })
})