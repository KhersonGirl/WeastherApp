let now = new Date();

let currentDayTime = document.querySelector("#currentDate");

let houres = now.getHours();
if (houres < 10) {
  houres = `0${houres}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thusday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];


currentDayTime.innerHTML = `${day}     ${houres}:${minutes}`;

function changeCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#searchInput");
  let city = searchInput.value;
  let h2 = document.querySelector("h2");

  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  h2.innerHTML = `${city}`;

  axios.get(url).then(showWeather);
}

let searchButton = document.querySelector("#searchForm");
searchButton.addEventListener("submit", changeCity);

/*function convertFahrenheit(event) {
  event.preventDefault();

  let celsiusTemp = document.querySelector("#temp");

  celsiusTemp.innerHTML = Math.round((29 * 9) / 5 + 32);
}
function convertCelsius() {
  let temp = document.querySelector("#temp");
  temp.innerHTML = 29;
}

let celcius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");*/

//fahrenheit.addEventListener("click", convertFahrenheit);
//celcius.addEventListener("click", convertCelsius);

function showWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp");
  let currentCity = response.data.name;
  let weatherDescription = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let pressure = response.data.main.pressure;
  let windSpeed = Math.round(response.data.wind.speed);

 

  description = document.querySelector("#weather-description");
  h2 = document.querySelector("h2");
  humid = document.querySelector("#humidity");
  press = document.querySelector("#pressure");
  wind = document.querySelector("#windSpeed");

  h2.innerHTML = `${currentCity}`;
  temp.innerHTML = `${temperature}`;
  description.innerHTML = `${weatherDescription}`;
  humid.innerHTML = `Humidity   ${humidity}%`;
  press.innerHTML = `Pressure ${pressure}hPa`;
  wind.innerHTML = `Wind ${windSpeed}m/sec`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  

  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showWeather);
}
function clickCurrenButton() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentPos = document.querySelector("#current-pos-button");
currentPos.addEventListener("click", clickCurrenButton);
