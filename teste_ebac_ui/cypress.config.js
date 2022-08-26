const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '5atvj9',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    baseUrl: "http://lojaebac.ebaconline.art.br/" // aqui eu declarei o domínio principal dos testes

  },
});








