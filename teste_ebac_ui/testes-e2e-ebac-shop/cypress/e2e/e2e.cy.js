/// <reference types="cypress" />

import ProdutoPage from "../support/page_objects/produtos.page";
import produtos from "../fixtures/produtos.json";
import e2eEnderecoPage from "../support/page_objects/e2eEndereco.page";

context("Exercicio - Testes End-to-end - Fluxo de pedido", () => {
  /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

  beforeEach(() => {
    cy.visit("minha-conta");
    cy.fixture("perfil").then((dados) => {
      cy.login(dados.usuario, dados.senha);
    });
  });

  it("Deve fazer um pedido na loja Ebac Shop de ponta a ponta", () => {


    ProdutoPage.adicionarProduto(
      produtos[0].nome,
      produtos[0].tamanho,
      produtos[0].cor
    );

    ProdutoPage.adicionarProduto(
      produtos[1].nome,
      produtos[1].tamanho,
      produtos[1].cor
    );

    ProdutoPage.adicionarProduto(
      produtos[2].nome,
      produtos[2].tamanho,
      produtos[2].cor
    );

    ProdutoPage.adicionarProduto(
      produtos[3].nome,
      produtos[3].tamanho,
      produtos[3].cor
    );

    cy.get(".dropdown-toggle > .mini-cart-items").should("contain.text", "4");

    cy.get(".woocommerce-message > .button").click();
    cy.get("#main").should("contain.text", produtos[0].nome);
    cy.get("#main").should("contain.text", produtos[1].nome);
    cy.get("#main").should("contain.text", produtos[2].nome);
    cy.get("#main").should("contain.text", produtos[3].nome);
    cy.get(".checkout-button").click();

    e2eEnderecoPage.editarEnderecoFaturamento(
      'Victor',
      'Leao',
      'Google',
      'Brasil',
      'Rua Dois',
      'Depois da Rua Um',
      'Rio de Janeiro',
      'Rio de Janeiro',
      '24412000',
      '21999998888',
      'aluno@ebac.com'
    )

    cy.get('#terms').click()
    cy.get('#place_order').click()

    cy.wait(200)
    // Tive que pesquisar esse comando pois estava dando erro. Não conseguia achar o próximo comando pois estava procurando antes de carregar a página de confirmação
    cy.get('.page-title').should('contain', 'Pedido recebido')
    


  });

});
