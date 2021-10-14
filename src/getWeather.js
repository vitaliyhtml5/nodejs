const request = require('request');

const getWeather = (city, callback) => {
     const urlReq = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bfc01abb9d07f1618283f28a3e24c038`;
    request({url: urlReq, json: true}, (errData, resData) => {
        if (resData.statusCode === 404) {
            callback({code: 404, message: 'Please put a correct name of city'}, undefined);
        } else if (resData.statusCode === 400) {
            callback({code: 400, message: 'Please type a city'}, undefined);
        } else {
            callback(undefined, resData);
        }
    });
}
module.exports = getWeather;