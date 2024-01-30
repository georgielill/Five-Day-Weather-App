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
  const cityNameLower = cityName.toLowerCase();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameLower}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            addToSearchHistory(cityNameLower);
        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
            currentWeather.innerHTML = 'Error fetching current weather';
        });

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityNameLower}&appid=${apiKey}&units=metric`)
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
        <p>Wind: ${windSpeed} KPH</p>
        <p>Humidity: ${humidity}%</p>
        
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
            <p>Wind: ${speed} KPH</p>
            <p>Humidity: ${humidity}%</p> 
        `;
        forecastContainer.appendChild(forecastElement);
    }
}

function addToSearchHistory(cityNameLower) {
  console.log("City Name Lower: ", cityNameLower);
  const existingButton = Array.from(searchHistory.querySelectorAll('button[data-city]')).find(button => { 
    return button.dataset.city.toLowerCase() === cityNameLower;
  });
  
  if (!existingButton) {
    const historyItem = document.createElement('button');
    historyItem.textContent = cityNameLower;
    historyItem.classList.add('search-history-item', 'search-button');
    historyItem.dataset.city = cityNameLower;
    historyItem.addEventListener('click', function () {
        getWeather(cityNameLower);
    });
    searchHistory.prepend(historyItem); // Add new search history item at the beginning

    addToLocalStorage(cityNameLower);
  }
}

function addToLocalStorage(cityNameLower) {
  let cities = JSON.parse(localStorage.getItem('cities')) || [];
  console.log("Cities from Local Storage: ", cities);

  cities.push(cityNameLower);
  localStorage.setItem('cities', JSON.stringify(cities));
}