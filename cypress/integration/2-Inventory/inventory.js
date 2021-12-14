/// <reference types="cypress" />
import LoginPage from "../../pageObjects/LoginPage";
import ProductPage from "../../pageObjects/ProductPage";

describe("Inventory Page", () => {
  before("Go To Url", () => {
    cy.visit("/");
    // Login with valid user credentials.
    LoginPage.withCredentials("standard_user", "secret_sauce");
    cy.url().should("include", "/inventory.html");
  });

  it.skip("Should display products with correct information", () => {
    ProductPage.assertProductInfo();
  });

  it("Should allow the customer to add/remove products from inventory to cart", () => {
    // Add products to cart based on ID of the product
    ProductPage.addProductToCart([0, 1, 2, 3, 4, 5]);
    ProductPage.removeProductFromCart([0]);
  });
});
