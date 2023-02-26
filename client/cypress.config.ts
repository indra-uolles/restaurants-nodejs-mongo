import { defineConfig } from "cypress";
const { connect, disconnect } = require("./cypress/support/db");
const ObjectId = require("mongodb").ObjectId;

export default defineConfig({
  env: {
    baseUrl: "http://localhost:3000",
    backendUrl: "http://localhost:8080",
    userEmail: "somebody@gmail.com",
    userPassword: "12345678!",
    userPasswordEncrypted:
      "$2a$12$d8Z0ydkZ8dxvGWgSJrKzs.nMiE3f8PWfCCtUHo7SBuVc4oO9a7ZTe",
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
        async createUser() {
          const db = await connect();
          const users = db.collection("users");

          const user = {
            _id: new ObjectId(),
            username: "Somebody",
            email: "somebody@gmail.com",
            password:
              "$2a$12$d8Z0ydkZ8dxvGWgSJrKzs.nMiE3f8PWfCCtUHo7SBuVc4oO9a7ZTe",
            createdAt: new Date(),
          };

          console.log("create user");
          await users.insertOne(user);

          await disconnect();

          return null;
        },
      });
    },
  },
});
