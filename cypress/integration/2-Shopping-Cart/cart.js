import LoginPage from "../../support/pageObjects/loginPage.js";
import ProductPage from "../../support/pageObjects/productPage";
import CartPage from "../../support/pageObjects/cartPage";

// Set list of products from inventory to be added/removed to cart
let inventoryItemsToAdd = [
  { id: 0, productName: "Sauce Labs Bike Light" },
  { id: 1, productName: "Sauce Labs Bolt T-Shirt " },
  { id: 2, productName: "Sauce Labs Onesie" },
  // { id: 3, productName: "Test.allTheThings() T-Shirt (Red)" },
  // { id: 4, productName: "Sauce Labs Backpack" },
  // { id: 5, productName: "Sauce Labs Fleece Jacket" },
];

let inventoryItemsToRemove = [
  { id: 0, productName: "Sauce Labs Bike Light" },
  // { id: 1, productName: "Sauce Labs Bolt T-Shirt " },
  // { id: 2, productName: "Sauce Labs Onesie" },
  // { id: 3, productName: "Test.allTheThings() T-Shirt (Red)" },
  // { id: 4, productName: "Sauce Labs Backpack" },
  // { id: 5, productName: "Sauce Labs Fleece Jacket" },
];

describe("Purchase flow", () => {
  before("Should Login with valid user ", () => {
    cy.visit("/");
    // Login with valid user credentials.
    LoginPage.withCredentials("standard_user", "secret_sauce");
  });

  beforeEach(() => {
    // Persisting session cookies for further use.
    cy.restoreLocalStorage();
  });
  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("Should display products with correct information", () => {
    // Verify that the products are displayed with correct information. (name,description,price,add to cart button)
    cy.url().should("include", "/inventory.html");
    ProductPage.assertProductItems();
  });

  it("Should allow the customer to add/remove products from inventory to cart and update cart badge", () => {
    // Add/Remove products to cart based on ID of the product from fixture (products.json).
    ProductPage.addProductToCart(inventoryItemsToAdd);
    ProductPage.removeProductFromCart(inventoryItemsToRemove);
    ProductPage.gotoCart();
  });

  it("Should allow the customer to validate and remove from current selected items in shopping cart and checkout", () => {
    // Validate if items previously selected were succesfully added to cart.
    cy.url().should("include", "/cart.html");
    CartPage.continueButtonExist();
    ProductPage.checkingProductsInCart();
    ProductPage.removeProductFromCart(
      [{ id: 1, productName: "Sauce Labs Bolt T-Shirt " }],
      "cartPage"
    );
    ProductPage.gotoCheckout();
  });

  it("Should allow the customer to fill out purchase details", () => {
    cy.url().should("include", "/checkout-step-one.html");
    CartPage.cancelButtonExist();
    CartPage.fillOutCheckoutForm("Jose David", "Barrera Bernal", "11631");
  });

  it("Should allow the customer to review Checkout overview details", () => {
    cy.url().should("include", "/checkout-step-two.html");
    ProductPage.checkingProductsInCart();
    CartPage.checkSummaryInfo();
    CartPage.gotoFinnish();
  });

  it("Should show checkout complete", () => {
    cy.url().should("include", "/checkout-complete.html");
    CartPage.checkOrderConfirmation();
  });
});
