/*hello reviewer I'm Eslam Mostafa and I wish you a nice day*/

/* Global Variables */
const apiKey = 'bd1e31c52187f872ad36ade21b4ac132';
// record the date 
let d = new Date();
let newDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' +  d.getFullYear();

//add event listener to the button
document.getElementById('generate').addEventListener('click', doAction);

function doAction(){
    const zip = document.getElementById('zip').value;
    
    if (zip === ""){ //validate zip not to be empty
        alert("Please enter zip code");
    } else {
    const userFeeling =  document.getElementById('feelings').value;
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='+zip+'&appid='+apiKey+"&units=metric";

    getWeather(baseURL)
    .then(function(data){
    postData('/website', {temp:data.main.temp, feel: userFeeling, date: newDate});
        })
    .then ( () => updateUI('/website') );
    }
  }
  
  
// async functions

//Get data from the Weather API "OpenWeatherMap.org"
const getWeather = async (url) => {
    const res = await fetch (url);
    try {
        const data = await res.json();
        return data;
        } catch(error){
            console.log("error",error);
        }
    };

//add the data from the API and user inputs to the local server
const postData = async (url = '', data = {}) => {
    const response = await fetch(url,{
                                        method: 'POST',
                                        credentials: 'same-origin',
                                        headers: {'Content-Type': 'application/json',},
                                        body: JSON.stringify(data),
                                    });
    try {
        return;
    } catch(error){
        console.log("error",error);
    }
    };

//Get the data from local server and display it through UI    
const updateUI = async (url) => {
    const request1 = await fetch(url);
    try {
        const finalData = await request1.json();
        document.getElementById('temp').innerHTML =  "Temp: <u>"+ Math.round(finalData.temp) + "&#176;C</u>";
        document.getElementById('content').innerHTML = "You feel: <u>"+finalData.feel + "</u>";
        document.getElementById('date').innerHTML = "Date: <u>"+finalData.date + "</u>";
        } catch(error){
            console.log("error", error);
        }
    };