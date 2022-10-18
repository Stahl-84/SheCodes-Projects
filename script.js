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
  let cityElement = document.querySelector("#city");
  let degElement = document.querySelector("#deg");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");

  cityElement.innerHTML = response.data.name;
  degElement.innerHTML = Math.round(`${response.data.main.temp}`) + `&degC`;
  windElement.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity} %`;
}

function search(city) {
  let apiKey = "add35dfe5082c9006db11e86b2d079d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getCurrentPosition);

search("Malaga");
