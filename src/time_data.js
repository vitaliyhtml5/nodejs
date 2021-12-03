const request = require('request');

const getTimeData = (cityValue, callback) => {
    const urlReqTime = `https://api.ipgeolocation.io/astronomy?apiKey=abd6fe44dc664d66903bda88f8a7dbee&location=${cityValue}'`;
    request({url: urlReqTime, json: true}, (errDataTime, resDataTime) => {
        try {
            const timeData = [resDataTime.body.current_time,resDataTime.body.sunrise,resDataTime.body.sunset];
            const localTime = +getSeconds(timeData[0]);
            const sunRiseTime = +getSeconds(timeData[1]);
            const sunSetTime = +getSeconds(timeData[2]);
            let dayTime = '';

            if (localTime < sunRiseTime || localTime > sunSetTime) {
                dayTime ='night';
            } else {
                dayTime ='day';
            }
            callback({
                sunrise: timeData[1],
                sunset: timeData[2],
                day_time: dayTime
            });
        } catch(err) {
            callback({
                sunrise: '-:-',
                sunset: '-:-',
                day_time: 'day'
            });
        }
    });
};     

function getSeconds(time) {
    let timeArr = time.split(':')
    return (timeArr[0]*60) + timeArr[1];
}

module.exports = getTimeData;
