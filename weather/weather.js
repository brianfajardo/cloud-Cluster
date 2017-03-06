const request = require('request')

const getWeather = (lat, lng, callback) => {
    request({ /* options object */
        url: `https://api.darksky.net/forecast/7dee74c3f88dae416ebdb73fd42af632/${lat},${lng}`,
        json: true
    }, (error, response, body) => { /* callback function */
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
        } else {
            callback('Unable to fetch weather from forecast.io.')
        }
    })
}

module.exports = {
    getWeather
}