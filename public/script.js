const form = document.querySelector('form');
const input = document.querySelector('input');
const button = document.querySelector('button');
const div = document.querySelector('div');
const i = document.querySelector('i');
const b = document.querySelector('b');
const weatherData = document.querySelectorAll('span');

getData('paris');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getData(input.value);
});  

async function getData(city) {
    loadData(div, i);
    const res = await fetch(`/getWeatherData?city=${city.toLocaleLowerCase()}`);
    const data = await res.json();
    
    if (data.code === 404) {
        i.innerText = data.message;
        return;
    } else if (data.code === 400) {
        i.innerText = data.message;
        return;
    }
    else {
        putData(data.city, data.temp, data.humidity, data.description)
    }
}

function putData(city, temp, hum, weather) {
    div.style.display = 'block';
    i.style.display = 'none';
    b.textContent = city;
    weatherData[0].innerHTML = `<span>Temperature: ${temp}&#8451;</span>`;
    weatherData[1].textContent = `Humidity: ${hum}%`;
    weatherData[2].textContent = `Weather: ${weather}`;
}

function loadData(data, loader) {
    loader.inner = 'Loading...';
    data.style.display = 'none';
    loader.style.display = 'block';
}