class ProdutoPage {


    adicionarProduto(nome, tamanho, cor){
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('.product-block > .caption > .meta > .infor > .name').contains(nome).click()
        cy.get('.button-variable-item-'+tamanho).click()
        cy.get('.button-variable-item-'+cor).click()
        cy.get('.input-text').clear().type('1')
        cy.get('.single_add_to_cart_button').click()
    }

}

export default new ProdutoPage()