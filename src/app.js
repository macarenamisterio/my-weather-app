function currentWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#temp");
  tempNow.innerHTML = `${temp}°C`;
}

function logPosition(position) {
  let apiKey = "99f763cf958e5832295c470b28782d08";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(currentWeather);
}

navigator.geolocation.getCurrentPosition(logPosition);

