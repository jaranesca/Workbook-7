"use strict";

const cities = [
    { name: "Benbrook, TX", latitude: 32.6732, longitude: -97.4606 },
    { name: "New York, NY", latitude: 40.7128, longitude: -74.0060 },
    { name: "Los Angeles, CA", latitude: 34.0522, longitude: -118.2437 },
    { name: "Chicago, IL", latitude: 41.8781, longitude: -87.6298 },
    { name: "Houston, TX", latitude: 29.7604, longitude: -95.3698 }
];

document.addEventListener('DOMContentLoaded', () => {
    const cityDropdown = document.getElementById('city-dropdown');
    const weatherContainer = document.getElementById('weather-container');
    const locationInfo = document.getElementById('location-info');

    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.name;
        option.textContent = city.name;
        cityDropdown.appendChild(option);
    });

    cityDropdown.addEventListener('change', async () => {
        const selectedCity = cities.find(city => city.name === cityDropdown.value);
        if (selectedCity) {
            locationInfo.innerHTML = `
                <p>Latitude: ${selectedCity.latitude}</p>
                <p>Longitude: ${selectedCity.longitude}</p>
            `;
            const stationLookupUrl = `https://api.weather.gov/points/${selectedCity.latitude},${selectedCity.longitude}`;
            try {
                const response = await fetch(stationLookupUrl);
                const data = await response.json();
                const weatherUrl = data.properties.forecast;
                getWeather(weatherUrl);
            } catch (error) {
                console.error('Error fetching weather station data:', error);
            }
        } else {
            locationInfo.innerHTML = '';
        }
    });

    async function getWeather(weatherUrl) {
        try {
            const response = await fetch(weatherUrl);
            const data = await response.json();
            const forecastArray = data.properties.periods;
            displayWeather(forecastArray);
        } catch (error) {
            console.error('Error fetching weather forecast:', error);
        }
    }

    function displayWeather(forecastArray) {
        weatherContainer.innerHTML = '';
        forecastArray.forEach((forecast, i) => {
            const periodDiv = document.createElement('div');
            periodDiv.classList.add('weather-period');
            periodDiv.innerHTML = `
                <h2 class="period-name">${forecastArray[i].name}</h2>
                <p class="label">Temperature: ${"Temperature " + forecastArray[i].temperature + " " + forecastArray[i].temperatureUnit}</p>
                <p class="label">Winds: ${"Winds " + forecastArray[i].windDirection + " " + forecastArray[i].windSpeed}</p>
                <p class="short-forecast">${forecastArray[i].shortForecast}</p>
            `;
            weatherContainer.appendChild(periodDiv);
        });
    }
});
