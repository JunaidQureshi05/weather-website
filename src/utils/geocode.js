const request = require('request');
const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoianVuYWlkcXVyZXNoaTAwNyIsImEiOiJja2Q3MXJ6NmIwYzU3MnF0Z2k2dzM3Y3NmIn0.ECgO7Qquqj9CIMgYMJ-INA&limit=1  ';
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect locatin services !', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find location.Try another search', undefined);
    } else {
      const [longitude, latitude] = response.body.features[0].center;
      const { place_name } = response.body.features[0];
      callback(undefined, {
        latitude: latitude,
        longitude: longitude,
        location: place_name,
      });
    }
  });
};

module.exports = geocode;
