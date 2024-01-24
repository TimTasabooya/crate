const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Crate App Integration Test Report",
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },

    specPattern: "**/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
});
