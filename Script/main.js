function refreshWeather(response) {
    let tempElement = document.querySelector(".weather-temp");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#searchOutput");
    let windElement = document.querySelector("#wind");
    let humidityElement = document.querySelector("#humidity");
    let infoElement = document.querySelector("#description")
    let preciElement = document.querySelector("#precipitation")

    
    preciElement.innerHTML = response.data.temperature.feels_like;
    infoElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = response.data.wind.speed;
    cityElement.innerHTML = response.data.city;
    tempElement.innerHTML = Math.round(temperature);
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