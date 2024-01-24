describe("Validate admin login functionality", () => {
  it("Login/Logout with an admin account", () => {
    cy.visit("http://localhost:3000/user/login");
    cy.get('input[type="email"]').type("test@admin.com");
    cy.get('input[type="password"]').type("mishmash123");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", "http://localhost:3000/admin/dashboard");
    cy.contains(
      "p",
      "Nothing here yet. Choose an item from admin menu."
    ).should("be.visible");
    cy.screenshot();
    cy.get('a[href="/user/profile"]').click();
    cy.url().should("eq", "http://localhost:3000/user/profile");
    cy.contains("button", "Logout").click();
    cy.url().should("eq", "http://localhost:3000/user/login");
    cy.screenshot();
  });
});
