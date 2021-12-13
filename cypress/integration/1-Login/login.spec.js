/// <reference types="cypress" />
import USERS from "../../fixtures/users.json";
import LoginPage from "../../pageObjects/loginPage";

describe("Login Page", () => {
  before("Go To Url", () => {
    cy.visit("https://www.saucedemo.com/");
  });

  // Attempt to login with different user credentials.
  USERS.forEach((user) => {
    it(`should attempt to login with ${user.description}`, () => {
      LoginPage.inputUsername(user.name);
      LoginPage.inputPassword(user.password);
      LoginPage.loginButton();

      if (user.error) {
        // If user is not valid then assert error message and clear input fields.
        LoginPage.assertClearFields(user.errorMessage);
      } else {
        // we should be redirected valid user to /inventory page.
        cy.url().should("include", "/inventory.html");
      }
    });
  });
});
