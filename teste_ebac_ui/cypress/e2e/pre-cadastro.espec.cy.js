/// <reference types="cypress" />

import { faker } from "@faker-js/faker";


describe('Funcionalidade pré-cadastro', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    });

    it('Deve completar o pré-cadastro com sucesso', () => {
        //Pode-se declarar palavras variáveis
        let nomeFaker = faker.name.firstName()
        let sobrenomeFaker = faker.name.lastName()
        let senhaFaker = faker.random.alphaNumeric(15)
        let emailFaker = faker.internet.email() 

        cy.get('#reg_email').type(emailFaker)
        cy.get('#reg_password').type(senhaFaker)
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(nomeFaker)
        cy.get('#account_last_name').type(sobrenomeFaker)
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('contain.text', 'Detalhes da conta modificados com sucesso.')
        
    });

    it('Deve completar o cadastro com sucesso usando Comandos Customizados', () => {
        let emailFaker = faker.internet.email() 
        cy.preCadastro(emailFaker, 'senha@forte123', 'Joao', 'Gomes')
        cy.get('.woocommerce-message').should('contain.text', 'Detalhes da conta modificados com sucesso.')
    });
    
});