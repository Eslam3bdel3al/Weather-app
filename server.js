// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 3000;

// Setup Server
app.listen(port, listening);

function listening(){
    console.log('The server is running');
    console.log(`IT's running on localhost: ${port}`);
}

// weather app routes
app.get("/website", getWeatherData);
function getWeatherData(req,res){
    res.send(projectData);
    console.log(projectData);
}

app.post('/website', addWeatherData);
function addWeatherData (req,res){
    projectData.temp = req.body.temp;
    projectData.feel = req.body.feel;
    projectData.date = req.body.date;
}

