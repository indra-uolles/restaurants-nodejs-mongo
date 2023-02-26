import { defineConfig } from "cypress";
const { connect, disconnect } = require("./cypress/support/db");

export default defineConfig({
  env: {
    baseUrl: "http://localhost:3000",
    userEmail: "somebody@gmail.com",
    userPassword: "12345678!",
  },
  numTestsKeptInMemory: 10,
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async clearDB() {
          const db = await connect();
          const users = db.collection("users");

          console.log("clear users");
          await users.deleteMany({});
          await users.dropIndexes();

          await disconnect();

          return null;
        },
      });
    },
  },
});
