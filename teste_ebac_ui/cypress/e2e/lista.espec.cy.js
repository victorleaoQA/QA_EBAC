/// <reference types="cypress" />


describe('Funcionalidade página de produtos', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/produtos/')
    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('[class="product-block grid"]')
        // .first() //seleciona o primeiro elemento de uma lista
        // .last() //seleciona o ultimo elemento de uma lista
        .eq(3).click() // seleciona um determinado elemento de uma lista pela ordem numerica
        // .contains('Apollo Running Short').click()
        // cy.get('.button-variable-item-33').click()
    });

    it('Deve adicionar um produto no carrinho', () => {
        var quantidade = 5

        cy.get('[class="product-block grid"]').contains('Argus All-Weather Tank').click()
        cy.get('.button-variable-item-M').click()
        cy.get(':nth-child(2) > .value > .variable-items-wrapper > .variable-item').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

        cy.get('.woocommerce-message').contains(quantidade + ' × “Argus All-Weather Tank” foram adicionados no seu carrinho.')
        cy.get('.dropdown-toggle > .mini-cart-items').contains(quantidade)

    });

    it('Deve adicionar um produto ao carrinho - Usando Comandos Customizados', () => {
        cy.addProdutos('Arcadio Gym Short', 32, 'Black', 3)
    });

    it('Deve adicionar um produto ao carrinho - Usando Comandos Customizados', () => {
        cy.addProdutos('Argus All-Weather Tank', 'L', 'Gray', 3)
    });
    
});