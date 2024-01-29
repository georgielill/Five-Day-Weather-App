// api key
const apiKey = 'f7d34248b47264a3f6da9b533f15ac3a';

// target search
let searchButton = document.getElementById('search-button');

function createNewButton(cityName) {
  const button = document.createElement('button');
  button.textContent = cityName;
}

searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  let cityName = document.getElementById("search-input").value.trim();
  //gets city name inputted by user
  document.getElementById("search-input"). value = "";
  //clears city name now it's been stored in cityName variable
  createNewButton(cityName);
  todayForecast(cityName);
  addToStorage(cityName);
});

function addToStorage(cityName) {
  localStorage.setItem("lastSearchedCity", cityName);
}

//current weather function
function todayForecast(cityName) {
  let queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&weather&limit=5&appid=${apiKey}`

//fetch to get latitude and longitude
fetch(queryURL)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  let latitude = data[0].lat;
  let longitude = data[0].lon;
  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=f7d34248b47264a3f6da9b533f15ac3a&units=metric`;

  return fetch(forecastURL);
})
// fetch to get 5 day forecast
.then(function (response) {
  return response.json();
}) 
.then(function(data) {
  displayTodayForecast(data.list[0], cityName);
  displayFiveDayForecast(data, cityName);
})
.catch(function(error){
    console.error(`Error fetching data:`, error);
});
}

function displayTodayForecast(todayData, cityName) {
  const cityDisplay = document.getElementById('today');
  cityDisplay.className = "card d-flex";
  cityDisplay.innerHTML = "";

  let cityDisplayHeading= document.createElement("h2");
  cityDisplayHeading.textContent = `${cityName} (${dayjs().format('DD/MM/YYYY')})`;
  let weatherIconSrc = todayData.weather[0].icon;
  let weatherIcon = document.createElement('img');
  weatherIcon.src = `https://openweathermap.org/img/wn/${weatherIconSrc}.png`;
  cityDisplayHeading.appendChild(weatherIcon);

  let cityTemp = document.createElement('p');
  cityTemp.textContent = `Temp: ${parseInt(todayData.main.temp)}°C`;
  let cityWind = document.createElement('p');
  cityWind.textContent = `Wind: ${todayData.wind.speed}KPH`;
  let cityHumidity = document.createElement('p');
  cityHumidity.textContent = `Humidity: ${todayData.main.humidity}%`;

  cityHumidity.appendChild(cityDisplayHeading);
  cityDisplay.appendChild(cityTemp);
  cityDisplay.appendChild(cityHumidity);

}

function displayFiveDayForecast(data, cityName) {
  const forecastContainer = document.getElementById(`forecast`);
    forecastContainer.innerHTML = '';
  
  for (let i = 0; i < data.list.length; i++) {
    const forecastData = data.list[i];
    const forecastDate = forecastData.dt_txt;
    const temperature = forecastData.main.temp;
    const weatherDescription = forecastData.weather[0].description;

    const forecastElement = document.createElement('div');
    forecastElement.classList.add('forecast-day');

    const dateElement = document.createElement('p');
    dateElement.textContent = forecastDate;

    const temperatureElement = document.createElement('p');
    temperatureElement.textContent = `Temperature: ${temperature}°C`;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = `Description: ${weatherDescription}`;

    forecastElement.appendChild(dateElement);
    forecastElement.appendChild(temperatureElement);
    forecastElement.appendChild(descriptionElement);

    forecastContainer.appendChild(forecastElement);
    }
}
