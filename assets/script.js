// // api key
// const apiKey = 'f7d34248b47264a3f6da9b533f15ac3a';

// // target search
// let searchButton = document.getElementById('search-button');

// function createNewButton(cityName) {
//   const button = document.createElement('button');
//   button.textContent = cityName;
// }

// searchButton.addEventListener("click", function (e) {
//   e.preventDefault();
//   let cityName = document.getElementById("search-input").value.trim();
//   //gets city name inputted by user
//   document.getElementById("search-input"). value = "";
//   //clears city name now it's been stored in cityName variable
//   createNewButton(cityName);
//   todayForecast(cityName);
//   addToStorage(cityName);
// });

// function addToStorage(cityName) {
//   localStorage.setItem("lastSearchedCity", cityName);
// }

// //current weather function
// function todayForecast(cityName) {
//   let queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&weather&limit=5&appid=${apiKey}`

// //fetch to get latitude and longitude
// fetch(queryURL)
// .then(function (response) {
//   return response.json();
// })
// .then(function (data) {
//   let latitude = data[0].lat;
//   let longitude = data[0].lon;
//   let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=f7d34248b47264a3f6da9b533f15ac3a&units=metric`;

//   return fetch(forecastURL);
// })
// // fetch to get 5 day forecast
// .then(function (response) {
//   return response.json();
// }) 
// .then(function(data) {
//   displayTodayForecast(data.list[0], cityName);
//   displayFiveDayForecast(data, cityName);
// })
// .catch(function(error){
//     console.error(`Error fetching data:`, error);
// });
// }

// function displayTodayForecast(todayData, cityName) {
//   const cityDisplay = document.getElementById('today');
//   cityDisplay.className = "card d-flex";
//   cityDisplay.innerHTML = "";

//   let cityDisplayHeading= document.createElement("h2");
//   cityDisplayHeading.textContent = `${cityName} (${dayjs().format('DD/MM/YYYY')})`;
//   let weatherIconSrc = todayData.weather[0].icon;
//   let weatherIcon = document.createElement('img');
//   weatherIcon.src = `https://openweathermap.org/img/wn/${weatherIconSrc}.png`;
//   cityDisplayHeading.appendChild(weatherIcon);

//   let cityTemp = document.createElement('p');
//   cityTemp.textContent = `Temp: ${parseInt(todayData.main.temp)}°C`;
//   let cityWind = document.createElement('p');
//   cityWind.textContent = `Wind: ${todayData.wind.speed}KPH`;
//   let cityHumidity = document.createElement('p');
//   cityHumidity.textContent = `Humidity: ${todayData.main.humidity}%`;

//   cityHumidity.appendChild(cityDisplayHeading);
//   cityDisplay.appendChild(cityTemp);
//   cityDisplay.appendChild(cityHumidity);

// }

// function displayFiveDayForecast(data, cityName) {
//   const forecastContainer = document.getElementById(`forecast`);
//     forecastContainer.innerHTML = '';
  
//   for (let i = 0; i < data.list.length; i++) {
//     const forecastData = data.list[i];
//     const forecastDate = forecastData.dt_txt;
//     const temperature = forecastData.main.temp;
//     const weatherDescription = forecastData.weather[0].description;

//     const forecastElement = document.createElement('div');
//     forecastElement.classList.add('forecast-day');

//     const dateElement = document.createElement('p');
//     dateElement.textContent = forecastDate;

//     const temperatureElement = document.createElement('p');
//     temperatureElement.textContent = `Temperature: ${temperature}°C`;

//     const descriptionElement = document.createElement('p');
//     descriptionElement.textContent = `Description: ${weatherDescription}`;

//     forecastElement.appendChild(dateElement);
//     forecastElement.appendChild(temperatureElement);
//     forecastElement.appendChild(descriptionElement);

//     forecastContainer.appendChild(forecastElement);
//     }
// }

const apiKey = 'f7d34248b47264a3f6da9b533f15ac3a';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const currentWeather = document.getElementById('current-weather');
const forecastContainer = document.getElementById('forecast');
const searchHistory = document.getElementById('search-history');

searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const cityName = searchInput.value.trim();
    getWeather(cityName);
    searchInput.value = ''; // Clear input field after search
});

function getWeather(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            addToSearchHistory(cityName);
        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
            currentWeather.innerHTML = 'Error fetching current weather';
        });

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
            forecastContainer.innerHTML = 'Error fetching forecast';
        });
}

function displayCurrentWeather(data) {
    const cityName = data.name;
    const date = new Date(data.dt * 1000).toLocaleDateString();
    const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

  
    currentWeather.innerHTML = `
        <h2>${cityName} (${date})</h2>
        <img src="${weatherIcon}" alt="Weather Icon">
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}

function displayForecast(data) {
    forecastContainer.innerHTML = '';

    for (let i = 0; i < data.list.length; i += 8) {
        const forecastData = data.list[i];
        const date = new Date(forecastData.dt * 1000).toLocaleDateString();
        const weatherIcon = `https://openweathermap.org/img/wn/${forecastData.weather[0].icon}.png`;
        const temperature = forecastData.main.temp;
        const humidity = forecastData.main.humidity;
        const speed = forecastData.wind.speed

        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-day');
        forecastElement.innerHTML = `
            <h3>${date}</h3>
            <img src="${weatherIcon}" alt="Weather Icon">
            <p>Temperature: ${temperature}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Speed: ${speed}KPH</p>
        `;
        forecastContainer.appendChild(forecastElement);
    }
}

function addToSearchHistory(cityName) {
    const historyItem = document.createElement('div');
    historyItem.textContent = cityName;
    historyItem.classList.add('search-history-item');
    historyItem.addEventListener('click', function () {
        getWeather(cityName);
    });
    searchHistory.prepend(historyItem); // Add new search history item at the beginning
}