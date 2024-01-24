describe("Subscribe/unsubscribe to various crate categories", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/user/login");
    cy.get('input[type="email"]').type("test@test.com");
    cy.get('input[type="password"]').type("mishmash123");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", "http://localhost:3000/crates");
    cy.contains("h3", "Crates for everyone!").should("be.visible");
    cy.screenshot();
  });

  it("Subscribe to a crate category ", () => {
    cy.contains("h4", "Clothes for Men").siblings("p").find("button").click();
    cy.url().should("eq", "http://localhost:3000/user/subscriptions");
    cy.contains("h3", "My subscriptions").should("be.visible");
    cy.contains("h4", "Clothes for Men").should("be.visible");
    cy.screenshot();
  });

  it("Unsubscribe from a crate category ", () => {
    cy.contains("a", "Subscriptions").click();
    cy.url().should("eq", "http://localhost:3000/user/subscriptions");
    cy.contains("h3", "My subscriptions").should("be.visible");
    cy.contains("h4", "Clothes for Men").should("be.visible");
    cy.contains("h4", "Clothes for Men").siblings("p").find("button").click();
    cy.contains("span", "Unsubscribed successfully.").should("be.visible");
    cy.contains("p", "You are not subscribed to any crates yet.").should(
      "be.visible"
    );
    cy.screenshot();
  });
});

// cy.get(':nth-child(1) > .jsx-511674265 > div > [style="text-align: center; margin-top: 1.5em; margin-bottom: 1em;"] > .jsx-1228826222')
