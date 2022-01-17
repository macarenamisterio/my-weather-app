// Show current location using latitude and longitude
function showPosition(response) {
	let getCity = response.data[0].name;
	let city = document.querySelector("#city");
	city.innerHTML = `${getCity}`;
}

// Show current weather
function showWeather(response) {
	currentTemp = response.data.main.temp;
	document.querySelector("#temp").innerHTML = Math.round(currentTemp);
	document.querySelector("#w-condition").innerHTML =
		response.data.weather[0].main;
	document
		.querySelector("#w-icon")
		.setAttribute(
			"src",
			`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
		);
	document.querySelector("#w-humidity").innerHTML = response.data.main.humidity;
	document.querySelector("#w-wind").innerHTML = Math.round(
		response.data.wind.speed
	);
	document.querySelector("#current-day").innerHTML = new Date(
		response.data.dt * 1000
	).toLocaleDateString();
	document.querySelector("#current-time").innerHTML = new Date(
		response.data.dt * 1000
	).toLocaleTimeString();
}

// Show search result: city name, city weather
function showSearch(response) {
	currentTemp = response.data.main.temp;
	document.querySelector("#city").innerHTML = response.data.name;
	document.querySelector("#temp").innerHTML = Math.round(currentTemp);
	document.querySelector("#w-condition").innerHTML =
		response.data.weather[0].main;
	document
		.querySelector("#w-icon")
		.setAttribute(
			"src",
			`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
		);
	document.querySelector("#w-humidity").innerHTML = response.data.main.humidity;
	document.querySelector("#w-wind").innerHTML = Math.round(
		response.data.wind.speed
	);
	document.querySelector("#current-day").innerHTML = new Date(
		response.data.dt * 1000
	).toLocaleDateString();
	document.querySelector("#current-time").innerHTML = new Date(
		response.data.dt * 1000
	).toLocaleTimeString();
}

// Get current location weather
function getWeather(position) {
	let apiKey = "99f763cf958e5832295c470b28782d08";
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	let units = "metric";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
	axios.get(apiUrl).then(showWeather);
}

// Get city name using latitude and longitude
function getPosition(position) {
	let apiKey = "99f763cf958e5832295c470b28782d08";
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	let apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
	axios.get(apiUrl).then(showPosition);
}

// Search for a city
function searchCity(city) {
	let apiKey = "99f763cf958e5832295c470b28782d08";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
	axios.get(apiUrl).then(showSearch);
}

// Search engine
function handleSubmit(event) {
	event.preventDefault();
	let city = document.querySelector("#search-input").value;
	searchCity(city);
}

// Convert to fahrenheit
function displayFah(event) {
	event.preventDefault();
	fah.classList.remove("active");
	cel.classList.add("active");
	let fahFormula = Math.round((currentTemp * 9) / 5 + 32);
	document.querySelector("#temp").innerHTML = fahFormula;
}

// Convert to celsius
function displayCel(event) {
	event.preventDefault();
	fah.classList.add("active");
	cel.classList.remove("active");
	document.querySelector("#temp").innerHTML = Math.round(currentTemp);
}

// Building the Forecast

function showForecast(){
	let forecastHtml = `<div class="col" id="forecast-col">
                    <h4 class="forecast-day">Today</h4>
                    <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="">
                    <p>
                        <span class="min">16</span><span class="min degree">°C</span>&nbsp;&nbsp;   
                        <span class="max">27</span><span class="max degree">°C</span>
                    </p>              
                </div>`;
	document.querySelector("#forecast-col") = forecastHtml
}

// End of forecast

// Variable to use in showWeather and showSearch
let currentTemp = null;

// Click to convert to fahrenheit
let fah = document.querySelector("#fahrenheit");
fah.addEventListener("click", displayFah);

// Click to convert to celsius
let cel = document.querySelector("#celsius");
cel.addEventListener("click", displayCel);

// Search a new city when button is clicked
let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

// Get current position longitude and latitude to show current position
navigator.geolocation.getCurrentPosition(getPosition);

// Get current position longitude and latitude to show current weather
navigator.geolocation.getCurrentPosition(getWeather);