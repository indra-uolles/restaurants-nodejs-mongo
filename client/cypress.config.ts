import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    baseUrl: "http://localhost:3000",
    userEmail: "somebody@gmail.com",
    userPassword: "12345678!",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
