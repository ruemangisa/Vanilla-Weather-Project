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
function handleSeachSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    searchCity(searchInput.value)
}

let SearchFormElement = document.querySelector("#search-form")
SearchFormElement.addEventListener("submit", handleSeachSubmit);