var apiKey = "47d8ef96a06e656505891bda3243fc0e";
var apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
var forecastUrl =
  "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=&appid=";

var searchBox = document.querySelector(".form-inline input");
var searchBtn = document.querySelector(".form-inline button");
var weatherIcon = document.querySelector(".weather-icon");
var previousSearchBtn = document.querySelector(".previous-search");
var forecastResult = document.querySelector(".day-one");

// Search button event listener
searchBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission
  checkWeather();
  saveSearch(searchBox.value);
  previousSearch();
  searchBox.value = ""; // Clear the search input
});

// Enter key event listener
searchBox.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault(); // Prevent form submission
    checkWeather(searchBox.value);
    saveSearch(searchBox.value);
    previousSearch();
    searchBox.value = ""; // Clear the search input
  }
});

function saveSearch(city) {
  var previousSearches =
    JSON.parse(localStorage.getItem("previousSearches")) || [];
  
  if (previousSearches.length >= 10) {
    previousSearches.shift(); // Remove the oldest search
  }
  
  previousSearches.push(city);
  localStorage.setItem("previousSearches", JSON.stringify(previousSearches));
}

function previousSearch() {
  var previousSearches = JSON.parse(localStorage.getItem("previousSearches")) || [];
  var previousSearchBtn = document.querySelector(".previous-search");
  previousSearchBtn.innerHTML = ""; // Clear previous search buttons

  previousSearches.forEach(function (citySearch) {
    var previousBtn = document.createElement("button");
    previousBtn.classList.add("btn", "btn-outline-secondary");
    previousBtn.textContent = citySearch;
    previousBtn.addEventListener("click", function () {
      checkWeather(citySearch); // Call checkWeather with the clicked city
    });
    previousSearchBtn.appendChild(previousBtn);
  });
}
// Get current weather forecast

async function checkWeather(city) {
  var response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

  var cityName = data.name || city; // Use city if data.name is undefined
  document.querySelector(".city").textContent = cityName;
  document.querySelector(".temp").textContent = "Temperature: " + Math.round(data.main.temp) + "°F";
  document.querySelector(".humidity").textContent = "Humidity: " + data.main.humidity + "%";
  document.querySelector(".wind").textContent = "Wind Speed: " + data.wind.speed + "MPH";

  if (data.weather && data.weather.length > 0) {
    var weatherMain = data.weather[0].main;
    switch (weatherMain) {
      case "Clouds":
        weatherIcon.src = "assets/images/cloudy.webp";
        break;
      case "Clear":
        weatherIcon.src = "assets/images/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "assets/images/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "assets/images/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "assets/images/mist.png";
        break;
      case "Snow":
        weatherIcon.src = "assets/images/snow.png";
        break;
      default:
        weatherIcon.src = ""; // Clear the weather icon if the weather condition is not matched
        break;
    }
  } else {
    weatherIcon.src = ""; // Clear the weather icon if weather data is not available
  }

  // Save the current search value to local storage
  localStorage.setItem("previousSearch", searchBox.value);
}

// Event listener for the Enter key
searchBox.addEventListener("keydown", function (event) {
  // Check if the pressed key is the Enter key (key code 13)
  if (event.keyCode === 13) {
    event.preventDefault(); // Prevent the form from submitting
    checkWeather(searchBox.value);
    previousSearch();
    searchBox.value = ""; // Clear the search input
  }
});

// Event listener for the search button
searchBtn.addEventListener("click", function () {
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
var formattedDate =
  today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();

// Add the formatted date to an HTML element
document.getElementById("currentDate").innerHTML = formattedDate;
previousSearch();