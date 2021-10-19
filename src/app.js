const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../public'), {
    extensions: ['html']
}));

const getWeatherData = require('./weather_data');

app.get('/get_data', (req, res) => {
    try {
        getWeatherData(req.query.city, data => res.status(200).send(data));
    } catch(err) {
        res.status(500).send({code: 500, message:'server-error'});
    }
});

app.listen(port, () => console.log(`Server is running on ${port} port`));


