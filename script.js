let currentDate = document.querySelector("#date");
let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formattedDate = ` ${currentDay}, ${currentMonth} ${currentDate} ${currentYear}, ${hours}:${minutes}`;

  return formattedDate;
}
let newDate = formatDate(currentTime);
currentDate.innerHTML = newDate;

function changeToF() {
  let temperature = document.querySelector("#temperatureinfo");
  temperature.innerHTML = "88";
}
let Farengait = document.querySelector("#Farengait");
Farengait.addEventListener("click", changeToF);

function changeToC() {
  let temperatureC = document.querySelector("#temperatureinfo");
  temperatureC.innerHTML = "31";
}
let Celcius = document.querySelector("#Celcius");
Celcius.addEventListener("click", changeToC);

function showWeather(response) {
  let newTemperature = document.querySelector("#temperatureinfo");
  let cityElement = document.querySelector("#newAirport");
  let temperature = Math.round(response.data.main.temp);
  newTemperature.innerHTML = `${temperature}°C `;
  cityElement.innerHTML = `${response.data.name}`;
}
function retrievePosition(position) {
  let apiKey = "a69f039661334fe4a190d3d176fb9347";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function getPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getPosition);

function displayWeather(response) {
  let weatherDiv = document.querySelector("#temperatureinfo");
  let cityElement = document.querySelector("#newAirport");
  let currentDescription = document.querySelector("#description");
  let temperature = Math.round(response.data.main.temp);
  currentDescription.innerHTML = `${response.data.weather[0].description}`;
  cityElement.innerHTML = `${response.data.name}`;
  weatherDiv.innerHTML = `${temperature}°C`;
}
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiKey = "a69f039661334fe4a190d3d176fb9347";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
