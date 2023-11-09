
/// <reference types="Cypress" />
/// <reference types="Cypress-iframe" />
import 'cypress-file-upload'
import 'cypress-iframe'
import 'cypress-xpath'
require('cy-verify-downloads').addCustomCommand();


//common Function for Login during checkout 
Cypress.Commands.add('checkoutlogin', (email, password) => {

  cy.get('#email')
    .type(email)
    cy.get('.style_loginContainer__ritRL > #send-email-form > .Button_primary__0_HFw')
    .click({force:true})
  cy.get('#password')
    .type(password, { log: false })
    cy.get('#send-password-form > .Button_primary__0_HFw')
    .click({force:true})


})


//common Function for Firsthand Search

Cypress.Commands.add('SearchforProduct', (Product) => {

  cy.get("input[placeholder='Search']")
    .should("be.visible")
    .type(Product)
  cy.get(".Header_searchInput__nNoOs.SearchInput_searchBarContainer__J1CIe.SearchInput_skipTextIndent__Sj3zY svg[role='button']").click({force:true})

})

//Common Function for classic way of  White label  Login 
Cypress.Commands.add('whitelabellogin', (email, password) => {

  cy.visit(Cypress.env('whitelabel_url'));
  const GetAdvice = cy.xpath("//button[contains(.,'Get Career Advice')]")
  GetAdvice.click({force:true});  
  const typeEmail = cy.get("input#email")
  typeEmail.type(email);
  const typePassword = cy.get("input#password")
  typePassword.type(password);
  const Submit = cy.get("button[type='submit']")
  Submit.click({force:true});


})
//
// Custom command to handle error and retry
Cypress.Commands.add("handleErrorAndRetry", { prevSubject: true }, (subject, command, retries = 3) => {
  let retryCount = 0;

  function executeCommand() {
    return subject.then(command).catch((error) => {
      if (retryCount < retries) {
        retryCount++;
        return executeCommand();
      } else {
        throw error;
      }
    });
  }

  return executeCommand();
});


Cypress.Commands.add('carrerBasicPlatformLogin', (email, password) => {

  cy.visit(Cypress.env('careerbasic_url'));
  const GetAdvice = cy.get(".Button_primary__TsbfB")
  GetAdvice.click({force:true});
  const typeEmail = cy.get("input#email")
  typeEmail.type(email);
  const typePassword = cy.get("input#password")
  typePassword.type(password);
  const Submit = cy.get("button[type='submit']")
  Submit.click({force:true});


})

//common Function for  Classic way of login to Publicsite
Cypress.Commands.add('PublicSitelLogin', (email, password) => {

  cy.visit(Cypress.env('login_url'));

  const LoginLink = cy.xpath("//button[normalize-space()='Login']")
  LoginLink.should('be.visible').click({force:true});

  const TypeYourEmail = cy.get('#email')
  TypeYourEmail.clear().type(email)

  const SubmitButton = cy.xpath("//button[normalize-space()='Submit']")
  SubmitButton.click({force:true})

  const TypeYourPassword = cy.get('#password')
  TypeYourPassword.clear().type(password)

  const SubmitButtonn = cy.xpath("//button[normalize-space()='Submit']")
  SubmitButtonn.click({force:true})

  //  cy.url().should('include', '/welcome');
  //       cy.get(".col-xl-6 > h1").should("be.visible")
  //           .should('contain.text', 'Welcome');

})

Cypress.Commands.add('LinkedinLoginToPublicPlatform', (email, password) => {

  cy.visit(Cypress.env('login_url'));


  const LoginLink = cy.xpath("//span[@class='style_loginText__tIUur']")
  LoginLink.should('be.visible').click({force:true});


  const Linkedin = cy.get(".styles_social-media__kibUX")
  Linkedin.should('be.visible').click({force:true});

  const TypeYourEmail = cy.get('input#username')
  TypeYourEmail.clear().type(email)

  const TypeYourPassword = cy.get('input#password')
  TypeYourPassword.clear().type(password)

  const Signin = cy.get(".btn__primary--large.from__button--floating")
  Signin.click({force:true})

  const Allow = cy.get("button#oauth__auth-form__submit-btn")
  Allow.click({force:true});


})


