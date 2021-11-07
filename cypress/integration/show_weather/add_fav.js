///<reference types="Cypress"/>

describe('User uses Favorite list option', () => {
    let randomCity = () => data.city[Math.floor(Math.random() * data.city.length)];
    before(() => cy.fixture('city_data').then(data => globalThis.data = data));
    beforeEach(() => {
        cy.visit('/');
        cy.clearLocalStorage();
    });

    it('User adds the first city into Favorite list', () => {
        let city = randomCity();
        cy.intercept(`http://127.0.0.1:3000/get_data?city=${city}`).as('getRes');

        cy.get('.fav-main').should('have.css', 'display', 'none');
        cy.chooseCity(city);
        cy.wait('@getRes').then(() => {
            cy.get('.add-fav').click({force: true});
            cy.get('.city').then(name => {
                cy.get('.fav-main').should('not.have.css', 'display', 'none');
                cy.get('.fav-city__block span').should('have.text', name.text());
                cy.reload();
                cy.get('.fav-city__block span').should('have.text', name.text());
                expect(localStorage.getItem('favCity')).equal(name.text());
            });
        });
    });

    it('User adds 2 cities into Favorite list', () => {
        let city = [data.city[0], data.city[1]];
        addCity(0, data.city[0]);
        cy.get('#city').clear();
        addCity(1, data.city[1]);
        cy.reload();
        cy.get('.fav-city__block span').each(el => cy.wrap(el).should('be.visible'));
    });

    it('User get weather data via Favorite list', () => {
        let city = randomCity();
        cy.intercept(`http://127.0.0.1:3000/get_data?city=${city}`).as('getRes');
        localStorage.setItem('favCity', city);
        cy.reload();
        cy.get('.fav-city__block span').click({force: true});
        cy.wait('@getRes').then(() => {
            cy.get('.city').should('have.text', city);
        });
    });

    it('User deletes one city', () => {
        let city = [data.city[0], data.city[1], data.city[2]];
        let random = Math.floor(Math.random() * city.length);
        setStorage(city);
        cy.get('.fav-city__block button').eq(random).click();
        cy.get('.fav-city__block span').should('have.length', 2);
        cy.reload();
        cy.get('.fav-city__block span').should('have.length', 2);
    });

    it('User deletes the last city', () => {
        let city = [data.city[0]];
        setStorage(city);
        cy.get('.fav-city__block button').eq(0).click();
        cy.reload().then(() => expect(localStorage.getItem('favCity')).not.exist);
        cy.get('.fav-main').should('have.css', 'display', 'none');
        
    });

    //Negative scenarios
    it('[Negative] User tries to add already exist city', () => {
        let city = randomCity();
        cy.intercept(`http://127.0.0.1:3000/get_data?city=${city}`).as('getRes');
        setStorage(city);
        cy.chooseCity(city);
        cy.wait('@getRes').then(() => {
            cy.get('.add-fav').click({force: true});
            cy.get('.fav-city__block span').should('have.length', 1);
            cy.reload();
            cy.get('.fav-city__block span').should('have.length', 1);
        });       
    });

    function addCity(item, city) {
        cy.intercept(`http://127.0.0.1:3000/get_data?city=${city}`).as('getRes');
        cy.chooseCity(city);
        cy.wait('@getRes').then(() => {
            cy.get('.add-fav').click({force: true});
            cy.get('.city').then(name => {
                cy.get('.fav-city__block span').eq(item).should('have.text', name.text());
            });    
        });
    }

    function setStorage(city) {
        localStorage.setItem('favCity', city);
        cy.reload();
    }
});