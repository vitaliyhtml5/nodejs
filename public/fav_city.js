import {getData} from './script.js';

const favMain = document.querySelector('.fav-main');
const addBtn = document.querySelector('.add-fav');
let favMainList = document.querySelector('.fav-main ul');
let cityArr = [];
let cityList;
let getCityStorage = () => localStorage.getItem('favCity');

function getFavCities() {
    if (getCityStorage() !== null) {
        showCity();
    } else {
        getEmptyCity();
    }
}

//Show city
function showCity() {
    favMain.style.display = 'block';
    const listCityArr = getCityStorage().split(',');
    favMainList.innerHTML = '';
    for(let i = 0; i < listCityArr.length; i++) {
        favMainList.innerHTML += `<li>${listCityArr[i]}<button></button></li>`;
    }
    removeCity();

    //Get weather by favorite city
    document.querySelectorAll('.fav-main ul li').forEach(el => {
        el.onclick = () => getData(el.textContent);
    });
}

//Add city
addBtn.addEventListener('click', addCity);
function addCity() {  
    const city =  document.querySelector('.city').textContent;
    let cityList = getCityStorage();

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
    document.querySelectorAll('.fav-main button').forEach((el, index) => {
        const cityItem = document.querySelectorAll('.fav-main ul li');
        el.onclick = (e) => {
            e.preventDefault();
            if (cityItem.length === 1) {
                localStorage.removeItem('favCity');
                favMainList.innerHTML = '';
                cityArr = [];
                getEmptyCity();
            } else if (cityItem.length > 1) {
                cityItem[index].style.display = 'none';
                cityArr.splice(index, 1);
                localStorage.setItem('favCity', cityArr);
                showCity();
            }
        }
    });
}

function getEmptyCity() {
    favMain.style.display = 'none';
}

export {getFavCities};