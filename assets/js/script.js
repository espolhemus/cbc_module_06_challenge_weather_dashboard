var searchFormEl = document.querySelector('#search-form');
var API_key = "082ccd32fbf466c90e98e887c8b8fd7d"
var cityName
var cityLat
var cityLon
var cityTimeZone

// At page load, call the searchHistoryArray[] and display on the index.html
document.addEventListener('DOMContentLoaded', function() {
  // Retrieve data from localStorage
  // const data = localStorage.getItem('myData');
  var searchHistoryList = document.getElementById("searchHistoryList")
  var searchHistoryArray = JSON.parse(localStorage.getItem('searchHistory'))

  // Check if data exists
  if (searchHistoryArray !== null) {
    // Loop through arary
    for (var i = 0; i < searchHistoryArray.length; i++) {
    // Update HTML element with the retrieved data

      var searchHistoryListItem = document.createElement("li");
      console.log(searchHistoryArray[i])
      searchHistoryListItem.textContent = searchHistoryArray[i];
      searchHistoryList.appendChild(searchHistoryListItem);
    }
  }
});

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var cityName = document.querySelector('#search-input').value;
  
    if (!cityName) {
      console.error('Please enter a valid city name');
      return;
    }
  
    // Call next function
  storeHistory(cityName)
}

// function to append cityName to array and storing in localstorage

function storeHistory(cityName){
  // Retrieve existing array from localStorage
  var searchHistoryArray = JSON.parse(localStorage.getItem('searchHistory'));

  // Check if the retrieved value is null or undefined
  if (!searchHistoryArray) {
    searchHistoryArray = [];
  }

  // Append a new city to the array
  searchHistoryArray.push(cityName);
  console.log(searchHistoryArray)

  // Save the updated array back to localStorage
  localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArray));

  // Call next function
  getCoordinates(cityName)
}

// receive cityName and generate API call to obtain lat and lon coordinates
function getCoordinates(cityName) {
  var geocodingURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + API_key;
  
  fetch(geocodingURL)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        cityLat = (data[0].lat)
        cityLon = (data[0].lon)
        console.log('Name and Lat and Long \n----------');
        {
            console.log(data[0].name);
            console.log(data[0].lat);
            console.log(data[0].lon);
            console.log(cityLat);
            console.log(cityLon);
            console.log(data)
        }
  getCurrentConditions(cityLat, cityLon) 
})
}

function getCurrentConditions(cityLat, cityLon){
  var currentConditionsURL = "http://api.openweathermap.org/data/3.0/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude=minutely,hourly,daily,alerts" + "&appid=" + API_key + "&units=imperial"
  console.log(currentConditionsURL)
  console.log (cityLat, cityLon)
  fetch(currentConditionsURL)
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    // Handle the JSON data
    console.log(data);
    // Do further processing or manipulation of the data
    // for (let i = 0; i < 40; i += 8) {
        console.log (data.current.dt);
        console.log (data.timezone_offset)
        var cityTimeZone = (data.timezone)
        console.log(data.timezone)
        console.log(cityTimeZone)
        console.log (data.current.temp)
        console.log (data.current.wind_speed);
        console.log (data.current.humidity);
        console.log (data.current.weather[0].main);
        console.log (data.current.weather[0].icon);
    // }
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error(error);
  });  

  getForecast(cityLat, cityLon, cityTimeZone)
}


// recieve results from geocoding API and generate new query
function getForecast(cityLat, cityLon, cityTimeZone){
  var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + API_key + "&units=imperial"
  console.log(forecastURL)
  console.log (cityLat, cityLon)
  fetch(forecastURL)
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    // Handle the JSON data
    console.log(data);
    // Do further processing or manipulation of the data
    for (let i = 0; i < 40; i += 8) {
        console.log (data.list[i].dt_txt);
        console.log (data.city.timezone);
        console.log (data.list[i].weather[0].main)
        console.log (data.list[i].weather[0].icon)
        var conditionsIcon = (data.list[i].weather[0].icon)
        console.log (data.list[i].main.temp);
        console.log (data.list[i].wind.speed);
        console.log (data.list[i].main.humidity);
        console.log(i);
    }
    
    forecastDateTime  = (data.list[0].dt_txt)
    forecastConditionsIconURL = `https://openweathermap.org/img/wn/${conditionsIcon}.png`
    forecastTemp = (data.list[0].main.temp);
    forecastWind = (data.list[0].wind.speed);
    forecastHumidity = (data.list[0].main.humidity);

       
    // format Date and Time
    const date = new Date(forecastDateTime)
    const dateOptions = { dateStyle: 'long', timeZone: cityTimeZone} ;
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);
    console.log(formattedDate);

    // Select the HTML elements
    var dateElement = document.getElementById("day01Date")
    var conditionsIconElement = document.getElementById("day01Icon")
    var tempElement = document.getElementById("day01Temp");
    var windElement = document.getElementById("day01Wind");
    var humidityElement = document.getElementById("day01Humidity");

//     // Get the image element
// const image = document.getElementById('myImage');

// // Dynamically set the src URL
// const imageUrl = 'https://example.com/my-image.jpg';
// image.setAttribute('src', imageUrl);

// Assign the data values to the HTML elements
dateElement.innerHTML = "The forecast for " +formattedDate + " is:";
conditionsIconElement.setAttribute('src', forecastConditionsIconURL);
tempElement.innerHTML = "The temperature will be: " +forecastTemp + " degrees";
windElement.innerHTML = "The wind speed will be: " +forecastWind + " MPH";
humidityElement.innerHTML = "The humidity will be: " +forecastHumidity + "%";

  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error(error);
  });
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

// to do
// X API call for current day forecast
// HTML cards
// formatting/CSS
// construct URL for images https://openweathermap.org/img/wn/{val}@2x.png
// change the way localstorage is invoked so that history is populated at time of page load, rather than on submit
// check the array to see if a value already exists before adding duplicative city to search history list
