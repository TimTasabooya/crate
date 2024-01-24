describe("Validate crate creation, editing and removal", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/user/login");
    cy.get('input[type="email"]').type("test@admin.com");
    cy.get('input[type="password"]').type("mishmash123");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", "http://localhost:3000/admin/dashboard");
    cy.contains(
      "p",
      "Nothing here yet. Choose an item from admin menu."
    ).should("be.visible");
    cy.get('a[href="/admin/crates"]').click();
  });

  it("As an admin, create a new crate", () => {});

  it("As an admin, edit an existing crate", () => {});

  it("As an admin, delete an existing product", () => {});
});
