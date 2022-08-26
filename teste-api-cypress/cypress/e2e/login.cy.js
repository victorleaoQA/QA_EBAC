describe('Teste de API - ServeRest', () => {

  it('Deve fazer login com sucesso', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/login',
      body: {
        "email": "fulano@qa.com",
        "password": "teste"
      }
    }).then((response) => {
      expect(response.status).to.equals(200)
      expect(response.body.message).to.equals('Login realizado com sucesso')
      cy.log(response.body.authorization);
    })
  })

})  