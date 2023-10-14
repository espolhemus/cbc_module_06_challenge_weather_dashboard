var searchFormEl = document.querySelector('#search-form')

var API_key = "082ccd32fbf466c90e98e887c8b8fd7d"
var cityName
var cityLat
var cityLon

// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + API_key;

// console.log(cityName)
function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    var cityName = document.querySelector('#search-input').value;
  
    if (!cityName) {
      console.error('Please enter a valid city name');
      return;
    }
  
    // var obtainCoordinatesQueryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;
    
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + API_key;
    var forecastURL = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=" + API_key
    // location.assign(queryURL);


    var geocodingURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + API_key;

    fetch(geocodingURL)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var cityLat = (data[0].lat)
        var cityLon = (data[0].lon)
        console.log('Name and Lat and Long \n----------');
        {
            console.log(data[0].name);
            console.log(data[0].lat);
            console.log(data[0].lon);
        }

      var forecastURL = "api.openweathermap.org/data/2.5/forecast?lat=" + "47.6038321" + "lon=" + "-122.330062" + "&appid=" + API_key
      fetch(forecastURL)
      .then(function (response) {
          return response.json();
        })
    });
}
searchFormEl.addEventListener('submit', handleSearchFormSubmit);

// Event listener to listen for button click
// Check for valid input
// Pass request to geocoding API
// Receive response from geocoding API
// Parse LAT and LONG from response JSON object
// Construct request to obtain 5 day forecast
// Receive response from forecast API
// Display results
// Save city to localstorage;