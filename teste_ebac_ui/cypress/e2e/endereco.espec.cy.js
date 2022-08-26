/// <reference types="cypress"/>
import EnderecoPage from '../support/page-objects/endereco.page';
import enderecos from '../fixtures/enderecos.json'

describe('Fuincionalidade Endereços - Faturamento e Entrega', () => {
	beforeEach(() => {
		cy.visit('minha-conta');
		cy.fixture('login').then((dados) => {
			cy.login(dados.email, dados.senha);
		});
		// cy.login('aluno35@teste.com', 'teste@teste123') foi passado na forma supracitada
	});

	it('Deve fazer cadastro de faturamento com sucesso', () => {
		EnderecoPage.editarEnderecoFaturamento(
			'Victor',
			'Leao',
			'Amazon',
			'Brasil',
			'Rua Umm',
			'Bem depois da Rua Dois',
			'Rio de Janeiro',
			'Rio de Janeiro',
			'24412000',
			'8199998888',
			'teste@teste.com'
		);
		cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.');
	});

    it('Deve fazer cadastro de faturamento com sucesso - Usando arquivo de Massa de Dados', () => {
		EnderecoPage.editarEnderecoFaturamento(
			enderecos[2].nome,
            enderecos[2].sobrenome,
            enderecos[2].empresa,
            enderecos[2].pais,
            enderecos[2].endereco,
            enderecos[2].complemento,
            enderecos[2].cidade,
            enderecos[2].estado,
            enderecos[2].cep,
            enderecos[2].telefone,
            enderecos[2].email
		);
		cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.');
	});
});
