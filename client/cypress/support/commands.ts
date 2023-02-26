Cypress.Commands.add("tests_cleanup", () => {
  cy.task("clearDB");
  // more cleanup commands, e.g. clear mailbox
});
