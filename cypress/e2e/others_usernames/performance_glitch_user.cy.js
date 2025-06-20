describe('Usuários problemático - teste para o usuario: performance_glitch_user ', () => {
  
    it('Deve evidenciar lentidão no carregamento da página para performance_glitch_user', () => {
        const inicio = Date.now() // marca o tempo inicial

        cy.visit('/')
        cy.get('[data-test="username"]').type('performance_glitch_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        // Espera o carregamento da home e marca o tempo final
        cy.url({ timeout: 10000 }).should('include', '/inventory.html').then(() => {
            const fim = Date.now()
            const duracao = fim - inicio

            // Exibe no terminal o tempo total em ms
            cy.log(`Tempo de carregamento: ${duracao}ms`)

            // Validação: alerta se passar de 2000ms
            expect(duracao, 'tempo de carregamento').to.be.lessThan(2000)
        })
    })
})