const path = require('path');
const express = require('express');
const request = require('request');
const getWeather = require('./getWeather');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../public'), {
    extensions: ['html']
}));

app.get('/getWeatherData', (req, res) => {
    getWeather(req.query.city, (err, data) => {
        if(err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});