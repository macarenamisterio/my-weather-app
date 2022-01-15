function showWeather(response) {
    console.log(response)
    document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#w-condition").innerHTML = response.data.weather[0].main;
    document.querySelector("#w-humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#w-wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#current-time").innerHTML = new Date (response.data.dt * 1000);
}

function getWeather(position) {
  let apiKey = "99f763cf958e5832295c470b28782d08";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather)
}

function showCity(response) {
  console.log(response)
  let getCity = response.data[0].name;
  let city = document.querySelector("#city");
  city.innerHTML = `${getCity}`;
}

function getPosition(position) {
  let apiKey = "99f763cf958e5832295c470b28782d08";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
  axios.get(apiUrl).then(showCity);
}

navigator.geolocation.getCurrentPosition(getPosition);
navigator.geolocation.getCurrentPosition(getWeather);


