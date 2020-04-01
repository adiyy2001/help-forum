const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const API_KEY = '8c2b9c29e812e95f1e6336ac37532dcd';
    const url = `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`;

    request({ url, json: true }, (err, { body }) => {
        if (err) callback('Unable to connect to weather service!', undefined);
        else if (body.error) callback('Unable to find location', undefined);
        else {
            const weatherDescription = body.daily.data[0].summary;
            const precipProbability = body.currently.precipProbability;
            const temperature = body.currently.temperature;
            callback(undefined,
                `${weatherDescription} It is currently ${temperature} degress out. There is a ${precipProbability} % chance of rain.`
            );
        };
    });
};

module.exports = forecast;