Cypress.Commands.add('LinkedinLoginToWhitelabel', (email, password) => {

  cy.visit(Cypress.env('whitelabel_url'));
  cy.xpath("//button[text()='Get Help']").click({force:true}) //Get help button
  cy.get("button[class*='ButtonLinkedIn']").click({force:true})  //Continue with LinkedIn button
  cy.get("#username").type(email)
  cy.get("#password").type(password)
  cy.get("[type='submit']").click({force:true})

})

//NorthStar logout
Cypress.Commands.add('LogoutFromNorthStarPages', () => {

  const YourProfile = cy.get("div[class^='pendo_profileMenu']")

  YourProfile.click({ force: true });


  const Signout = cy.xpath("//a[normalize-space()='Sign out']")
  Signout.should('be.visible').click({force:true});


  cy.clearCookies();

})

//legacy logout
Cypress.Commands.add('LogoutFromLegacyPages', () => {

  const YourProfile = cy.get("div[class='user-information']")

  YourProfile.should('be.visible').click({force:true});

  const Signout = cy.get("a[ng-href='/logout']")
  Signout.should('be.visible').click({force:true});

  cy.clearCookies();

})




////Stripe
Cypress.Commands.add('getStripeElement', (fieldName) => {
  if (Cypress.config('chromeWebSecurity')) {
    throw new Error('To get stripe element `chromeWebSecurity` must be disabled');
  }

  const selector = `input[data-elements-stable-field-name="${fieldName}"]`;

  return cy
    .get('iframe')
    .its('0.contentDocument.body').should('not.be.empty')
    .then(cy.wrap)
    .find(selector);
});

Cypress.Commands.add('getByTestId', (testid) => {
  return cy.get(`${testid}`)
});


//common Function for  Classic way of login to Admin Publicsite 
Cypress.Commands.add('PublicSitelLoginAdmin', (email, password) => {

  cy.visit('uat.firsthand.co/admin');

  const TypeYourEmail = cy.get('#admin-login-email')
  TypeYourEmail.clear().type(email)

  const TypeYourPassword = cy.get('#admin-login-password')
  TypeYourPassword.clear().type(password)

  const SubmitButtonn = cy.get("button[type='submit']")
  SubmitButtonn.click({force:true})

})


//common Function for  Classic way of login to Admin Whitelabel site
Cypress.Commands.add('WhitelabelLoginAdmin', (email, password) => {

  cy.visit('demoamp.uat.firsthand.co/admin');

  const TypeYourEmail = cy.get('#admin-login-email')
  TypeYourEmail.clear().type(email)

  const TypeYourPassword = cy.get('#admin-login-password')
  TypeYourPassword.clear().type(password)

  const SubmitButtonn = cy.get("button[type='submit']")
  SubmitButtonn.click({force:true})

})



//Page Response validation method
Cypress.Commands.add('PageResponse', (list) => {

  cy.get(list).each(page => {
    const link = page.prop('href')
    cy.request({
      url: link,
      failOnStatusCode: true  // allow good and bad response to pass into then
    }).then(response => {
      Cypress.log({
        name: link,
        message: response.status
      })
    })
  })

  // click any elemement form a List 

  Cypress.Commands.add('clikcany', { prevSubject: 'element' }, (subject, size = 1) => {
    cy.wrap(subject).then(elementList => {
      elementList = (elementList.jquery) ? elementList.get() : elementList;
      elementList = Cypress._.sampleSize(elementList, size);
      elementList = (elementList.length > 1) ? elementList : elementList[0];
      cy.wrap(elementList);
    });
  });

})

// Cypress.Commands.add('getDownloadedFile', (filePath, fileName) => {
//   cy.log(`Checking for file: ${fileName}`);

//   // Wait for the download to complete (adjust the timeout as needed)
//   cy.wait(10000);

//   cy.log(`Verifying the file at path: ${filePath}`);
//   cy.task('fileContent', { filePath }).then((fileContent) => {
//     cy.log(`File content: ${fileContent}`);
//     expect(fileContent).to.include(fileName);
//   });
// });

// // Set up the fileContent task in your commands file (usually in commands.js)
// Cypress.Commands.add('task', { prevSubject: 'optional' }, (taskName, taskOptions) => {
//   return cy.task(taskName, taskOptions);
// });



