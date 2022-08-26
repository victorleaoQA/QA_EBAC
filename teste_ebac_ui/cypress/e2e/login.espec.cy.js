

describe('Login na plataforma', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    });

    it('Deve fazer login com email e senha válidos', () => {
        cy.get('#username').type('aluno35@teste.com')
        cy.get('#password').type('teste@teste123')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain.text', 'Olá, aluno35 (não é aluno35? Sair)')
    });

    it('Deve exibir um alerta ao tentar fazer login com email válido e senha inválida', () => {
        cy.get('#username').type('aluno35@teste.com')
        cy.get('#password').type('teste@teste12')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('contain.text', 'Erro: A senha fornecida para o e-mail aluno35@teste.com está incorreta. Perdeu a senha?')
    });

    it('Deve exibir um alerta ao tentar fazer login com email inválido e senha válida', () => {
        cy.get('#username').type('aluno35@teste.co')
        cy.get('#password').type('teste@teste123')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('contain.text', 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')
    });



    
    
});