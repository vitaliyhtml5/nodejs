Cypress.Commands.add('checkData', (item, value) => {
    cy.get(item).should('contain', value);
});