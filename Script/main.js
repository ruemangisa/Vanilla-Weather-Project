function refreshWeather(response) {
    let tempElement = document.querySelector(".weather-temp");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#searchOutput");
    let windElement = document.querySelector("#wind");
    let humidityElement = document.querySelector("#humidity");
    let infoElement = document.querySelector("#description");
    let preciElement = document.querySelector("#precipitation");
    let timeElement = document.querySelector("#time");
    let date = new Date (response.data.time * 1000);
    let iconElement = document.querySelector(".weather-emoji");

    timeElement.innerHTML = formatTime(date);
    preciElement.innerHTML = response.data.temperature.feels_like;
    infoElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = response.data.wind.speed;
    cityElement.innerHTML = response.data.city;
    tempElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" />`;
    getForecast(response.data.city);
}
function formatTime(date) {
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
    let day = days[date.getDay()];

    if (minutes < 10){
        minutes = `0${minutes}`;
    }

    return `${day} ${hour}:${minutes}`;
}
function searchCity(searchOutput) {
    let apiKey = "c1ffea9484c65b5596835a015t56o314";
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${searchOutput}&key=${apiKey}`;
    axios.get(apiURL).then(refreshWeather);
    
}
function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    searchCity(searchInput.value)
}
  
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[date.getDay()];
  }
  
  function getForecast(city) {
    let apiKey = "c1ffea9484c65b5596835a015t56o314";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
  }
  
  function displayForecast(response) {
    let forecastHtml = "";
  
    response.data.daily.forEach(function (day, index) {
      if (index < 5) {
        forecastHtml =
          forecastHtml +
          `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
  
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
          <div class="weather-forecast-temperatures">
            <div class="color-pink">
              <strong>${Math.round(day.temperature.maximum)}º</strong>
            </div>
            <div class="weather-forecast-temperature light-pink">${Math.round(
              day.temperature.minimum
            )}º</div>
          </div>
        </div>
      `;
      }
    });
  
    let forecastElement = document.querySelector("#forcast-weather");
    forecastElement.innerHTML = forecastHtml;
  }
  
  let searchFormElement = document.querySelector("#search-form");
  searchFormElement.addEventListener("submit", handleSearchSubmit);
  
  searchCity("Zomba");
  