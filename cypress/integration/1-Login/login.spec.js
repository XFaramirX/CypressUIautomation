import Users from "../../fixtures/Users.json";
import LoginPage from "../../pageObjects/loginPage.js";

describe("Login Page", () => {
  before("Go To Url", () => {
    cy.visit("/");
  });
  // Attempt to login with different user credentials.
  Users.forEach((user) => {
    it(`Should attempt to login with ${user.description}`, () => {
      LoginPage.withCredentials(user.name, user.password);
      if (user.error) {
        // If user is not valid then assert error message and clear input fields.
        LoginPage.assertErrorMessage(user.errorMessage);
        LoginPage.clearFields();
      } else {
        // we should be redirected valid user to /inventory page.
        cy.url().should("include", "/inventory.html");
      }
    });
  });
});
