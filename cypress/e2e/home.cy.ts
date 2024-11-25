describe("Home Page", () => {
  it("loads successfully", () => {
    cy.visit("/");
    cy.contains("Preselected Songs");
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("Enter General Info", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("localhost:3000");
    cy.get('[data-testid="genre-card"]').should("have.css", "opacity", "0.2");
    cy.get("#floating_first_name").click();
    cy.get("#floating_first_name").clear();
    cy.get("#floating_first_name").type("Jim");
    cy.get("#floating_last_name").clear();
    cy.get("#floating_last_name").type("Butcher");
    cy.get("#floating_dob").clear();
    cy.get("#floating_dob").type("1993-07-26");
    cy.get("input#floating_age").should("have.value", 31);
    cy.get('[data-testid="genre-card"]').should("have.css", "opacity", "1");
    cy.get("#floating_target_start_age").clear();
    cy.get("#floating_target_start_age").type("14");
    cy.get("#floating_upper_age").clear();
    cy.get("#floating_upper_age").type("31");
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("Add Song", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("localhost:3000");
    cy.get("#song-input").clear("y");
    cy.get("#song-input").click();
    cy.get("#song-input").type("yellow subm{downArrow}{enter}");
    cy.get('[data-testid="song-count"]').should(
      "have.text",
      "Songs in Playlist: 1"
    );
    cy.get(".ag-center-cols-container")
      .children()
      .its("length")
      .should("eq", 1);

    /* ==== End Cypress Studio ==== */
  });

  it.only("Add Multiple Songs", function () {
    cy.visit("localhost:3000");
    cy.get("#song-input").clear("y");
    cy.get("#song-input").click();
    cy.get("#song-input").type("yellow subm{downArrow}{enter}");
    cy.get("#song-input").clear("y");
    cy.get("#song-input").click();
    cy.get("#song-input").type("hello, dolly{downArrow}{enter}");
    cy.get('[data-testid="song-count"]').should(
      "have.text",
      "Songs in Playlist: 2"
    );
    cy.get(".ag-center-cols-container")
      .children()
      .its("length")
      .should("eq", 2);
  });
});
