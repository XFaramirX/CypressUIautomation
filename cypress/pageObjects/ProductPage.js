import Products from "../fixtures/Products.json";

//Fields defined in the page object
const INVENTORY_ITEMS = ".inventory_item";
const CART_BADGE = ".shopping_cart_badge";
let amountOfProducts = 0;

class ProductPage {
  assertProductInfo() {
    let inventoryList = cy.get(INVENTORY_ITEMS);
    inventoryList.should("have.length", 6).each(($el, index) => {
      cy.wrap($el).should("contain", Products[index].name);
      cy.wrap($el).should("contain", Products[index].description);
      cy.wrap($el).should("contain", Products[index].price);
      cy.wrap($el).should("contain", "Add to cart");
    });
  }
  addProductToCart(items) {
    amountOfProducts = items.length;
    for (let i = 0; i < items.length; i++) {
      console.log(Products[items[i]]);
      cy.contains(".inventory_item", Products[items[i]].name)
        .contains("Add to cart")
        .click();
    }
    cy.get(CART_BADGE).should("have.text", amountOfProducts);
  }
  removeProductFromCart(items) {
    for (let i = 0; i < items.length; i++) {
      cy.contains(".inventory_item", Products[items[i]].name)
        .find("button")
        .should("have.text", "Remove")
        .click();
    }

    cy.get(CART_BADGE).should("have.text", amountOfProducts - items.length);
  }
}
export default new ProductPage();
