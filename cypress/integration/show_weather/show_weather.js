///<reference types="Cypress" />

describe('User chooses city by name', () => {
    let random = length => (Math.floor(Math.random() * length));
    before(() => cy.fixture('city_data').then(data => globalThis.data = data));
    beforeEach(() => cy.visit('/'));

    it('User choose a city successfully', () => {
        const city = data.city[random(data.city.length)];
        cy.intercept(`/get_data?city=${city}`).as('getDataCity');

        cy.get('#city').type(city).should('have.value', city);
        cy.contains('form > button', 'Confirm').click();
        cy.wait('@getDataCity').then(() => {
            cy.getData(city).then(res => {
                cy.checkData('.weather-widget .city', res.body.city);
                cy.getIconPath(res.body.weather, res.body.dayTime).then(path => {
                    cy.get('.weather-widget .icon-weather').invoke('css', 'background-image').should('include', path);
                });
                cy.checkData('.weather-widget .weather-humidity', res.body.humidity);
                cy.checkData('.weather-widget .weather-wind', res.body.windSpeed);
                cy.get('.weather-widget .wind-direction').invoke('attr', 'style').should('include', `${res.body.windDeg - 180}deg`);
                cy.checkData('.weather-widget .weather-temp', res.body.temp);
                cy.checkData('.sun-wrap .sun-rise', res.body.sunrise);
                cy.checkData('.sun-wrap .sun-set', res.body.sunset);
            });
        });
    });

    it('User choose a city with symbols successfully', () => {
        const city = data.cityWithSymbols[random(data.cityWithSymbols.length)];
        cy.intercept(`/get_data?city=${city}`).as('getDataCity');
        cy.chooseCity(city);
        cy.wait('@getDataCity').then(data => {
            expect(data.response.statusCode).and.be.oneOf([200,304]);
        });
    });

    it('User navigates to Astronomy application', () => {
        cy.contains('a', 'Astronomy application').invoke('attr', 'href').should('include', 'https://vitaliyhtml5-astronomy-app.herokuapp.com/');
        cy.contains('a', 'Astronomy application').click();
        cy.url().should('eq', 'https://vitaliyhtml5-astronomy-app.herokuapp.com/');
    });
});