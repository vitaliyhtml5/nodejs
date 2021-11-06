Cypress.Commands.add('getData', city => {
    cy.request({
        method: 'GET',
        url: `/get_data?city=${city}`,
        failOnStatusCode: false,
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res => res);
});

Cypress.Commands.add('getIconPath', (weather, dayTime) => {
    if (weather === 'Clear' && dayTime === 'day') return 'sunny.svg'; 
    else if (weather === 'Clear' && dayTime === 'night') return 'moon_clear.svg'; 
    else if (weather === 'Clouds' || weather === 'Mist') return 'cloudy.svg'; 
    else if (weather === 'Rain') return 'rainy.svg'; 
    else if (weather === 'Snow') return 'snowy.svg'; 
    else if ((weather !== 'Clear' || weather !== 'Clouds' || weather !== 'Rain') && dayTime === 'night') return 'moon_cloudy.svg'; 
    else if ((weather !== 'Clear' || weather !== 'Clouds' || weather !== 'Rain') && dayTime === 'day')  return 'partly-cloudy.svg)'; 
    else return 'cloudy.svg';
});