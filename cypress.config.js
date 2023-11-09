const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  video: false,
  screenshotsFolder: 'cypress/reports/mochareports/assets',
  downloadFolder: 'cypress/downloads',
  pageLoadTimeout: 80000,
  defaultCommandTimeout: 15000,
  projectId: '32dos3',
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mochawesome',
    mochawesomeReporterOptions: {
      reportDir: 'cypress/reports/mocha',
      quite: true,
      overwrite: false,
      html: false,
      json: true,
      trashAssetsBeforeRuns: true,
    },
  },
  env: {
    login_url: 'uat.firsthand.co',
    whitelabel_url: 'demoamp.uat.firsthand.co',
    careerbasic_url: 'sjfc.uat.firsthand.co/',
  },
  e2e: {
    
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern:
      'cypress/integration/**/*.{js,jsx,ts,tsx}',
  },
  //
})
