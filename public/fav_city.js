import {getData} from './script.js';

const favMain = document.querySelector('.fav-main');
const addBtn = document.querySelector('.add-fav');
let favMainList = document.querySelector('.fav-cities');
let cityArr = [];

function getFavCities() {
    if (localStorage.getItem('favCity') !== null) {
        showCity();
        cityArr = localStorage.getItem('favCity').split(',');
    } else {
        getEmptyCity();
    }
}

//Show city
function showCity() {
    favMain.style.display = 'block';
    const listCityArr = localStorage.getItem('favCity').split(',');
    favMainList.innerHTML = '';
    for(let i = 0; i < listCityArr.length; i++) {
        favMainList.innerHTML += `<div class="fav-city__block"><button></button><span>${listCityArr[i]}</span></div>`;
    }
    removeCity();

    //Get weather by favorite city
    document.querySelectorAll('.fav-cities span').forEach(el => {
        el.onclick = () => getData(el.textContent);
    });
}

//Add city
addBtn.addEventListener('click', addCity);
function addCity() {  
    const city =  document.querySelector('.city').textContent;
    let cityList = localStorage.getItem('favCity');

    if (cityList !== null) {
        cityArr = cityList.split(',');
    }
    
    if (cityArr.includes(city) === true) {
        return;
    } else {
        cityArr.push(city);
        localStorage.setItem('favCity', cityArr);
        showCity();
    }
}

//Remove city
function removeCity() {
    document.querySelectorAll('.fav-cities button').forEach((el, index) => {
        const cityItem = document.querySelectorAll('.fav-city__block');
        el.onclick = (e) => {
            e.preventDefault();
            cityItem[index].remove();
            cityArr.splice(index, 1);

            if (cityArr.length > 0) {
                localStorage.setItem('favCity', cityArr);
            } else {
                localStorage.removeItem('favCity');
                getEmptyCity();
            }
        }
    });
}

function getEmptyCity() {
    favMain.style.display = 'none';
}

export {getFavCities};