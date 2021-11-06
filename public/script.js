const city = document.querySelector('.city');
const weatherData = document.querySelectorAll('.others-item span');
const weatherTemp = document.querySelector('.weather-temp');
const windDirection = document.querySelector('.wind-direction');
const sunData = document.querySelectorAll('.sun-wrap>span');
const formMain = document.querySelector('form');
const errWrap = document.querySelector('.error-wrap');
const loader = document.querySelector('.loader');

formMain.addEventListener('submit', (e) => {
    const inputCity = document.querySelector('input');
    e.preventDefault();

    if (inputCity.value !== '') {
        errWrap.style.display = 'none';
        getData(inputCity.value);
    } else {
        showError('Please type your location', 'img/400.png');
    }
});

getData('Dnipro');
async function getData(cityValue) {
    loader.style.display = 'block';
    const res = await fetch(`/get_data?city=${cityValue}`);
    const data = await res.json();

    loader.style.display = 'none';
    if (data.code === 404) {
        showError('City was not found', 'img/400.png');
    } else if (data.code === 400 && data.message === 'non-english chars') {
        showError('Only English chars can be put', 'img/400.png');
    } else if (data.code === 500) {
        showError('Oops, something went wrong. Please try again later', 'img/500.png');
    } else {
        fillData(data);
    }
}

function fillData(data) {
    city.textContent = data.city;
    weatherData[0].textContent = `${data.humidity} %`;
    weatherData[1].textContent = `${data.windSpeed} m/s`;
    weatherTemp.innerHTML = `${data.temp}<span>&#8451;</span>`
    sunData[0].textContent = data.sunrise;
    sunData[1].textContent = data.sunset;
    windDirection.style.transform = `translateY(-40%) rotate(${data.windDeg -180}deg)`;
    setIcon(data.weather, data.dayTime);
}

function setIcon(weather, dayTime) {
    const icon = document.querySelector('.icon-weather');
    if (weather === 'Clear' && dayTime === 'day') {
        icon.style.backgroundImage = 'url(img/sunny.svg)'; 
    } else if (weather === 'Clear' && dayTime === 'night') {
        icon.style.backgroundImage = 'url(img/moon_clear.svg)'; 
    } else if (weather === 'Clouds' || weather === 'Mist') {
        icon.style.backgroundImage = 'url(img/cloudy.svg)'; 
    } else if (weather === 'Rain') {
        icon.style.backgroundImage = 'url(img/rainy.svg)'; 
    } else if (weather === 'Snow') {
        icon.style.backgroundImage = 'url(img/snowy.svg)'; 
    } else if ((weather !== 'Clear' || weather !== 'Clouds' || weather !== 'Rain') && dayTime === 'night') {
        icon.style.backgroundImage = 'url(img/moon_cloudy.svg)'; 
    } else if ((weather !== 'Clear' || weather !== 'Clouds' || weather !== 'Rain') && dayTime === 'day') {
        icon.style.backgroundImage = 'url(img/partly-cloudy.svg)'; 
    } else {
        icon.style.backgroundImage = 'url(img/cloudy.svg)';
    }
}

function showError(text, img, error) {
    errWrap.style.display = 'block';
    document.querySelector('.error-wrap h3').textContent = text;
    document.querySelector('.error-wrap img').src = img;
}




