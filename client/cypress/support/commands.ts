Cypress.Commands.add("tests_cleanup", () => {
  cy.task("clearDB");
  // more cleanup commands, e.g. clear mailbox
});

Cypress.Commands.add("simulate_login", (email: string, password: string) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("backendUrl")}/auth/login`,
    body: {
      email,
      password,
    },
  })
    .then((response) => {
      window.localStorage.setItem("token", response.body.token);
      Cypress.env("token", response.body.token);
      return response;
    })
    .its("status")
    .should("eq", 200);
});
