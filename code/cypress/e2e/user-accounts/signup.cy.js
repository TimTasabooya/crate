describe("Validate signup with various user input", () => {
  const generateRandomEmail = () => {
    const randomString = Math.random().toString(36).substring(7);
    return `John-Doe.${randomString}@test.com`;
  };
  const newUserEmail = generateRandomEmail();

  beforeEach(() => {
    cy.visit("http://localhost:3000/user/signup");
  });

  it("Signup with a valid email and valid password", () => {
    cy.get('input[type="text"]').type("John-Doe Test");
    cy.get('input[type="email"]').type(newUserEmail);
    cy.get('input[type="password"]').type("mishmash123");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", "http://localhost:3000/user/login");
    cy.contains("span", "Signed up successfully.").should("be.visible");
    cy.screenshot();
  });

  it("Login with recently created user", () => {
    cy.contains("button", "Login").click();
    cy.get('input[type="email"]').type(newUserEmail);
    cy.get('input[type="password"]').type("mishmash123");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", "http://localhost:3000/crates");
    cy.contains("h3", "Crates for everyone!").should("be.visible");
    cy.screenshot();
  });

  it("Signup with an invalid email but valid password", () => {
    cy.get('input[type="text"]').type("John-Doe Test");
    cy.get('input[type="email"]').type("abcdefg");
    cy.get('input[type="password"]').type("mishmash123");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", "http://localhost:3000/user/signup");
    cy.screenshot();
  });

  it("Signup with a valid email but no password", () => {
    cy.get('input[type="text"]').type("John-Doe Test");
    cy.get('input[type="email"]').type(generateRandomEmail());
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", "http://localhost:3000/user/signup");
    cy.screenshot();
  });

  it("Signup with no username but with a valid email and valid password", () => {
    cy.get('input[type="email"]').type(generateRandomEmail());
    cy.get('input[type="password"]').type("mishmash123");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", "http://localhost:3000/user/signup");
    cy.screenshot();
  });

  it("Signup with an existing user", () => {
    cy.get('input[type="text"]').type("test");
    cy.get('input[type="email"]').type("test@test.com");
    cy.get('input[type="password"]').type("mishmash123");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", "http://localhost:3000/user/signup");
    cy.contains(
      "span",
      "The email test@test.com is already registered. Please try to login."
    ).should("be.visible");
    cy.screenshot();
  });
});
