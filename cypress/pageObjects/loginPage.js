//Fields defined in the page object
const INPUT_USERNAME = "#user-name";
const INPUT_PASSWORD = "#password";
const LOGIN_BUTTON = "#login-button";
const ERROR_MESSAGE = ".error-message-container";
const ERROR_BUTTON = ".error-button";

class LoginPage {
  withCredentials(userName, password) {
    cy.get(INPUT_USERNAME).type(userName).should("have.value", userName);
    cy.get(INPUT_PASSWORD).type(password);
    cy.get(LOGIN_BUTTON).click();
  }
  assertErrorMessage(errorMessage) {
    cy.get(ERROR_MESSAGE).should("contain", errorMessage);
  }
  clearFields() {
    cy.get(ERROR_BUTTON).click();
    cy.get(INPUT_USERNAME).clear();
    cy.get(INPUT_PASSWORD).clear();
  }
}
export default new LoginPage();
