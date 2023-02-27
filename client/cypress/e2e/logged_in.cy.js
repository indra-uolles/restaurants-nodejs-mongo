describe("user logs in", () => {
  before(() => {
    cy.tests_cleanup();
    cy.task("createUser");
    cy.simulate_login(Cypress.env("userEmail"), Cypress.env("userPassword"));
  });

  it("logged in user can see the protected page", () => {
    cy.visit(`${Cypress.env("baseUrl")}/protected`);

    cy.get('[data-qa="sign-out-btn"]').should("be.visible");

    cy.get('[data-qa="sign-out-btn"]').click();
    cy.get('[data-qa="not-logged"]').should("be.visible");
  });
});
