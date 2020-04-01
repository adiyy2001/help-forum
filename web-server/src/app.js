// weather app files
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const path = require('path')
const port = process.env.PORT || 3000
// set express
const express = require('express')
const app = express()

const hbs = require('hbs')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Adrian Turbinski'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Adrian Turbinski'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        helpText: 'This is some helpful text.',
        name: 'Adrian Turbinski'
    })
})

app.get('/help/*', (req, res) => {
    res.send('Not Found article')
})

app.get('/weather', (req, res) => {
    if (!req.query.address) res.send({ 'error': 'provide an address' })

    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
        if (err) res.send({ err })

        forecast(latitude, longitude, (err, forecastData) => {
            if (err) res.send({ err })

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not Found',
        helpText: 'Error page',
        errorMessage: 'Error 404'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})