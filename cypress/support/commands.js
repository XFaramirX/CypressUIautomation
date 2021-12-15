import "cypress-localstorage-commands";
Cypress.Commands.overwrite("type", (originalFn, subject, str, options) => {
  if (str !== "") {
    return originalFn(subject, str, options);
  }

  return subject;
});

Cypress.Commands.add("preserveCookie", () => {
  Cypress.Cookies.defaults({
    preserve: "session-username",
  });
});
