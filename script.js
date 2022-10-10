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
let minutes = now.getMinutes();
if (minutes < 10) {
  hours = `0{minutes}`;
}

h2.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`;

function displayName(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#deg").innerHTML =
    Math.round(`${response.data.main.temp}`) + `&degC`;
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind: ${response.data.wind.speed}km/h`;
  document.querySelector("#rain").innerHTML = response.data.rain;
}

function search(event) {
  event.preventDefault();
  let apiKey = "add35dfe5082c9006db11e86b2d079d0";
  let city = document.querySelector("#search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayName);

  // let searchInput = document.querySelector("#search-input");
  // let h1 = document.querySelector("h1");
  // h1.innerHTML = `${searchInput.value}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// function celcius(event) {
//   event.preventDefault();
//   let temp = document.querySelector("#deg");
//   temp.innerHTML = `25&deg`;
// }

// function faren(event) {
//   event.preventDefault();
//   let temp = document.querySelector("#deg");
//   temp.innerHTML = `77&deg`;
// }

// let celciusButton = document.querySelector("#celcius");
// celciusButton.addEventListener("click", celcius);

// let farenButton = document.querySelector("#faren");
// farenButton.addEventListener("click", faren);
function showMyPosition(position) {
  let apiKey = "add35dfe5082c9006db11e86b2d079d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayName);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showMyPosition);
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getCurrentPosition);
