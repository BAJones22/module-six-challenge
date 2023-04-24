var apiKey = "47d8ef96a06e656505891bda3243fc0e";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

var searchBox = document.querySelector(".form-inline input");
var searchBtn = document.querySelector(".form-inline button");

async function checkWeather(city) {
    var response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "MPH";

}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

checkWeather();