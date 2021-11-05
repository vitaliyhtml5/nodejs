///<reference types="Cypress" />

describe('User sees an error when invalid data is put', () => {
    let random = length => (Math.floor(Math.random() * length));
    before(() => cy.fixture('city_data').then(data => globalThis.data = data));
    beforeEach(() => cy.visit('/'));

    it('User', () => {

    });
});