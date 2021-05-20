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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecastDay");
  let forecastHTML = `<div class="row align-items-center">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col" id="forecastDay">${formatDay(forecastDay.dt)}
              <img id="icon" src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" width="80" target="_blank" alt=""/>
              <br>
              <br> 
              <div class="forecastTemp" id="forecastNumber">
              <span id="weatherMax"> ${Math.round(
                forecastDay.temp.max
              )}° </span id="weatherMin"> | ${Math.round(forecastDay.temp.min)}°
              <br/>
              <br/>
              <br/>
              </div>
              </div>
            
`;
    }
  });

  let uv = response.data.current.uvi;
  document.querySelector("#alerts").innerHTML = `Today's Ultraviolet Index Is ${uv}`;

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8b6d13edab9cd86a1b37c0fd46031ffb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);

  displayForecast();
}

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
  let otherFour = Math.round(response.data.main.temp_min);
  let sunrise = response.data.sys.sunrise;
  let otherFive = new Date(sunrise * 1000);
  let sunset = response.data.sys.sunset;
  let otherSix = new Date(sunset * 1000);
  let otherSeven = Math.round(response.data.main.feels_like);
  document.getElementById(
    "otherWeather"
  ).innerHTML = `Feels Like: ${otherSeven}°<br>Humidity: ${otherTwo}%<br>Wind: ${otherThree}mph<br> Temperature Lo: ${otherFour}°`;
  document.getElementById(
    "sunrise"
  ).innerHTML = `Sunrise Time: ${otherFive}<br> Sunset Time: ${otherSix}`;

  getForecast(response.data.coord);
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
