// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
//

// Add Screenshot to Mochawesome Report
//import addContext from "mochawesome/addContext";
// Import commands.js using ES2015 syntax:
import 'cypress-plugin-stripe-elements';
import './commands'
import '@shelex/cypress-allure-plugin';

import { createReadStream } from 'fs';

// Alternatively you can use CommonJS syntax:
// Import the package
// require('./commands')

Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

// Cypress.on("test:after:run", (test, runnable) => {
//     if (test.state === "failed") {
//       const screenshot = `assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;
//       addContext({ test }, screenshot);
//     }
//   });


//To attach Failure screenshots
  import addContext from 'mochawesome/addContext'
Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
        addContext({ test }, {title: 'Screenshot', value: `<cypress\reports\mochareports\assets>/${Cypress.spec.name}/${runnable.parent.title.replace(':', '')} -- ${test.title} (failed).png`})
      //  addContext({ test }, {title: 'Video', value: `<path/to/videos/folder>/${Cypress.spec.name}.mp4`})
    }
});
