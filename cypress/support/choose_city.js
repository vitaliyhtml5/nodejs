Cypress.Commands.add('chooseCity', city => {
    cy.get('#city').type(city);
    cy.contains('form > button', 'Confirm').click();
});