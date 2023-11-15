function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = "";
  let forecast = "";

  for (let index = 1; index < 6; index++) {
    forecast = response.data.daily[index];

    forecastElement.innerHTML += `                
          <div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(forecast.time)}</div>
            <div class="weather-forecast-icon"><img src="./icons/${
              forecast.condition.icon
            }.svg" class="weather-app-icon" width="25px" /></div>
            <div class="weather-forecast-temperature">
              <div class="weather-forecast-temperature-max">
                <strong>${Math.round(forecast.temperature.maximum)}°</strong>
              </div>
              <div class="weather-forecast-temperature-min">${Math.round(
                forecast.temperature.minimum
              )}°</div>
            </div>
          </div>
        `;
  }
}

function getForecast(city) {
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${WEATHER_API_KEY}&units=metric`;
  axios(apiUrlForecast).then(displayForecast);
}

function refreshWeather(response) {
  let iconElement = document.querySelector("#icon");
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let descriptionElement = document.querySelector("#description");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let feelsLikeElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");

  iconElement.innerHTML = `<img src="./icons/${response.data.condition.icon}.svg" class="weather-app-icon" width="100px" />`;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  timeElement.innerHTML = formatDate(date);
  feelsLikeElement.innerHTML = `${Math.round(
    response.data.temperature.feels_like
  )}°C`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;

  let condition = response.data.condition.icon;
  if (condition === "clear-sky-day" || condition === "clear-sky-night") {
    document.querySelector(".container").classList.add("containerClear");
    document
      .querySelector(".container")
      .classList.remove(
        "containerAtmosphere",
        "containerClouds",
        "containerDrizzle",
        "containerRain",
        "containerSnow",
        "containerThunderstorm"
      );
  } else if (
    condition === "few-clouds-day" ||
    condition === "few-clouds-night" ||
    condition === "scattered-clouds-day" ||
    condition === "scattered-clouds-night" ||
    condition === "broken-clouds-day" ||
    condition === "broken-clouds-night"
  ) {
    document.querySelector(".container").classList.add("containerClouds");
    document
      .querySelector(".container")
      .classList.remove(
        "containerAtmosphere",
        "containerClear",
        "containerDrizzle",
        "containerRain",
        "containerSnow",
        "containerThunderstorm"
      );
  } else if (
    condition === "shower-rain-day" ||
    condition === "shower-rain-night"
  ) {
    document.querySelector(".container").classList.add("containerDrizzle");
    document
      .querySelector(".container")
      .classList.remove(
        "containerAtmosphere",
        "containerClear",
        "containerClouds",
        "containerRain",
        "containerSnow",
        "containerThunderstorm"
      );
  } else if (condition === "rain-day" || condition === "rain-night") {
    document.querySelector(".container").classList.add("containerRain");
    document
      .querySelector(".container")
      .classList.remove(
        "containerAtmosphere",
        "containerClear",
        "containerClouds",
        "containerDrizzle",
        "containerSnow",
        "containerThunderstorm"
      );
  } else if (condition === "snow-day" || condition === "snow-night") {
    document.querySelector(".container").classList.add("containerSnow");
    document
      .querySelector(".container")
      .classList.remove(
        "containerAtmosphere",
        "containerClear",
        "containerClouds",
        "containerDrizzle",
        "containerRain",
        "containerThunderstorm"
      );
  } else if (
    condition === "thunderstorm-day" ||
    condition === "thunderstorm-night"
  ) {
    document.querySelector(".container").classList.add("containerThunderstorm");
    document
      .querySelector(".container")
      .classList.remove(
        "containerAtmosphere",
        "containerClear",
        "containerClouds",
        "containerDrizzle",
        "containerRain",
        "containerSnow"
      );
  } else {
    document.querySelector(".container").classList.add("containerAtmosphere");
    document
      .querySelector(".container")
      .classList.remove(
        "containerClear",
        "containerClouds",
        "containerDrizzle",
        "containerRain",
        "containerSnow",
        "containerThunderstorm"
      );
  }

  getForecast(response.data.city);
}

function formatDate(date) {
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function searchCity(city) {
  let apiUrlRefreshWeather = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${WEATHER_API_KEY}`;
  axios.get(apiUrlRefreshWeather).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

import WEATHER_API_KEY from "./api.js";

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Kuala Lumpur");
