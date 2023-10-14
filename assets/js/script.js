var searchFormEl = document.querySelector('#search-form');

var API_key = "082ccd32fbf466c90e98e887c8b8fd7d"
var cityName
var cityLat
var cityLon

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var cityName = document.querySelector('#search-input').value;
  
    if (!cityName) {
      console.error('Please enter a valid city name');
      return;
    }

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
        }
        getForecast(cityLat, cityLon) 
})
  
  // console.log(cityLat);
  // console.log(cityLon)
  // getForecast(cityLat, cityLon)
}

// recieve results from geocoding API and generate new query
function getForecast(cityLat, cityLon){
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
        console.log (data.list[i].main.temp);
        console.log (data.list[i].weather[0].main);
        console.log (data.list[i].weather[0].description);
        console.log(i);
    }
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error(error);
  });
}
  

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
