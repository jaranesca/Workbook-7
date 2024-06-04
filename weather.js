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


    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.name;
        option.textContent = city.name;
        cityDropdown.appendChild(option);
    });

    cityDropdown.addEventListener('change', async () => {
        const selectedCity = cities.find(city => city.name === cityDropdown.value);
        if (selectedCity) {
            const stationLookupUrl = `https://api.weather.gov/points/${selectedCity.latitude},${selectedCity.longitude}`;
            try {
                const response = await fetch(stationLookupUrl);
                const data = await response.json();
                const weatherUrl = data.properties.forecast;
                getWeather(weatherUrl);
            } catch (error) {
                console.error('Error fetching weather station data:', error);
            }
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
        forecastArray.forEach(period => {
            const periodDiv = document.createElement('div');
            periodDiv.classList.add('weather-period');
            periodDiv.innerHTML = `
                <h2 class="period-name">${period.name}</h2>
                <p class="label">Temperature: ${period.temperature} ${period.temperatureUnit}</p>
                <p class="label">Winds: ${period.windDirection} ${period.windSpeed}</p>
                <p class="short-forecast">${period.shortForecast}</p>
            `;
            weatherContainer.appendChild(periodDiv);
        });
    }
});
