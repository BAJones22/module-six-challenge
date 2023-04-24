var apiKey = "47d8ef96a06e656505891bda3243fc0e";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

var searchBox = document.querySelector(".form-inline input");
var searchBtn = document.querySelector(".form-inline button");
var weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    var response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "MPH";

    if(data.weather[0].main == "Clouds") {
        weatherIcon.src = "assets/images/cloudy.webp";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "assets/images/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "assets/images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "assets/images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "assets/images/mist.png";
    }
    else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "assets/images/snow.png";
    }

}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

checkWeather();