const request = require('request');

const geocode = (address, callback) => {
    const API_KEY = 'pk.eyJ1IjoiYXNkZmdoenhjIiwiYSI6ImNrN3Jsc3k1aDA3bzUzbXNmem9sNnZkbXUifQ.67GtFtz6ZXjXeqksr4RqLA';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${API_KEY}`;

    request({ url, json: true }, (err, { body } = {}) => {
        if (err) {
            return callback('Unable to connect to location services!', undefined)
        }
        else if (body.features === null) {
            return callback('Unable to find location. Try another search.', undefined)
        }
        else {
            return callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        };
    });
};

module.exports = geocode;