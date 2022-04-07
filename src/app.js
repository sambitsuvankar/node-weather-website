const path = require('path')
const express = require('express')
const hbs = require('hbs')
const utils = require('./utils/geocode')

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public')  // Derfine paths for Express config.


// Setup handlebars engine and views location in express server.
app.set('view engine', 'hbs')

// Customizing the 'view' directory
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('views', viewsPath)  // After changing the name of 'views' folder to 'templates' here we have addressed the views path to 'views'

hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))  //http://localhost:3000/index.html  => this will show index.html file to the browser

// app.get('', (req,res) => {
//     res.send("<h1>Hello Express!</h1>")
// })

app.get('', (req, res) => {
    res.render('index', {   // WE use res.render to render the pages from 'view' directory through handlebar
        title: "Weather",
        place: 'bengaluru',
        name: 'Sambit suvankar'
    })
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Sambit',
//         age : 25
//     },{
//         name: 'Rajat',
//         age : 16
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About this page</h1>')
// })

app.get('/about', (req, res) => {
    res.render('about',{
        name: 'Sambit',
        place: 'bengaluru',
        title: "About"
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        message : 'If you need help then call me',
        name: "mahesh",
        title : 'Help'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){

        res.send({
            error: "You must provide the address"
        })
    }else{
        // here we send the location name and it returns us the latitude and longitude of that location
        utils.geoCode(req.query.address, (error, response)=> { 
            if(error){
                return res.send({error})
            }
            
        // here we send the lat, lng and this returns us the weather information
            utils.forecast(response.latitude, response.longitude, (error, data)=> {
                if(error){
                    return res.send({error : error})
                }
                res.send({
                    data : data,
                    location : response.location,
                    address :req.query.address
                })
                
            })
            
        })

        // res.send({
        //     address: req.query.address,
        // })

    }
})

app.get('/products',(req,res) => {
    console.log(req.query)  // hat we provide as a query string after the url will show in the terminal as 'req.query'

    // If we must need to provide one perticular query string in the URL then we shoul do as below 
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res) => {   // This has to be on the last after all routes are being declared
    res.send("Help item not found")
})

app.get('*',(req,res) => {   // This has to be on the last after all routes are being declared
    res.render('404',{
        errorMessage: "Page not found!",
        name: "Sambit",
        title: '404'
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})


// To make the nodemon server listen to each file changes in ".js" as well as ".hbs" file extention we need to start the server with this command ------> nodemon src/app.js -e js,hbs


// partials - partials can be used through out our application to make it easy to render the same thing over and over again