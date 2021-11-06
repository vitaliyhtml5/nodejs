///<reference types="Cypress" />

describe('User sees an error when invalid data is put', () => {
    before(() => cy.fixture('city_data').then(data => globalThis.data = data));
    beforeEach(() => cy.visit('/'));

    it('User puts a city which does noe excist', () => {
        const city = getIncorrectCity(data.incorrectData.notFound);
        cy.intercept('GET', `/get_data?city=${city}`).as('getRes');

        cy.chooseCity(city);
        cy.wait('@getRes').then(res => {
            expect(res.response.body.message).equal('city not found');
            cy.get('.error-wrap').should('not.have.css', 'display', 'none');
        });
    });

    it('User puts a city with non-English chars', () => {
        const city = getIncorrectCity(data.incorrectData.nonEnglish);
        cy.intercept('GET', `/get_data?city=${city}`).as('getRes');

        cy.chooseCity(city);
        cy.get('.error-wrap').should('not.have.css', 'display', 'none');
        cy.getData(city).then(res => {
            expect(res.body.message).equal('non-english chars');
        });
    });

    it('User puts a city with incorrect type of value', () => {
        const city = getIncorrectCity(data.incorrectData.notChars);
        cy.intercept('GET', `/get_data?city=${city}`).as('getRes');

        cy.chooseCity(city);
        cy.get('.error-wrap').should('not.have.css', 'display', 'none');
        cy.getData(city).then(res => {
            expect(res.body.message).equal('non-english chars');
        });
    });

    function getIncorrectCity(array) {
        let random = length => (Math.floor(Math.random() * length));
        return array[random(array.length)];
    }
});