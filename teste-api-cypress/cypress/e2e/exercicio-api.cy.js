/// <reference types="cypress" />

import login from "../fixtures/login.json";
import contrato from "../e2e/contracts/usuarios.contracts";
import { Faker, faker } from "@faker-js/faker";

describe("Testes da Funcionalidade Usuários", () => {
  let token;

  before(() => {
    // ocultanto os dados acesso atravez de fixtures
    cy.token(login.email, login.senha).then((tkn) => {
      token = tkn;
    });
  });

  it("Deve validar contrato de usuários", () => {
    cy.request("usuarios").then((response) => {
      return contrato.validateAsync(response.body);
    });
  });

  it("Deve listar usuários cadastrados", () => {
    cy.request({
      method: "GET",
      url: "usuarios",
    });
  });

  it("Deve cadastrar um usuário com sucesso", () => {
    let nomeFake = faker.name.firstName();
    let emailFake = faker.internet.email();
    let senhaFake = faker.internet.password();

    cy.request({
      method: "POST",
      url: "usuarios",
      body: {
        nome: nomeFake,
        email: emailFake,
        password: senhaFake,
        administrador: "false",
      },
      headers: { authorization: token },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal("Cadastro realizado com sucesso");
      expect(response.body).to.not.be.null;
    });
  });

  it("Deve validar um usuário com email inválido", () => {
    cy.request({
      method: "POST",
      url: "usuarios",
      body: {
        nome: "Zé",
        email: "emailinvalido.com",
        password: "senha",
        administrador: "false",
      },
      headers: { authorization: token },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.email).to.equal("email deve ser um email válido");
      expect(response.body).to.not.be.null;
    });
  });

  it("Deve editar um usuário previamente cadastrado", () => {
    let usuario = `José ${Math.floor(Math.random() * 1000000)}`;
    let emailFake = faker.internet.email();
    cy.cadastrarUsuario(
      token,
      usuario,
      emailFake,
      "senha@forte123",
      "false"
    ).then((response) => {
      let id = response.body._id;

      cy.request({
        method: "PUT",
        url: `usuarios/${id}`,
        headers: { authorization: token },
        body: {
          nome: usuario,
          email: emailFake,
          password: "teste",
          administrador: "false",
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal("Registro alterado com sucesso");
      });
    });
  });

  it("Deve deletar um usuário previamente cadastrado", () => {
    let usuario = `José ${Math.floor(Math.random() * 1000000)}`;
    let emailFake = faker.internet.email();
    cy.cadastrarUsuario(
      token,
      usuario,
      emailFake,
      "senha@forte123",
      "false"
    ).then((response) => {
      let id = response.body._id;

      cy.request({
        method: "DELETE",
        url: `usuarios/${id}`,
        headers: { authorization: token },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal("Registro excluído com sucesso");
      });
    });
  });
});


