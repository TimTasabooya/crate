describe("Validate product creation, editing and removal", () => {
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
    cy.get('a[href="/admin/products"]').click();
  });

  it("As an admin, create a new product", () => {
    cy.contains("button", " Add").click();
    cy.get('input[placeholder="Name"]').type("Chihuahua for Women");
    cy.get('textarea[placeholder="Description"]').type(
      "A cute, loyal companion to roll deep with."
    );
    cy.get("select").eq(0).select("2");
    cy.get("select").eq(1).select("2");
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/images/Chihuahua.jpeg"
    );
    cy.contains("span", "File uploaded successfully.").should("be.visible");
    cy.contains("button", " Save").click();
    cy.url().should("eq", "http://localhost:3000/admin/products");
    cy.contains("span", "Product saved successfully.").should("be.visible");
    cy.get("td").eq(1).contains("Chihuahua for Women").should("be.visible");
    cy.screenshot();
  });

  it("As an admin, edit an existing product", () => {
    cy.get("a").children("i").eq(0).click();
    cy.get('input[placeholder="Name"]')
      .clear()
      .type("Jack Russell Terrier for Men");
    cy.get('textarea[placeholder="Description"]')
      .clear()
      .type("A smart, energetic comrade to go hunting with.");
    cy.get("select").eq(0).select("2");
    cy.get("select").eq(1).select("1");
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/images/Jack-Russell-Terrier.jpg"
    );
    cy.contains("span", "File uploaded successfully.").should("be.visible");
    cy.contains("button", " Save").click();
    cy.contains("span", "Product saved successfully.").should("be.visible");
    cy.url().should("eq", "http://localhost:3000/admin/products");
    cy.get("td")
      .eq(1)
      .contains("Jack Russell Terrier for Men")
      .should("be.visible");
    cy.screenshot();
  });

  it("As an admin, delete an existing product", () => {
    cy.get("span").children("i").eq(0).click();
    cy.contains("span", "Product deleted successfully.").should("be.visible");
    cy.screenshot();
  });
});
