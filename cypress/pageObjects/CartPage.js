class CartPage {
  continueButtonExist() {
    cy.get("#continue-shopping").should("be.visible");
  }

  cancelButtonExist() {
    cy.get("#cancel").should("be.visible");
  }

  fillOutCheckoutForm(name, lastName, zipCode) {
    cy.get("#first-name").type(name);
    cy.get("#last-name").type(lastName);
    cy.get("#postal-code").type(zipCode);
    cy.get("#continue").click();
  }

  checkSummaryInfo() {
    cy.get(".summary_info_label")
      .eq(0)
      .should("contain.text", "Payment Information:");
    cy.get(".summary_value_label")
      .eq(0)
      .should("contain.text", "SauceCard #31337");
    cy.get(".summary_info_label")
      .eq(1)
      .should("contain.text", "Shipping Information:");
    cy.get(".summary_value_label")
      .eq(1)
      .should("contain.text", "FREE PONY EXPRESS DELIVERY!");

    cy.get(".summary_subtotal_label").should("be.visible");
    cy.get(".summary_tax_label").should("be.visible");
    cy.get(".summary_total_label").should("be.visible");
  }

  gotoFinnish() {
    cy.get("#finish").click();
  }

  checkOrderConfirmation() {
    cy.get(".title").should("contain.text", "Checkout: Complete!");
    cy.get(".complete-header").should(
      "contain.text",
      "THANK YOU FOR YOUR ORDER"
    );

    cy.get(".complete-text").should(
      "contain.text",
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );
    cy.get(".pony_express")
      .should("exist")
      .should("have.attr", "src", "/static/media/pony-express.46394a5d.png")
      .should("have.attr", "alt", "Pony Express");

    cy.get("#back-to-products").should("be.visible");
  }
}
export default new CartPage();
