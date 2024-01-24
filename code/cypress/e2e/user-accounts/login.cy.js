describe("Validate login with various user input", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/user/login");
  });

  it("Login with a valid email and valid password", () => {
    cy.get('input[type="email"]').type("test@test.com");
    cy.get('input[type="password"]').type("mishmash123");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", "http://localhost:3000/crates");
    cy.contains("h3", "Crates for everyone!").should("be.visible");
    cy.screenshot();
  });

  it("Login with a invalid email but valid password", () => {
    cy.get('input[type="email"]').type("invalid-email@test.com");
    cy.get('input[type="password"]').type("mishmash123");
    cy.get('button[type="submit"]').click();
    cy.url().should("not.eq", "http://localhost:3000/crates");
    cy.contains(
      "span",
      "We do not have any user registered with invalid-email@test.com email address. Please signup."
    ).should("be.visible");
    cy.screenshot();
  });

  it("Login with a valid email but invalid password", () => {
    cy.get('input[type="email"]').type("test@test.com");
    cy.get('input[type="password"]').type("invalid-password");
    cy.get('button[type="submit"]').click();
    cy.url().should("not.eq", "http://localhost:3000/crates");
    cy.contains(
      "span",
      "Sorry, the password you entered is incorrect. Please try again."
    ).should("be.visible");
    cy.screenshot();
  });

  it("Logout returns user to the login page", () => {
    cy.get('input[type="email"]').type("test@test.com");
    cy.get('input[type="password"]').type("mishmash123");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", "http://localhost:3000/crates");
    cy.contains("h3", "Crates for everyone!").should("be.visible");
    cy.get('a[href="/user/profile"]').click();
    cy.url().should("eq", "http://localhost:3000/user/profile");
    cy.contains("button", "Logout").click();
    cy.url().should("eq", "http://localhost:3000/user/login");
    cy.screenshot();
  });
});
