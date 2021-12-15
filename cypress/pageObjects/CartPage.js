class CartPage {
  continueButtonExist() {
    cy.get("#continue-shopping").should("exist");
  }

  cancelButtonExist() {
    cy.get("#cancel").should("exist");
  }

  fillOutCheckoutForm() {
    cy.get("#first-name").type("Jose David Ismael");
    cy.get("#last-name").type("Barrera Bernal");
    cy.get("#postal-code").type("11631");
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

    cy.get(".summary_subtotal_label").should("exist");
    cy.get(".summary_tax_label").should("exist");
    cy.get(".summary_total_label").should("exist");
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

    cy.get("#back-to-products").should("exist");
  }
}
export default new CartPage();
