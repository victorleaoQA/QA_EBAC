/// <reference types="cypress"/>

const { faker } = require("@faker-js/faker");
import contrato from '../e2e/contracts/produtos.contracts'


describe("Teste de funcionalidade produtos", () => {
  let token;

  before(() => {
    cy.token("fulano@qa.com", "teste").then((tkn) => {
      token = tkn;
    });
  });

  it('Deve validar contrato de produtos', () => {
    cy.request('produtos').then(response => {
      return contrato.validateAsync(response.body)
    })
  });

  it("Listar produtos", () => {
    cy.request({
      method: "GET",
      url: "produtos",
    });
  });

  //Usando Commands
  it("Deve validar uma mensagem de erro ao tentar cadastrar um memso produto", () => {
    cy.cadastrarProduto(token, "Videogame", 100, "Descricao", 200).then(
      (response) => {
        expect(response.status).to.equals(400);
        expect(response.body.message).to.equals(
          "Já existe produto com esse nome"
        );
      }
    );
  });

  // //Usando Commands e Faker
  // it.only("Cadastrar um produto usando Commands e Faker", () => {
  //   cy.cadastrarProdutoFake()
  //   .then((response) => {
  //     expect(response.status).to.equals(201);
  //     expect(response.body.message).to.equals("Cadastro realizado com sucesso");
  //   });
  // });

  it("Cadastrar um produto", () => {
    let produtoFake = faker.random.word();
    let precoFake = faker.commerce.price(100, 1000, 0);
    let descricaoFake = faker.commerce.productDescription();
    let quantidadeFake = faker.random.numeric(4);

    cy.request({
      method: "POST",
      url: "produtos",
      body: {
        nome: produtoFake,
        preco: precoFake,
        descricao: descricaoFake,
        quantidade: quantidadeFake,
      },
      headers: {
        authorization: token,
      },
    }).then((response) => {
      expect(response.status).to.equals(201);
      expect(response.body.message).to.equals("Cadastro realizado com sucesso");
    });
  });

  it("Deve fazer a edição de um determinado produto cadastrado", () => {
    cy.request("produtos").then((response) => {
      let produto = `iPhone ${Math.floor(Math.random() * 10000)}`
      let id = response.body.produtos[5]._id;

      cy.request({
        method: "PUT",
        url: `produtos/${id}`,
        headers: {
          authorization: token,
        },
        body: {
          nome: produto,
          preco: 470,
          descricao: "Nova descrição do produto",
          quantidade: 381,
        },
      }).then((response) => {
        expect(response.status).to.equals(200);
        expect(response.body.message).to.have.string(
          "Registro alterado com sucesso"
        );
      });
    });
  });

  it("Deve fazer edição de um produto previamente cadastrado", () => {
    cy.cadastrarProduto(token, "Novo nome 100", 500, "Nova descrição", 400).then(
      (response) => {
        let id = response.body._id;
        let produto = Math.floor(Math.random()*1000000)

        cy.request({
          method: "PUT",
          url: `produtos/${id}`,
          headers: {
            authorization: token,
          },
          body: {
            nome: `Novo Produto ${produto}`,
            preco: 470,
            descricao: "Nova descrição do produto Brasil",
            quantidade: 381,
          },
        }).then((response) => {
          expect(response.status).to.equals(200);
          expect(response.body.message).to.have.string(
            "Registro alterado com sucesso"
          );
        });
      }
    );
  });

  it('Deve deletar um produto cadastrado', () => {
    let produdo = `Produto EBAC ${Math.floor(Math.random() * 10000)}`
    cy.cadastrarProduto(token, produdo, 100, "Descrição do produto novo", 1000)
    .then(response => {
      let id = response.body._id

      cy.request({
        method: 'DELETE',
        url: `produtos/${id}`,
        headers: {authorization: token}
      }).then(response => {
        expect(response.body.message).to.equal('Registro excluído com sucesso');
        expect(response.status).to.equal(200);
      })

    })
    
    
  });

});
