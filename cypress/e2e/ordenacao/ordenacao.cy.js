describe('Tela de Login', () => {
  
    //Criação do comando login     
    Cypress.Commands.add('login', (username, password) => {
        cy.visit('/');
        cy.get('[data-test="username"]').type(username);
        cy.get('[data-test="password"]').type(password);
        cy.get('[data-test="login-button"]').click();
    });

    beforeEach(() => {
        
        cy.login('standard_user', 'secret_sauce');
        
        cy.url().should('include', '/inventory.html');
    });


    it('Deve ordenar os produtos por Nome (A a Z) corretamente', () => {
        
        cy.get('.product_sort_container').select('az');
        
        // Pega todos os nomes dos produtos visíveis na página
        cy.get('.inventory_item_name').then(($elements) => {
            const productNames = Cypress._.map($elements, 'innerText');
            // Cria uma cópia da lista e a ordena manualmente para comparação
            const sortedNames = [...productNames].sort();
            // Compara a lista obtida com a lista ordenada manualmente
            expect(productNames).to.deep.equal(sortedNames);
        });
    });

    it('Deve ordenar os produtos por Nome (Z a A) corretamente', () => {
        
        cy.get('.product_sort_container').select('za'); 
        
        cy.get('.inventory_item_name').then(($elements) => {
            const productNames = Cypress._.map($elements, 'innerText');
            const sortedNames = [...productNames].sort().reverse();
            expect(productNames).to.deep.equal(sortedNames);
        });
    });

    it('Deve ordenar os produtos por Preço do meno pro maior (low to high) corretamente', () => {
        
        cy.get('.product_sort_container').select('lohi'); 

        cy.get('.inventory_item_price').then(($elements) => {
            const prices = Cypress._.map($elements, (el) => {
                return parseFloat(el.innerText.replace('$', ''));
            });
            const sortedPrices = [...prices].sort((a, b) => a - b);
            expect(prices).to.deep.equal(sortedPrices);
        });
    });


    it('Deve ordenar os produtos por Preço do maior para o menor  (high to low) corretamente', () => {
        
        cy.get('.product_sort_container').select('hilo'); 

        cy.get('.inventory_item_price').then(($elements) => {
            const prices = Cypress._.map($elements, (el) => {
                return parseFloat(el.innerText.replace('$', ''));
            });
            const sortedPrices = [...prices].sort((a, b) => b - a);
            expect(prices).to.deep.equal(sortedPrices);
        });
    });
})
