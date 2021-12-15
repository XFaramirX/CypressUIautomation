import Products from "../fixtures/Products.json";

//Fields defined in the page object
const INVENTORY_ITEMS = ".inventory_item";
const CART_ITEMS = ".cart_item";
const CART_BADGE = ".shopping_cart_badge";

class ProductPage {
  constructor() {
    this.listOfProducts = [];
  }
  assertProductItems() {
    cy.get(INVENTORY_ITEMS).should("have.length", 6);
  }

  getProductPrice() {
    let price = this.listOfProducts
      .map((item) => parseFloat(Products[item.id].price.replace("$", "")))
      .reduce((a, b) => a + b, 0);

    console.log(price);
    return price;
  }

  addProductToCart(items) {
    this.listOfProducts = items;
    for (let i = 0; i < this.listOfProducts.length; i++) {
      cy.contains(INVENTORY_ITEMS, Products[this.listOfProducts[i].id].name)
        .contains("Add to cart")
        .click();
    }
    cy.get(CART_BADGE).should("contain.text", this.listOfProducts.length);
  }

  removeProductFromCart(items, page) {
    let SELECTOR = INVENTORY_ITEMS;
    if (page == "cartPage") {
      SELECTOR = CART_ITEMS;
    }
    for (let i = 0; i < items.length; i++) {
      cy.contains(SELECTOR, Products[items[i].id].name)
        .find("button")
        .should("have.text", "Remove")
        .click();

      this.listOfProducts = this.listOfProducts.filter(
        (item) => item.id !== items[i].id
      );
    }
    cy.get(CART_BADGE).should("contain.text", this.listOfProducts.length);
  }

  gotoCart() {
    cy.get(CART_BADGE).click();
  }

  gotoCheckout() {
    cy.get('[name*="checkout"]').click();
  }

  checkingProductsInCart() {
    for (let i = 0; i < this.listOfProducts.length; i++) {
      cy.contains(CART_ITEMS, Products[this.listOfProducts[i].id].name);
      cy.contains(CART_ITEMS, Products[this.listOfProducts[i].id].description);
      cy.contains(CART_ITEMS, Products[this.listOfProducts[i].id].price);
      cy.contains(CART_ITEMS, Products[this.listOfProducts[i].id].name).should(
        "contain.text",
        1
      );
    }
  }
}
export default new ProductPage();
