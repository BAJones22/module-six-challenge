var apiKey = "47d8ef96a06e656505891bda3243fc0e";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=&appid=";

var searchBox = document.querySelector(".form-inline input");
var searchBtn = document.querySelector(".form-inline button");
var weatherIcon = document.querySelector(".weather-icon");
var previousSearchBtn = document.querySelector(".previous-search");
var forecastResult = document.querySelector(".day-one");

// Search button function

searchBtn.addEventListener("click", function () {
  var citySearch = searchBox.value.trim();

  checkWeather(citySearch);

  // Save the city search value in local storage
  localStorage.setItem("previousSearch", citySearch);

  previousSearch();
});

function previousSearch() {
  var citySearch = searchBox.value.trim();
  var previousBtn = document.createElement("button");
  previousBtn.classList.add("btn", "btn-outline-secondary");
  previousBtn.textContent = citySearch;
  previousSearchBtn.appendChild(previousBtn);
}

// Get current weather forecast

async function checkWeather(city) {
  var response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

  

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "MPH";

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "assets/images/cloudy.webp";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "assets/images/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "assets/images/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "assets/images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "assets/images/mist.png";
  } else if (data.weather[0].main == "Snow") {
    weatherIcon.src = "assets/images/snow.png";
  }
}

// Event listener for the Enter key
searchBox.addEventListener('keydown', function(event) {
  // Check if the pressed key is the Enter key (key code 13)
  if (event.keyCode === 13) {
      event.preventDefault(); // Prevent the form from submitting
      checkWeather(searchBox.value);
      previousSearch();
      searchBox.value = ""; // Clear the search input
  }
});

// Event listener for the search button
searchBtn.addEventListener("click", function() {
  checkWeather(searchBox.value);
  previousSearch();
  searchBox.value = ""; // Clear the search input
});

// Retrieve the previous search value from local storage and call checkWeather()
var previousSearchValue = localStorage.getItem("previousSearch");

if (previousSearchValue) {
  checkWeather(previousSearchValue);
}

// Create a new Date object and format it as mm/dd/yyyy
var today = new Date();
var formattedDate = today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();

// Add the formatted date to an HTML element
document.getElementById("currentDate").innerHTML = formattedDate;
