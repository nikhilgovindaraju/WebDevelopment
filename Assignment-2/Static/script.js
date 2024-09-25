document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('form');
    const clearButton= document.getElementById('clearButton');
    const submitButton = document.getElementById('submitButton');
    const checkBox = document.getElementById('checkBox');
    const weatherCard = document.getElementById('weatherCard');
    
    
    const weatherStatusCodes = {
        "1000": { weatherStatus: "Clear, Sunny", img: "/static/images/WeatherSymbolsforWeatherCodes/clear_day.svg" },
        "1100": { weatherStatus: "Mostly Clear", img: "/static/images/WeatherSymbolsforWeatherCodes/mostly_clear_day.svg" },
        "1101": { weatherStatus: "Partly Cloudy", img: "/static/images/WeatherSymbolsforWeatherCodes/partly_cloudy_day.svg" },
        "1102": { weatherStatus: "Mostly Cloudy", img: "/static/images/WeatherSymbolsforWeatherCodes/mostly_cloudy.svg" },
        "1001": { weatherStatus: "Cloudy", img: "/static/images/WeatherSymbolsforWeatherCodes/cloudy.svg" },
        "2000": { weatherStatus: "Fog", img: "/static/images/WeatherSymbolsforWeatherCodes/fog.svg" },
        "2100": { weatherStatus: "Light Fog", img: "/static/images/WeatherSymbolsforWeatherCodes/fog_light.svg" },
        "4000": { weatherStatus: "Drizzle", img: "/static/images/WeatherSymbolsforWeatherCodes/drizzle.svg" },
        "4001": { weatherStatus: "Rain", img: "/static/images/WeatherSymbolsforWeatherCodes/rain.svg" },
        "4200": { weatherStatus: "Light Rain", img: "/static/images/WeatherSymbolsforWeatherCodes/rain_light.svg" },
        "4201": { weatherStatus: "Heavy Rain", img: "/static/images/WeatherSymbolsforWeatherCodes/rain_heavy.svg" },
        "5000": { weatherStatus: "Snow", img: "/static/images/WeatherSymbolsforWeatherCodes/snow.svg" },
        "5001": { weatherStatus: "Flurries", img: "/static/images/WeatherSymbolsforWeatherCodes/flurries.svg" },
        "5100": { weatherStatus: "Light Snow", img: "/static/images/WeatherSymbolsforWeatherCodes/snow_light.svg" },
        "5101": { weatherStatus: "Heavy Snow", img: "/static/images/WeatherSymbolsforWeatherCodes/snow_heavy.svg" },
        "6000": { weatherStatus: "Freezing Drizzle", img: "/static/images/WeatherSymbolsforWeatherCodes/freezing_drizzle.svg" },
        "6001": { weatherStatus: "Freezing Rain", img: "/static/images/WeatherSymbolsforWeatherCodes/freezing_rain.svg" },
        "6200": { weatherStatus: "Light Freezing Rain", img: "/static/images/WeatherSymbolsforWeatherCodes/freezing_rain_light.svg" },
        "6201": { weatherStatus: "Heavy Freezing Rain", img: "/static/images/WeatherSymbolsforWeatherCodes/freezing_rain_heavy.svg" },
        "7000": { weatherStatus: "Ice Pellets", img: "/static/images/WeatherSymbolsforWeatherCodes/ice_pellets.svg" },
        "7101": { weatherStatus: "Heavy Ice Pellets", img: "/static/images/WeatherSymbolsforWeatherCodes/ice_pellets_heavy.svg" },
        "7102": { weatherStatus: "Light Ice Pellets", img: "/static/images/WeatherSymbolsforWeatherCodes/ice_pellets_light.svg" },
        "8000": { weatherStatus: "Thunderstorm", img: "/static/images/WeatherSymbolsforWeatherCodes/tstrom.svg" }
      };
    
    clearButton.addEventListener('click', (e) => {
        e.preventDefault();
        form.reset();
    });
    
    
    checkBox.addEventListener('change', (e) => {
        e.preventDefault();
        const formFields = form.querySelectorAll('input, select, textarea');
        if (checkBox.checked) {
            submitButton.disabled = false;
            formFields.forEach(field => {
                if (field !== checkBox) {
                    field.disabled = true;
                    field.value = '';
                }
            });
            console.log('hello check box checked');
            // getLocation();
        } else {
            submitButton.disabled = true;
            formFields.forEach(field => {
                field.disabled = false;
            });
            validateForm();
        }
    });
    
    form.addEventListener('input', validateForm);
    
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('hi');
        const streetValue = document.getElementById('streetName').value;
        const cityValue = document.getElementById('cityName').value;
        const stateValue = document.getElementById('select-state').value;
    
        console.log('Street:', streetValue);
        console.log('City:', cityValue);
        console.log('State:', stateValue);
        getLocation();
        await getFormattedAddress(streetValue, cityValue, stateValue);
    });
    
    
    
    // function getFormData() {
    //     const street_value = document.getElementById('streetName').value;
    //     const city_value = document.getElementById('cityName').value;
    //     const state_value = document.getElementById('select-state').value;
    
    //     console.log('Street:', street_value);
    //     console.log('City:', city_value);
    //     console.log('State:', state_value);
    // }
    
    async function getLocation() {
        const accessToken = '26239f0f1980e6';  // Your access token
    
        try {
            const response = await fetch(`https://ipinfo.io/json?token=${accessToken}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            // Extract the necessary data
            const [latitude, longitude] = data.loc.split(',');  // Get latitude and longitude from loc
            const city = data.city;  // Get city
            const region = data.region;  // Get region
            const country = data.country;  // Get country
    
            const currentLocation = `${city}, ${region}, ${country}`;  // Construct location string
    
            // Log the results
            console.log('Latitude:', latitude, 'Longitude:', longitude);
            console.log('Current Location:', currentLocation);
    
            // Call the weather function with the coordinates and location
            getWeathercoordinates(latitude, longitude, currentLocation);
        } catch (error) {
            console.error('Error fetching location data:', error);
        }
    }
    
    
    function validateForm() {
        const streetValue = document.getElementById('streetName').value;
        const cityValue = document.getElementById('cityName').value;
        const stateValue = document.getElementById('select-state').value;
    
        if (streetValue && cityValue && stateValue) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }
    
    async function getFormattedAddress(street_value, city_value, state_value) {
        const apiKey = 'AIzaSyDWZuWReQXAFCFu-fTwPb15ThgcQoslQEc'; 
        const address = `${street_value}, ${city_value}, ${state_value}`;
    
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const formattedAddress = data.results[0].formatted_address;
                const latitude = data.results[0].geometry.location.lat;
                const longitude = data.results[0].geometry.location.lng;
    
                console.log('Formatted Address:', formattedAddress);
                console.log('Latitude:', latitude);
                console.log('Longitude:', longitude);
    
                getWeathercoordinates(latitude, longitude,formattedAddress);
            } else {
                console.log('No results found');
            }
        } catch (error) {
            console.error('Error fetching geocode data:', error);
        }
    }
    
    function getWeathercoordinates(latitude, longitude, location) {
    
        const url =`/get_weather?latitude=${latitude}&longitude=${longitude}`;
    
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const cardValues = data.data.timelines[0].intervals[0].values;
            const temperature = cardValues.temperature;
            const humidity = cardValues.humidity;
            const windSpeed = cardValues.windSpeed;
            const pressure= cardValues.pressureSeaLevel;
            const uvIndex = cardValues.uvIndex;
            const cloudCover = cardValues.cloudCover;
            const visibility = cardValues.visibility;
            const weatherCode = cardValues.weatherCode;
    
            console.log("Location:", location);
            console.log("Temperature:", temperature);
            console.log("Humidity:", humidity);
            console.log("Wind Speed:", windSpeed);
            console.log("Pressure:", pressure);
            console.log("UV Index:", uvIndex);
            console.log("Cloud Cover:", cloudCover);
            
    
            displayWeatherData(location, temperature, humidity, windSpeed, pressure, uvIndex, cloudCover,visibility,weatherCode);
            // displayWeatherTable(temperature, humidity, windSpeed, pressure, uvIndex, cloudCover);
            displayWeatherTable(data);
            
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
    }
    
    function displayWeatherData(location, temperature, humidity, windSpeed, pressure, uvIndex, cloudCover,visibility,weatherCode) {
        const weatherInfo = weatherStatusCodes[weatherCode] || { weatherStatus: "Unknown", img: "/static/images/WeatherSymbolsforWeatherCodes/unknown.svg" };
    
        
        weatherCard.innerHTML=`
        <div class="mainContainer">
            <div class="addressContainer">
                <p id="addressLine">${location}</p>
            </div>
                <div class="imageContainer">
                    <img id="weatherImage" src="${weatherInfo.img}" alt="${weatherInfo.weatherStatus}">
                    <p id="degree">${temperature}&deg;</p>
                </div>
                <div class="taglineContainer">
                    <p id="weatherStatus">${weatherInfo.weatherStatus}</p>
                </div>
            <div class="weatherInfoContainer">
                <div class="humidity">
                    <p id="weatherParameters" >Humidity</p>
                    <img id="icons" src="static/Images/humidity.png">
                    <p id="paramValues">${humidity}%</p>
                </div>
                <div class="pressure">
                    <p id="weatherParameters" >Pressure</p>
                    <img id="icons" src="static/Images/Pressure.png">
                    <p id="paramValues">${pressure}</p>
                </div>
                <div class="windspeed">
                    <p id="weatherParameters" >WindSpeed</p>
                    <img id="icons" src="static/Images/Wind_Speed.png">
                    <p id="paramValues">${windSpeed}</p>
                </div>
                <div class="visibility">
                    <p id="weatherParameters" >Visibility</p>
                    <img id="icons" src="static/Images/Visibility.png">
                    <p id="paramValues">${visibility}mi</p>
                </div>
                <div class="cloudcover">
                    <p id="weatherParameters" >Cloud Cover</p>
                    <img id="icons" src="static/Images/Cloud_Cover.png">
                    <p id="paramValues">${cloudCover}%</p>
                </div>
                <div class="uvlevel">
                    <p id="weatherParameters" >UV Level</p>
                    <img id="icons" src="static/Images/UV_Level.png">
                    <p id="paramValues">${uvIndex}</p>
                </div>
            </div>
        </div>
        `
    }
    
    // function displayWeatherTable(data) {
    //     const weatherTable = document.getElementById('weatherTable');
    //     weatherTable.innerHTML = '';
    
    //     const mainTable = document.createElement('table');
    //     mainTable.classList.add('weeklyWeatherTable');
    
    //     const tableHeader = document.createElement('thead');
    //     tableHeader.innerHTML = `
    //         <tr id="tableHeader">
    //             <th>Date</th>
    //             <th>Status</th>
    //             <th>Temp High</th>
    //             <th>Temp Low</th>
    //             <th>Wind Speed</th>
    //         </tr>
    //     `;
    //     mainTable.appendChild(tableHeader);
    
    //     const tableBody = document.createElement('tbody');
    //     const dailyWeather = data.data.timelines[0].intervals;
    
    //     dailyWeather.forEach(interval => {
    //         console.log('Interval', interval);
    //         const values = interval.values;
    //         if (!values) return;
    
    //         const weatherCode = values.weatherCode;
    
    //         const eachDate = new Date(interval.startTime).toLocaleDateString('en-US', {
    //             weekday: 'long',
    //             day: '2-digit',
    //             month: 'short',
    //             year: 'numeric'
    //         });
    
    //         const tableRows = document.createElement('tr');
    
    //         tableRows.innerHTML = `
    //             <td>${eachDate}</td>
    //             <td><img src="${weatherStatusCodes[weatherCode].img}" alt="${weatherStatusCodes[weatherCode].weatherStatus}"> ${weatherStatusCodes[weatherCode].weatherStatus}</td>
    //             <td>${values.temperatureMax}&deg;</td>
    //             <td>${values.temperatureMin}&deg;</td>
    //             <td>${values.windSpeed} mph</td>
    //         `;
    
    //         tableBody.appendChild(tableRows);  // Move this inside the loop
    //     });
    
    //     mainTable.appendChild(tableBody); // Append the populated table body to the main table
    //     weatherTable.appendChild(mainTable); // Finally, append the main table to the weatherTable container
    // }
    
    function displayWeatherTable(data) {
        const weatherTable = document.getElementById('weatherTable');
        weatherTable.innerHTML = '';
    
        const mainTable = document.createElement('table');
        mainTable.classList.add('weeklyWeatherTable');
    
        const tableHeader = document.createElement('thead');
        tableHeader.innerHTML = `
            <tr id="tableHeader">
                <th>Date</th>
                <th>Status</th>
                <th>Temp High</th>
                <th>Temp Low</th>
                <th>Wind Speed</th>
            </tr>
        `;
        mainTable.appendChild(tableHeader);
    
        const tableBody = document.createElement('tbody');
        const dailyWeather = data.data.timelines[0].intervals;
    
        dailyWeather.forEach((interval, index) => {
            console.log('Interval', interval);
            const values = interval.values;
            if (!values) return;
    
            const weatherCode = values.weatherCode;
    
            const eachDate = new Date(interval.startTime).toLocaleDateString('en-US', {
                weekday: 'long',
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
    
            const tableRows = document.createElement('tr');
            tableRows.innerHTML = `
                <td>${eachDate}</td>
                <td><img src="${weatherStatusCodes[weatherCode].img}" alt="${weatherStatusCodes[weatherCode].weatherStatus}"> ${weatherStatusCodes[weatherCode].weatherStatus}</td>
                <td>${values.temperatureMax}&deg;</td>
                <td>${values.temperatureMin}&deg;</td>
                <td>${values.windSpeed} mph</td>
            `;
    
            // Add click event listener to each row
            tableRows.addEventListener('click', () => {
                displayDetailedWeather(interval, index);
            });
    
            tableBody.appendChild(tableRows);  // Move this inside the loop
        });
    
        mainTable.appendChild(tableBody); // Append the populated table body to the main table
        weatherTable.appendChild(mainTable); // Finally, append the main table to the weatherTable container
    }
    
    // Function to display detailed weather in a new div
    function displayDetailedWeather(interval, index) {
        const values = interval.values;
        const weatherCode = values.weatherCode;
    
    
        const Precipitation = values.precipitationType;
        const chanceOfRain = values.precipitationProbability;
        const windSpeed = values.windSpeed;
        const humidity = values.humidity;
        const visibility = values.visibility;
        const sunrise = new Date(values.sunriseTime).toLocaleTimeString('en-US', { hour: '2-digit'});
        const sunset = new Date(values.sunsetTime).toLocaleTimeString('en-US', { hour: '2-digit' });
        const weatherDate = new Date(interval.startTime).toLocaleDateString('en-US', {           
            weekday: 'long',
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    
        const highTemp=values.temperatureMax;
        const lowTemp=values.temperatureMin;
    
    
    
        weatherTable.style.display = 'none';
        weatherCard.style.display = 'none';
        // weatherDetailsHeading.style.display = 'block';
    
        // Create or select the detailed weather div
        let detailedDiv = document.getElementById('detailedWeather');
        if (!detailedDiv) {
            detailedDiv = document.createElement('div');
            detailedDiv.id = 'detailedWeather';
            document.body.appendChild(detailedDiv); // Append to the body or a specific section of your page
        }
    
        const weatherInfo = weatherStatusCodes[weatherCode] || { weatherStatus: "Unknown", img: "/static/images/WeatherSymbolsforWeatherCodes/unknown.svg" };
    
        // Populate the div with detailed information
        detailedDiv.innerHTML = `
                        <p id="weather-header">Daily Weather Details</p>
                        <hr id="hr_weatherdetails1">
                <div class="detailedWeather">
                <div class="dateStatusImageContainer">
                <div class="dateContainer">
                    <p id="date">${weatherDate}</p>
                    <p id="weatherType">${weatherStatusCodes[weatherCode].weatherStatus}</p>
                    <p id="highlowTemp">${highTemp}&degF/${lowTemp}&degF</p>
                </div>
                <div class="weatherIconImage">
                    <img id="weatherDetailsImage" src="${weatherStatusCodes[weatherCode].img}">
                </div>
            </div>
    
            <div class="weatherDetailsContainer">
                <p>Precipitation:${Precipitation}</p>
                <p>Chance of rain:${chanceOfRain}%</p>
                <p>Wind speed:${windSpeed}mph</p>
                <p>Humidity:${humidity}%</p>
                <p>Visibility:${visibility}mi</p>
                <p>Sunset/Sunrise:${sunset}/${sunrise}</p>
            </div>
        </div>
    
        <div class="weatherChartsFooterContainer"> 
            <p id="weather-footer">Weather Charts</p>
            <hr id="hr_weatherdetails2">
            <img id="downarrow" src="static/Images/point-down-512.png">
        </div>
        `;
    
        // Show the div if it was hidden
        detailedDiv.style.display = 'block';
    }
    
    
    });
    
    