const yargs = require('yargs')

const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true
        },
    })
    .help()
    .alias('help', 'h')
    .argv

const encodedAddress = encodeURIComponent(argv.address)

// /* It's a common pattern for the first argument to be an error and the second argument to be a success result.
// *  That means either the first or the second argument will be defined, but not both.
// *  The callback knows there is an error because the first argument is defined. */

geocode.geocodeAddress(encodedAddress, (error, results) => {
    if (error) {
        console.log(error)
    } else {
        console.log(results.address)
        weather.getWeather(results.latitude, results.longitude, (error, weatherResults) => {
            if (error) {
                console.log(error)
            } else {
                console.log(`It's currently ${weatherResults.temperature} F. But it feels like ${weatherResults.apparentTemperature} F.`)
            }
        });
    }
})

