let now = new Date();

let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
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

let h2 = document.querySelector("h2");

let day = days[now.getDay() - 1];
let date = now.getDate();
let month = months[now.getMonth()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h2.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`;

function displayName(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#deg");
  let cityElement = document.querySelector("#city");
  let degElement = document.querySelector("#deg");
  let iconElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let iconImage = document.querySelector("#icon");

  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celciusTemperature);
  cityElement.innerHTML = response.data.name;
  degElement.innerHTML = Math.round(`${response.data.main.temp}`);
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  iconImage.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.innerHTML = response.data.weather[0].description;
}

function search(city) {
  let apiKey = "add35dfe5082c9006db11e86b2d079d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayName);
}

function showMyPosition(position) {
  let apiKey = "add35dfe5082c9006db11e86b2d079d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayName);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  search(searchInputElement.value);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showMyPosition);
}

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#deg");
  //remove the active class to the celcius link
  celciusLink.classList.remove("active");
  celciusLink.classList.add("off");
  farenheitLink.classList.add("active");
  farenheitLink.classList.remove("off");
  let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  celciusLink.classList.remove("off");
  farenheitLink.classList.remove("active");
  farenheitLink.classList.add("off");
  let temperatureElement = document.querySelector("#deg");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getCurrentPosition);

search("Malaga");

//FORECAST
