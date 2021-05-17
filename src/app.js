let now = new Date();
let date = now.getDate();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let year = now.getFullYear();
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
let month = months[now.getMonth()];
let hour = now.getHours();
let minute = now.getMinutes();
let seconds = now.getSeconds();

document.querySelector(
  "#nowTime"
).innerHTML = `${day}, ${month} ${date}, ${year} ${hour}:${minute}:${seconds}`;

document.querySelector("#Hi").innerHTML = Number(document.querySelector("#Hi").innerHTML);

function showTemperature(response) {
  console.log(response);
  document.querySelector("#local-city").innerHTML = response.data.name;
  document.querySelector("#Hi").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#weather").innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let otherTwo = response.data.main.humidity;
  let otherThree = Math.round(response.data.wind.speed);
  document.getElementById(
    "otherWeather"
  ).innerHTML = `Humidity: ${otherTwo}%<br>Wind: ${otherThree}mph`;
}
function showLocation(event) {
  event.preventDefault();
  document.querySelector("#Hi").innerHTML = Number(document.querySelector("#Hi").innerHTML);
  let city = document.querySelector("#place").value;
  let apiKey = "8b6d13edab9cd86a1b37c0fd46031ffb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}
let button = document.querySelector("#city-form");
button.addEventListener("submit", showLocation);

function convertToCelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#Hi");
  let tempy = tempElement.innerHTML;
  tempy = Number(tempy);
  tempElement.innerHTML = Math.round(((tempy - 32) * 5) / 9);
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#Hi");
  let tempy = tempElement.innerHTML;
  tempy = Number(tempy);
  tempElement.innerHTML = Math.round((tempy * 9) / 5 + 32);
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFahrenheit);
