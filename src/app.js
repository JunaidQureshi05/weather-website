const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const PORT = process.env.PORT || 3000;
// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const templateDirectoryPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// Setup handlebars engine views and views location
app.set('view engine', 'hbs');
app.set('views', templateDirectoryPath);
hbs.registerPartials(partialsPath);

// Serve Static files
app.use(express.static(publicDirectoryPath));

// Set routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Junaid Qureshi',
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Junaid Qureshi',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is some helpful text',
    title: 'Help',
    name: 'Junaid Qureshi',
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 404,
    name: 'Junaid Qureshi',
    errorMessage: 'Help article not found',
  });
});
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provied a address',
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});
// 404 page
app.get('*', (req, res) => {
  res.render('404', {
    title: 404,
    name: 'Junaid Qureshi',
    errorMessage: 'Page Not found',
  });
});
app.listen(PORT, () => {
  console.log('server started' + ' ' + PORT);
});
