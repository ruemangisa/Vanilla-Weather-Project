function handleSeachSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    let cityElement = document.querySelector("#search-output");
    cityElement.innerHTML = searchInput.value;
}



let SearchFormElement = document.querySelector("#search-form")
SearchFormElement.addEventListener("submit", handleSeachSubmit);