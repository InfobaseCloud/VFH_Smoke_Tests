const { exec } = require('child_process');
const specs = [
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/AdminDashboard/Add Users/AddNew Admin.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/AdminDashboard/Add Users/AddUsers Individually.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/AdminDashboard/Add Users/AddUsers with Program.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/AdminDashboard/Manage Users/Actions.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/AdminDashboard/Manage Users/Filters.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/AdminDashboard/Manage Users/Resend Invitation emails.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/AdminDashboard/Manage Users/UserProfilePage.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/AdminDashboard/Manage Users/Validation of ManageUsers Table.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/AdminDashboard/Messaging/Lists.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/AdminDashboard/Messaging/SendEmails.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/AdminDashboard/Messaging/WelcomeCompaigns.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Brouchers/Brouchers.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Collections/Collections.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Companies/ViewCompanies.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/E-Commerce/Cartpage.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/E-Commerce/Guides.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Industries/ViewIndustries.spec.js',  
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Interships/ViewInternships.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Landing Pages',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Login/LoginScenarios.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Manage Users/ManageUsers.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Messages/MessagesTests.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Practice Areas/ViewPracticeAreas.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Professions/ViewProfessions.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Profile/Account.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Profile/YourProfile.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Public site Home Page/Footer.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Public site Home Page/Header Navigation.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Resume and CoverLetter/CoverTemplate.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Resume and CoverLetter/Download coverletter as pdf .spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Resume and CoverLetter/Download coverletter as word .spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Resume and CoverLetter/Download Resumes Pdf .spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Resume and CoverLetter/Download Resumes Word .spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Resume and CoverLetter/Resume and CoverLetter IndexPage.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Resume and CoverLetter/ResumeTemplate.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Search/Search.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/The Library/Blog Articles.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Themes/Themes.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Vault Law.spec.js/Diversity Page.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Vault Law.spec.js/Vault Law IndexPage.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Vault Rankings/VaultLaw100.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Vault Rankings/ViewRankings.spec.js',
  'cypress/integration/Firsthand/BuildTeam/Firsthand Test cases/Welcome page/WelcomePageTests.spec.js',

  // add more spec files as needed
];
const browsers = [
  'chrome',
  'edge',
  'electron',
];
const specsPerBrowser = Math.ceil(specs.length / browsers.length);
browsers.forEach((browser, index) => {
  const startIndex = index * specsPerBrowser;
  const endIndex = startIndex + specsPerBrowser;
  const browserSpecs = specs.slice(startIndex, endIndex);
  const specString = browserSpecs.join(',');
  const command = `npm run cy:run -- --browser ${browser} --spec "${specString}"`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running command "${command}":`, error);
    }
    console.log(stdout);
  });
  //
});