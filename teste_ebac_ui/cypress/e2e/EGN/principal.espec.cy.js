/// <reference types="cypress" />

describe('Teste de funcionalidade', () => {

    beforeEach(() => {
        cy.visit('https://www.marinha.mil.br/egn/')
    });

    it('Deve acessar a página Histórico da EGN', () => {

        cy.get('.agree-button').click()
        cy.get('#block-block-1 > .content > .nav > :nth-child(1) > a').click()
        cy.get('.col-sm-9').should('contain.text', 'Escola para o Ensino Naval de Guerra')
        cy.get('.col-sm-9').should('contain', 'Histórico')

    });

    it('Deve acessar a página Missão da EGN', () => {

        cy.get('.agree-button').click()
        cy.get('#block-block-1 > .content > .nav > :nth-child(3) > a').click()
        cy.get('.col-sm-9').should('contain', 'Missão')
        

    });

    
});