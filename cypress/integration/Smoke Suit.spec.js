/// <reference types="Cypress" />
/// <reference types="Cypress-iframe" />
import 'cypress-file-upload'
import 'cypress-iframe'
import 'cypress-xpath'
import { faker } from '@faker-js/faker';


describe("Firsthand Smoke Suit", function () {

  beforeEach(function () {
    cy.viewport(1920, 1080);

  })

  // login function
  function login(username, password) {

    cy.visit('https://uat.firsthand.co/');  // Visit the login page    
    cy.xpath("//button[normalize-space()='Login']").click();  // Click the login button    
    cy.contains("Welcome Back!").should('be.visible');  // Verify the "Welcome Back!" message is visible  
    cy.get('#email').type(username);    // Fill in the email field   
    cy.get("button[type='submit']").click();   // Click the Submit button    
    cy.get('#password').type(password);  // Fill in the password field   
    cy.get("button[type='submit']").click();  // Click the Submit button     
    cy.url().should('include', '/welcome');// Verify the URL includes '/welcome' to confirm successful login
  }


  function LoginTOWhitelabel(username, password) {

    cy.visit('https://demoamp.uat.vault.com/');
    cy.contains('Get Career Advice').click();
    cy.get('#email').type(username);
    cy.get('input#password').type(password);
    cy.get("[type='submit']").click();


  }

  function Upload100Mbfile() {
    const yourFixturePath = 'cypress_tutorial.pdf'
    const InputFileUpload = cy.get("input[type='file']")
    InputFileUpload.attachFile(yourFixturePath);
    cy.wait(4000);
    const upload = cy.xpath("//button[normalize-space()='Upload']")
    upload.click({ force: true });
    cy.wait(6000);

    return this
  }


  function getOnlyCreditCardDetailsAndMakePayment() {

    cy.get(".__PrivateStripeElement > iframe[role='presentation']").then(($element) => {
      const $body = $element.contents().find("body");

      let stripe = cy.wrap($body);
      stripe
        .find("input[name='cardnumber']")
        .click({ force: true })
        .type('4242424242424242');

      stripe = cy.wrap($body);
      stripe
        .find("input[name='exp-date']")
        .click({ force: true })
        .type('0827');

      stripe = cy.wrap($body);
      stripe
        .find("input[name='cvc']")
        .click({ force: true })
        .type('858');

      stripe = cy.wrap($body);
      stripe
        .find("input[name='postal']")
        .click({ force: true })
        .type('35242');


    })


  }

  function validatePaymentSuccess() {
    cy.get('.Button_primary__0_HFw').click({ force: true })
    cy.wait(12000)
    cy.contains('Thanks for your order!').should('be.visible')
  }


  function getOrderSummaryandCheckOut() {

    const OrderSummary = cy.xpath("//h3[normalize-space()='Order summary']")

    OrderSummary.invoke('text').then((orderdetails) => {

      expect(orderdetails).to.contain('Order summary')
      cy.log(orderdetails);
    })
    cy.xpath("//button[normalize-space()='Checkout']").click({ force: true });
    cy.wait(5000)
    return this
  }


//Test cases 


  it('Should log in with valid credentials to Public platform', function () {
    login('skalluru@infobase.com', 'Devorah1!');
  });

  it('Should log in with valid credentials to White-label as a Advisee', function () {
    LoginTOWhitelabel('self_reg_advisee@gmail.com', 'Devorah1!');
    cy.url().should('include', '/welcome');
  });

  it('Should log in with valid credentials to White-label as Admin', function () {
    LoginTOWhitelabel('skalluru@infobase.com', 'Devorah1!');
    cy.url().should('include', '/partner/dashboard');
  });

  it('Should Download manage users CSV', function () {
    LoginTOWhitelabel('skalluru@infobase.com', 'Devorah1!');
    cy.url().should('include', '/partner/dashboard');
    cy.xpath("//span[normalize-space()='Users']").click({ force: true });
    cy.xpath("//a[normalize-space()='manage users']").click({ force: true });
    cy.url().should('include', '/partner/users');
    cy.xpath("//button[normalize-space()='DOWNLOAD AS CSV']").click({ force: true });
    cy.wait(15000);
    cy.verifyDownload('download', { contains: true });

  });


  it('Should Send a Message to Advisee with an Attachment ', function () {
    const Messagetosend = faker.lorem.paragraph();
    LoginTOWhitelabel('self_reg_advisee@gmail.com', 'Devorah1!');
    cy.url().should('include', '/welcome');
    cy.xpath("//b[normalize-space()='Messages']").click({ force: true });
    cy.url().should('include', '/messages');
    cy.wait(5000);
    cy.get("div[class^='MessagesPage_membersBox']").find("div[class^='UserAvatar_avatar']").eq(0).click();
    cy.xpath("//label[normalize-space()='Upload a file']").click({ force: true });
    Upload100Mbfile()
    cy.contains("File uploaded by")
    cy.xpath("//input[@placeholder='Type your message']").type(Messagetosend).type('{enter}');
    cy.contains(Messagetosend)
  });

  it('Should verify hoizantal Tab bar on rankings page ', function () {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.contains("Access valuable content to drive your career forward").should('be.visible')
    cy.contains("You want a career that’s rewarding, both personally and financially. Whether you’re just starting out or looking to make a change, we help break down the barriers to taking that next career step—with insider insights, sample cover letters and resumes, and answers to those tough interview questions that will prepare you for interactions with potential employers.").should('be.visible')
    cy.get("div[class^='TabBar_scrollable']").eq(1).should('be.visible');
    cy.get("div[class^='TabBar_scrollable']").eq(1).find('.nav-link').should('have.length', 6).as('tabs');
    cy.get('@tabs').eq(0).should('have.class', 'active');
    cy.get('@tabs').eq(1).should('not.have.class', 'active');
    cy.get('@tabs').eq(2).should('not.have.class', 'active');
    cy.get('@tabs').eq(3).should('not.have.class', 'active');
    cy.get('@tabs').eq(4).should('not.have.class', 'active');
    cy.get('@tabs').eq(5).should('not.have.class', 'active');
  });


  
  it('should navigate to all top navigation items', () => {
    cy.visit("https://uat.vault.com/");
   // Rankings
   cy.get('#tab-0-toggle').click({force: true});
   cy.url().should('include', '/careers/rankings');  

   // Library
   cy.get('#tab-1-toggle').click({force: true});
   cy.url().should('include', '/library/blogs-employment-news');   

   // Guides
   cy.get('#tab-2-toggle').click({force: true});
   cy.url().should('include', '/vault-guides');   

   // Careers
   cy.get('#tab-3-toggle').click({force: true});
   cy.url().should('include', '/careers/professions');   

   // Internships
   cy.get('#tab-4-toggle').click({force: true});
   cy.url().should('include', '/most-prestigious-internship-rankings');   

   // Vault Law
   cy.get('#tab-5-toggle').click({force: true});
   cy.url().should('include', '/vault-law');   

   // Advice
   cy.get('#tab-6-toggle').click({force: true});
   cy.url().should('include', '/library/collections/resumes-cover-letters');
   
  });


  it('should interact with the jumbotron elements on Platform Landing page', () => {
    cy.visit("https://uat.vault.com/");
    // Assert the existence of the jumbotron and its elements
    cy.get('#jumbotron').should('exist');
    cy.get('#jumbotron-title').should('exist');
    cy.get('#jumbotron-sub-title').should('exist');
    cy.get('#jumbotron-button-0').should('exist');
    cy.get('#jumbotron-button-1').should('exist');
    cy.get('#jumbotron-button-2').should('exist');

    // Assert the content of the jumbotron elements
    cy.get('#jumbotron-title').should('have.text', 'Build the Best Career for You');
    cy.get('#jumbotron-sub-title').should('have.text', 'Find and grow a career that aligns with your skillset, interests, values, and goals.');

    // Click on the buttons in the jumbotron and assert the resulting URL
    cy.get('#jumbotron-button-0').click();
    cy.url().should('include', '/intern-resource-center');    
    cy.go('back'); 

    cy.get('#jumbotron-button-1').click();
    cy.url().should('include', '/careers/rankings');
    
    cy.go('back'); 

    cy.get('#jumbotron-button-2').click();
    cy.url().should('include', '/vault-guides');
   
  });

  it('should interact with the top-ranked employers section', () => {
    cy.visit("https://uat.vault.com/");
    cy.get('#top-ranked-employers').should('exist');
    cy.get('#top-ranked-employers-title').should('exist');
    cy.get('#top-ranked-employers-item-0').should('exist');
    cy.get('#top-ranked-employers-item-1').should('exist');
    cy.get('#top-ranked-employers-item-2').should('exist');
    cy.get('#top-ranked-employers-item-3').should('exist');
    
    cy.get('#top-ranked-employers-title').should('have.text', 'Research Our Top-Ranked Employers');   
    
    cy.get('#top-ranked-employers-item-0 a').invoke('removeAttr', 'target').click();
    cy.url().should('include', '/company-profiles/law/latham-watkins-llp');  
    
    cy.go('back'); 
    
    cy.get('#top-ranked-employers-item-1 a').invoke('removeAttr', 'target').click();
    cy.url().should('include', '/company-profiles/law/allen-overy-llp-us');
    
    
    cy.go('back'); 
    
    cy.get('#top-ranked-employers-item-2 a').invoke('removeAttr', 'target').click();
    cy.url().should('include', '/company-profiles/law/mcdermott-will-emery');
    
    
    cy.go('back'); 
    
    cy.get('#top-ranked-employers-item-3 a').invoke('removeAttr', 'target').click();
    cy.url().should('include', '/company-profiles/law/weil-gotshal-manges-llp');
    
    
  });


  it('should interact with the newsletter form and Submit ', () => {
    cy.visit("https://uat.vault.com/");
    cy.get('#newsletter-form').should('exist');
    cy.get('#newsletter-form-marketing-insights').should('exist');
    cy.get('#newsletter-form > h2').should('have.text', 'Fresh insights, rankings, and jobs straight to your inbox! ');

   
    const emailid = faker.internet.email().toLocaleLowerCase()
        

        cy.get('div:nth-of-type(1) > .p-0  .d-none').as('generalCheckbox');
        // Check the checkbox
        cy.get('@generalCheckbox').scrollIntoView().check({ force: true }).should('be.checked');

        cy.get('div:nth-of-type(2) > .p-0  .d-none').as('lawCheckbox');
        // Check the checkbox
        cy.get('@lawCheckbox').scrollIntoView().check({ force: true }).should('be.checked');

        cy.get("input#email-id").scrollIntoView().should('be.visible').type(emailid);

        cy.get("button#newsletter-form-button-submit").scrollIntoView().should('be.visible').click();

        cy.xpath("//div[@class='go946087465'][contains(.,'Subscribed')]").should('be.visible').and('contain.text', 'Subscribed')
  });


  it('should validate the content and links of the Best Internships section', () => {
    cy.visit("https://uat.vault.com/");
    cy.get('#best-internships').should('exist');
    cy.get('#best-internships-title').should('have.text', 'Explore Top Internship Programs');

    // Assert the existence of each internship item
    cy.get('#best-internships-item-0').should('exist');
    cy.get('#best-internships-item-1').should('exist');
    cy.get('#best-internships-item-2').should('exist');
    cy.get('#best-internships-item-3').should('exist');

    // Assert the content of each internship item
    cy.get('#best-internships-item-0 h3').should('have.text', 'Infosys');
    cy.get('#best-internships-item-1 h3').should('have.text', 'The Home Depot');
    cy.get('#best-internships-item-2 h3').should('have.text', 'Eide Baily');
    cy.get('#best-internships-item-3 h3').should('have.text', 'UScellular Experience Possibility: Internship Program');

    // Assert the correctness of the internship links
    cy.get('#best-internships-item-0 a').should('have.attr', 'href', '/internship-program/consulting/infosys-instep-internship-program/internship-opportunities');
    cy.get('#best-internships-item-1 a').should('have.attr', 'href', '/internship-program/retail/the-home-depot-internship-program/internship-opportunities');
    cy.get('#best-internships-item-2 a').should('have.attr', 'href', '/internship-program/accounting/eide-bailly-audit-tax-internship-program/internship-opportunities');
    cy.get('#best-internships-item-3 a').should('have.attr', 'href', '/internship-program/telecommunications/uscellular-internship/internship-opportunities');

    
  });

  //Rankings Page

  it('should display the "Featured Rankings" section', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.get("div[class^='Slider_root']").eq(0).should('be.visible');
    cy.get("div[class^='Slider_root']").eq(0).find('h2').should('contain', 'Featured Rankings');
    
  });

  it('should navigate to the "Vault Law 100" page form Featured Rankings', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.get('a[href="/best-companies-to-work-for/law/top-100-law-firms-rankings"]').eq(0).click();


  });

  it('should navigate to the "Vault Consulting 50" page form Featured Rankings', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.get('a[href="/best-companies-to-work-for/consulting/vault-consulting-rankings-top-50"]').eq(0).click();


  });

  it('should navigate to the "Vault Banking 25" page form Featured Rankings', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.get('a[href="/best-companies-to-work-for/banking/best-banks-to-work-for-top-25"]').eq(0).click();

  });

  it('should navigate to the "Vault Accounting 25" page form Featured Rankings', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.get('a[href="/best-companies-to-work-for/accounting/vault-accounting-25"]').eq(0).click();

  });

  it('should navigate to the "Vault Top Consulting Asia-Pacific" page form Featured Rankings', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.get('a[href="/best-companies-to-work-for/consulting/vault-top-consulting-asia-pacific"]').eq(0).click();


  });

  it('should navigate to the "Vault Consulting 25 EMEA" page form Featured Rankings ', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.get('a[href="/best-companies-to-work-for/consulting/vault-top-european-consulting-25"]').eq(0).click();


  });


  it('should display the "Top Vault Law Rankings" section form Top Vault Law Rankings Section', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.get("div[class^='Slider_root']").eq(1).find('h2').should('contain', 'Top Vault Law Rankings');
  });

  it('should navigate to the "Vault Law 100" page form Top Vault Law Rankings Section', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.get('a[href="/best-companies-to-work-for/law/top-100-law-firms-rankings"]').eq(1).click();

  });

  it('should navigate to the "Best Law firms to Work for" page form Top Vault Law Rankings Section', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.get("a[href='/best-companies-to-work-for/law/best-law-firms-to-work-for']").click();


  });

  it('should navigate to the "Best law firms for Diversity" page form Top Vault Law Rankings Section', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.get("a[href='/best-companies-to-work-for/law/best-law-firms-for-diversity']").click();


  });

  it('should navigate to the "Best law firms By Practice Area" page form Top Vault Law Rankings Section', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.get("a[href='/best-companies-to-work-for/law/best-law-firms-in-each-practice-area/antitrust']").click();


  });

  it('should navigate to the "Best law firms By Region" page form Top Vault Law Rankings Section', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.get("a[href='/best-companies-to-work-for/law/best-law-firms-in-each-us-region/atlanta']").click();


  });

  it('should display the "Top Consulting Rankings" ', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.get("div[class^='Slider_root']").eq(2).find('h2').should('contain', 'Top Consulting Rankings');
  });

  it('should navigate to the "Most Prestigious Consulting Firms" page form Top consulting Rankings Section', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.get("a[href='/best-companies-to-work-for/consulting/best-consulting-firms-prestige']").click();

  });

  it('should navigate to the "Best Boutique Consulting Firms" page form Top consulting Rankings Section', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.get("a[href='/best-companies-to-work-for/consulting/best-boutique-consulting-firms']").click();

  });

  //Companies Page


  it('should verify Comapnies Page ', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.xpath("(//button[normalize-space()='Companies'])[1]").click({ force: true })
    cy.contains("Top Vault-Ranked Companies").should('be.visible')
    cy.contains("Favorite Brands").should('be.visible')
    cy.contains("FinTech Startups").should('be.visible')
    cy.contains("Remote Work Essentials").should('be.visible')
    cy.contains("Nonprofit").should('be.visible')
    cy.contains("Sustainability").should('be.visible')
    cy.contains("Gaming & Peripherals").should('be.visible')
    cy.contains("Hot Tech").should('be.visible')
    cy.contains("Media & Entertainment").should('be.visible')
    cy.contains("High-Growth Industries").should('be.visible')
    cy.contains("eCommerce & Retail").should('be.visible')
    cy.contains("Social, Digital & Mobile Media").should('be.visible')
    cy.contains("Food & Beverages").should('be.visible')
    cy.contains("Wealth Management").should('be.visible')
    cy.contains("Financial Services").should('be.visible')
    cy.contains("Insurance").should('be.visible')
    cy.contains("Top Law Firms").should('be.visible')
    cy.contains("Top Consulting Firms").should('be.visible')
    cy.contains("Banking").should('be.visible')
    cy.contains("Accounting").should('be.visible')


  });

  it('should verify Practice Areas Page ', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.xpath("(//button[normalize-space()='Practice Areas'])[1]").click({ force: true })
    cy.contains("Antitrust").should('be.visible')
    cy.contains("Appellate Litigation").should('be.visible')
    cy.contains("Banking & Financial Services").should('be.visible')
    cy.contains("Bankruptcy/Restructuring").should('be.visible')
    cy.contains("Clean Tech").should('be.visible')
    cy.contains("Emerging Companies & Venture Capital").should('be.visible')
    cy.contains("Energy, Oil, & Gas").should('be.visible')
    cy.contains("Environmental Law").should('be.visible')
    cy.contains("Family Law").should('be.visible')
    cy.contains("General Corporate").should('be.visible')
    cy.contains("Health Law").should('be.visible')
    cy.contains("Insurance").should('be.visible')
    cy.contains("Intellectual Property").should('be.visible')
    cy.contains("International").should('be.visible')
    cy.contains("Labor & Employment").should('be.visible')
    cy.contains("Litigation").should('be.visible')
    cy.contains("Media, Entertainment, & Sports").should('be.visible')
    cy.contains("Mergers & Acquisitions").should('be.visible')
    cy.contains("Privacy & Data Security").should('be.visible')
    cy.contains("Private Equity").should('be.visible')
    cy.contains("Products Liability").should('be.visible')
    cy.contains("Project Finance").should('be.visible')
    cy.contains("Real Estate").should('be.visible')
    cy.contains("Securities").should('be.visible')
    cy.contains("Securities Litigation").should('be.visible')
    cy.contains("Tax").should('be.visible')
    cy.contains("Trusts & Estates").should('be.visible')
    cy.contains("White Collar Defense & Internal Investigations").should('be.visible')


  });

  it('should verify Practice Professions Page ', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.xpath("(//button[normalize-space()='Professions'])[1]").click({ force: true })
    cy.contains("Best Jobs in Technology").should('be.visible')
    cy.contains("Best Jobs in Finance").should('be.visible')
    cy.contains("Best Jobs in Engineering").should('be.visible')
    cy.contains("Best Jobs in Visual Arts & Design").should('be.visible')
    cy.contains("Best Health Care Provider Jobs").should('be.visible')
    cy.contains("Best Business Jobs").should('be.visible')


  });

  it('should verify Practice Industries Page ', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.xpath("(//button[normalize-space()='Industries'])[1]").click({ force: true })
    cy.contains("Fastest Growing Industries").should('be.visible')
    cy.contains("Best Industries for Undergraduates").should('be.visible')
    cy.contains("Best Industries for MBAs").should('be.visible')
    cy.contains("Best Alternative Industries for JD Degrees").should('be.visible')
    cy.contains("Best Industries for Liberal Arts Majors").should('be.visible')
    cy.contains("Best STEM Industries").should('be.visible')


  });


  it('should verify most-prestigious-internship-rankings Page ', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Internships']").click({ force: true })
    cy.contains("Explore Top-Ranked Internships").should('be.visible')
    cy.get("img[alt='Ranking Image']").should('be.visible')
    cy.contains("Vault's rankings are based on exclusive insider information from verified interns. Each year, Vault surveys thousands of interns. From the results of these surveys, Vault ranks the most prestigious internship programs, and the top internship programs in various industries in diversity, quality of life, and overall best to work for.").should('be.visible')
    cy.contains("Most Prestigious Internships").should('be.visible')
    cy.contains("100 Best Internships").should('be.visible')
    cy.contains("Best Internships by Employment Factor").should('be.visible')
    cy.contains("Best Internships for Diversity").should('be.visible')
    cy.contains("Best Internships by Role").should('be.visible')
    cy.contains("Best Internships by Industry").should('be.visible')
    cy.contains("Best Internships by Employment Factor").should('be.visible')
    cy.contains("Best Internships by Employment Factor").should('be.visible')
    cy.get('.style_rankImageContainer__6dCVs > img').should('have.length', 6);



  });

  it('should verify Internships Page ', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Rankings']").click({ force: true })
    cy.xpath("(//button[@id='tab-bar-tab-5'])[2]").click({ force: true })
    cy.contains("Accounting Internships").should('be.visible')
    cy.contains("Consulting Internships").should('be.visible')
    cy.contains("Consumer Goods Internships").should('be.visible')
    cy.contains("Investment Banking Internships").should('be.visible')
    cy.contains("Media Internships").should('be.visible')
    cy.contains("Tech Internships").should('be.visible')


  });

  it('Should perform regression checks for the footer', () => {
    cy.visit("https://uat.vault.com/");
    cy.get('footer.GuestLayout_footer__yXH3o').should('exist');
    // Check for the presence of footer links and their destinations
    cy.get('a[class^=Footer_footerText]').should('have.length', 7);
    cy.get('a[class^=Footer_footerText]').eq(0).should('have.attr', 'href', '/employers');
    cy.get('a[class^=Footer_footerText]').eq(1).should('have.attr', 'href', '/schools');
    cy.get('a[class^=Footer_footerText]').eq(2).should('have.attr', 'href', '/insiders');
    cy.get('a[class^=Footer_footerText]').eq(3).should('have.attr', 'href', '/careers/rankings');
    cy.get('a[class^=Footer_footerText]').eq(4).should('have.attr', 'href', '/library/blogs-employment-news');   
    cy.get('a[class^=Footer_footerText]').eq(5).should('have.attr', 'href', 'mailto:support@firsthand.co');
    cy.get('a[class^=Footer_footerText]').eq(6).should('have.attr', 'href', 'https://firsthandsupport.zendesk.com/hc/en-us');

    // Check for the presence of the social media icons and their destinations
    cy.get("div[class^='d-flex justify-content-center align-items-center p-5 Footer_footerSocial'] >a").should('have.length', 4);
    cy.get("div[class^='d-flex justify-content-center align-items-center p-5 Footer_footerSocial'] >a").eq(0).should('have.attr', 'href', 'https://www.facebook.com/VaultFirsthand');
    cy.get("div[class^='d-flex justify-content-center align-items-center p-5 Footer_footerSocial'] >a").eq(1).should('have.attr', 'href', 'https://instagram.com/vault_careers');
    cy.get("div[class^='d-flex justify-content-center align-items-center p-5 Footer_footerSocial'] >a").eq(2).should('have.attr', 'href', 'https://twitter.com/Vaultcareers');
    cy.get("div[class^='d-flex justify-content-center align-items-center p-5 Footer_footerSocial'] >a").eq(3).should('have.attr', 'href', 'https://www.linkedin.com/company/vaultfirsthand/');

    // Check for the presence of the additional footer information
    cy.get("div[class^='mb-5 Footer_footerInfoBox']").should('exist');
    cy.get("div[class^='col-12 d-flex justify-content-center align-items-center Footer_footerInfo'] >a").should('have.length', 3);
    cy.get("div[class^='col-12 d-flex justify-content-center align-items-center Footer_footerInfo'] >a").eq(0).should('have.attr', 'href', '/terms-of-service');
    cy.get("div[class^='col-12 d-flex justify-content-center align-items-center Footer_footerInfo'] >a").eq(1).should('have.attr', 'href', '/privacy-policy');
    cy.get("div[class^='col-12 d-flex justify-content-center align-items-center Footer_footerInfo'] >a").eq(2).should('have.attr', 'href', '/cookie-policy');
    cy.get("div[class^='col-12 d-flex justify-content-center align-items-center Footer_footerInfo'] >span").should('exist');
  });

  it('Should perform regression checks for the header', () => {
    cy.visit("https://uat.vault.com/");
    cy.get('header.d-flex').should('exist');
    cy.get("a[class^='Logos_root__0yrit'] >img").eq(0).should('exist');    
    // Check for the presence of the search input
    cy.get("input[placeholder='Search']").eq(0).should('exist');
    // Check for the presence of the login button
    cy.get("button[class^='Button_secondary']").eq(0).should('have.text','Login');
  });

  it('should verify library content ', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[normalize-space()='Library']").click({ force: true })
    // Check if the navigation bar exists
    cy.get("nav[class^='LibraryNavigation_navMain']").should('exist');
    // Check for the presence of the navbar brand
    cy.get("a[class^='LibraryNavigation_navbarBrand'] >h1").should('exist');
    // Check for the presence of the Explore button in collapsed mode
    cy.get("div[class^='LibraryNavigation_navbarToggle'] >button").should('exist');
    // Check for the presence of the dropdown items in expanded mode
    cy.get("div[class^='LibraryNavigation_navItem']").should('have.length', 3);
    // Check the text of the dropdown items
    cy.get('#collapsible-nav-dropdown-0').should('have.text', 'Explore Careers');
    cy.get('#collapsible-nav-dropdown-1').should('have.text', 'Get the Job');
    cy.get('#collapsible-nav-dropdown-2').should('have.text', 'Thrive at Work');
    // Check for the presence of the Guides link
    cy.get("a[class^='LibraryNavigation_navItem']").should('exist');
    // Check if the Editor's Picks modal exists
    cy.get('#editors-picks').should('exist');
    // Check for the presence of the modal header
    cy.get('#editors-picks-header').should('exist');
    // Check for the presence of the content image
    cy.get("img[alt^='Sponsor Image']").should('exist');    
    // Check for the presence of the link to the article
    cy.get('#editors-picks-link-title').should('exist');
    // Check for the presence of the article title
    cy.get('#editors-picks-link-title h3').should('exist');
    // Check for the presence of the blurb
    cy.get("div[class^='EditorsPicks_blurb']").should('exist');
    // Check for the presence of the title in expanded mode
    cy.get('#editors-picks-title').should('exist');
    // Check for the presence of each link and title in expanded mode
    cy.get('[id^="editors-picks-link-item"]').should('have.length', 8);
    cy.get('[id^="editors-picks-link-item"] h2').should('have.length', 4);
    cy.contains("Interviewing").should('exist');
    cy.contains("Resumes & Cover Letters").should('exist');
    cy.contains("Networking").should('exist');
    cy.contains("Job Search").should('exist');
    cy.contains("Grad School").should('exist');
    cy.contains("Internships").should('exist');
    cy.contains("Industries").should('exist');




  });

  it('should verify Vault Law Page ', () => {
    cy.visit("https://uat.vault.com/");
    cy.xpath("(//a[normalize-space()='Vault Law'])[1]").click({ force: true })
    // Check if the header exists
    cy.get('#jumbotron').should('exist');
    // Check for the presence of the header image
    cy.get("img[alt^='Header Image']").should('exist');
    // Check for the presence of the title
    cy.get('#jumbotron-title').should('exist');
    // Check for the presence of the subtitle
    cy.get('#jumbotron-sub-title').should('exist');
    // Check for the presence of each button
    cy.get('[id^="jumbotron-button"]').should('have.length', 6); // Check the number of buttons
    cy.get("[id^='jumbotron-button'] >span").should('have.length', 3); // Check the number of button titles
    // Check if the component exists
    cy.get('#research-top-ranked-law-firms').should('exist');
    // Check for the presence of the component title
    cy.get('#research-top-ranked-law-firms-title').should('exist');
    // Check for the presence of each law firm card
    cy.get('[id^="research-top-ranked-law-firms-item"]').should('have.length', 4); // Check the number of law firms
    // Check each law firm card for the presence of image and name
    for (let i = 0; i < 4; i++) {
      const lawFirmCard = cy.get(`#research-top-ranked-law-firms-item-${i}`);
      // Check for the presence of the law firm image
      lawFirmCard.find("img[class^='Image_root']").should('exist');

    }
    // Check if the modal exists
    cy.get('#editors-picks').should('exist');
    // Check for the presence of the modal title
    cy.get('#editors-picks-title').should('exist');
    // Check for the presence of the modal header
    cy.get('#editors-picks-header').should('exist');
    // Check for the presence of the modal content image
    cy.get("img[alt^='Sponsor Image']").should('exist');    
    // Check for the presence of the title, blurb, and link for the main pick
    cy.get('#editors-picks-link-title').should('exist');
    cy.get('#editors-picks-link-title h3').should('exist');
    cy.get("div[class^='EditorsPicks_blurb']").should('exist');
    // Check for the presence of each additional pick
    for (let i = 0; i < 4; i++) {
      const pick = cy.get(`#editors-picks-link-item-${i}`);
      // Check for the presence of the pick title
      pick.find('h2').should('exist');
    }
    // Check for the "View All" button
    cy.get('#editors-picks-view-all').should('exist');
    cy.get('#best-law').should('exist');
    // Check for the presence of the section title
    cy.get('#best-law-title').should('exist');
    // Check for the presence of each law ranking item (cards)
    for (let i = 0; i < 9; i++) {
      const lawRankingItem = cy.get(`#best-law-item-${i}`);
      // Check for the presence of the law ranking item title
      lawRankingItem.find('h3').should('exist');

    }
    cy.get('#best-law-button-view-all').should('exist');
    cy.get('#practice-areas').should('exist');
    cy.get('#practice-areas-title').should('have.text', 'Practice Area Q&A’s');
    cy.get('.swiper-slide').should('have.length.greaterThan', 2);
    cy.get('#practice-areas-button-view-all').should('exist').and('have.attr', 'href', '/careers/practice-areas'); cy.get('#top-law-guides-item-0 a').should('exist');
    cy.get('#top-law-guides-item-1 a').should('exist');
    cy.get('#top-law-guides-item-2 a').should('exist');
    cy.get('#top-law-guides-item-3 a').should('exist');



  });




  it('Should buy a Guide sucessfully', function () {

    cy.visit("https://uat.vault.com/");
    cy.xpath("//a[@role='button'][contains(.,'Guides')]").click({ force: true });
    cy.xpath("(//button[contains(.,'Purchase Options')])[15]").click({ force: true });
    cy.xpath("//button[normalize-space()='Add to Cart']").click({ force: true });
    cy.wait(5000);
    cy.get("div#cart-box-toggle").click({ force: true });
    getOrderSummaryandCheckOut()
    cy.checkoutlogin("Charanvault333@gmail.com", "Charan@123");
    cy.wait(10000);
    getOnlyCreditCardDetailsAndMakePayment();

  })


});

