describe("user signs up", () => {
  beforeEach(() => {
    cy.tests_cleanup();
  });

  it("signed up user can see the protected page", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.get('[data-qa="protected-link"]').click();
    cy.get('[data-qa="change-auth-mode"]').should("be.visible");

    cy.get('[data-qa="change-auth-mode"]').click();
    cy.get('[data-qa="repeat_password"]').should("be.visible");

    cy.get('[data-qa="username"]').type("Somebody");
    cy.get('[data-qa="email"]').type(Cypress.env("userEmail"));
    cy.get('[data-qa="password"]').type(Cypress.env("userPassword"));
    cy.get('[data-qa="repeat_password"]').type(Cypress.env("userPassword"));
    cy.get('[data-qa="submit"]').click();

    cy.get('[data-qa="protected-page"]').should("be.visible");
    cy.get('[data-qa="sign-out-btn"]').should("be.visible");

    cy.get('[data-qa="sign-out-btn"]').click();
    cy.get('[data-qa="not-logged"]').should("be.visible");
  });
});
