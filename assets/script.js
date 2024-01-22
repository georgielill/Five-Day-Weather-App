// api key
const apiKey = 'f7d34248b47264a3f6da9b533f15ac3a';

// target search
let searchButton = document.getElementById('search-button');

searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  let cityName = document.getElementById("search-input").value.trim();
  //gets city name inputted by user
  document.getElementById("search-input").
  //clears city name now it's been stored in cityName variable
  value = "";

  createNewButton(cityName);
  todayForecast(cityName);
  addToStorage(cityName);
});

//current weather function
function todayForecast(cityName) {
  let queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&weather&limit=5&appid=${apiKey}`
}

//fetch to get latitude and longitude

fetch(queryURL)
.then(function (response) {
  return response.json();
})
.then(function (data)) {
  let latitude = data[0].lat;
  let longitude = data[0].lon;
  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=f7d34248b47264a3f6da9b533f15ac3a&units=metric'`
}

// fetch to get 5 day forecast

fetch(forecastURL)
.then(function (response) {
  return response.json();
}) 
.then(function(data) {
  // Target HTML to dynamically update data
  const cityDisplay = document.getElementById('today');
  cityDisplay.className = "card d-flex";
  cityDisplay.innerHTML = '';
  let cityDisplayHeading = document.createElement("h2");
  cityDisplayHeading.textContent = 
})

// let searchInputEl = document.querySelector('#search-input');

// let currentWeatherDiv = document.querySelector(".current-weather");
// let daysForecastDiv = document.querySelector(".days-forecast");


fetch('https://api.openweathermap.org/data/2.5/weather?lat=51.5072&lon=0.1276&appid=f7d34248b47264a3f6da9b533f15ac3a&units=metric')
  .then(response => response.json())
  .then(data => console.log(data))



