const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const publicPath = path.join(__dirname, '../public');

const app = express();
app.set('view engine', 'hbs');
app.set('views', viewPath);
app.use(express.static(publicPath));
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ihor',
        year: '2024'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Ted',
        year: '2025'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'This is the help page.',
        name: 'Edward',
        year: '2026'
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
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
                address
            });
        });
    });
});

app.get('/help/*sss', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ihor',
        year: '2024',
        errorMessage: 'Help article not found'
    });
});

app.get('/*sss', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ihor',
        year: '2024',
        errorMessage: '404 Page Not Found'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});