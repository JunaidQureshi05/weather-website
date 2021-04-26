const request = require('request');
const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=2aa329e04171513327c052b5c57aa514&query=' +
    latitude +
    ',' +
    longitude;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect forecast service !', undefined);
    } else if (response.body.error) {
      callback('Unable to find location ,try another search !', undefined);
    } else {
      const { temperature, feelslike, humidity } = response.body.current;
      callback(
        undefined,
        `It is currently ${temperature} degree out.It feels like ${feelslike} degree out.Humidity ${humidity}%`
      );
    }
  });
};

module.exports = forecast;
