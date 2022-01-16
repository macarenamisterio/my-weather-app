function showPosition(response) {
  console.log(response)
  let getCity = response.data[0].name;
  let city = document.querySelector("#city");
  city.innerHTML = `${getCity}`;
}

function showWeather(response) {
    console.log(response)
    document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#w-condition").innerHTML = response.data.weather[0].main;
    document.querySelector("#w-icon").setAttribute = ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#w-humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#w-wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#current-day").innerHTML = new Date(response.data.dt * 1000).toLocaleDateString();
    document.querySelector("#current-time").innerHTML = new Date(response.data.dt * 1000).toLocaleTimeString();
}

function showSearch(response) {
  console.log(response);
}

function getWeather(position) {
  let apiKey = "99f763cf958e5832295c470b28782d08";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather)
}

function getPosition(position) {
  let apiKey = "99f763cf958e5832295c470b28782d08";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
  axios.get(apiUrl).then(showPosition);
}

function searchCity(city) {
  let apiKey = "99f763cf958e5832295c470b28782d08";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showSearch);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("search-input").value;
  searchCity(city);
}

let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

navigator.geolocation.getCurrentPosition(getPosition);
navigator.geolocation.getCurrentPosition(getWeather);


