
const request = require('request')

const geoCode = (address, callback) =>{
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FtYml0MDA3IiwiYSI6ImNsMWhyczZxZzA3Y3AzbGxkNDZiN3lha3UifQ.oAigroK7qo6-KhuDaqrHZQ&limit=1'

    request({url: geoCodeUrl, json: true}, (error, response) => {
        if(error){
            callback("Unable to connect to the internet", undefined)
        }else if(response.body.features.length === 0){
            callback("Unable to find the Location. Try another search", undefined)
        }else{
            const latitude = response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
            const location = response.body.features[0].place_name
            callback(undefined, {latitude, longitude, location})
        }
    })
}


const forecast = (lat, lng, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=27719f4544835f127909b4fbfed29e8d&query=' + lat +',' + lng

    console.log(url)
    request({url : url, json: true}, (error, response) => {
            if(error){
                callback("Unable to get the response from URL", undefined)
            }else if(response.body.error){
                callback("Unable to find location", undefined)
            }else{
                callback( undefined,'It is currently '+response.body.current.temperature+' degree celcius out there & ' + response.body.current.weather_descriptions + ' on ' + response.body.current.observation_time + '. There is ' +response.body.current.precip+ '% chances of rain')
            }
        })
    }
module.exports = {
    geoCode : geoCode,
    forecast : forecast
}
