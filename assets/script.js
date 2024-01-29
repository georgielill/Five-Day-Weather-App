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
  const existingButton = Array.from(searchHistory.querySelectorAll('button[data-city]')).find(button => { 
    return button.dataset.city.toLowerCase() === cityNameLower;
  });
  
  if (!existingButton) {
    const historyItem = document.createElement('button');
    historyItem.textContent = cityName;
    historyItem.classList.add('search-history-item');
    historyItem.dataset.city = cityName;
    historyItem.addEventListener('click', function () {
        getWeather(cityName);
    });
    searchHistory.prepend(historyItem); // Add new search history item at the beginning
  }
}