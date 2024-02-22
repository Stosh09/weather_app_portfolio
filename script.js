// Get DOM elements
const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const currentWeatherItemsElement = document.getElementById(
  "current-weather-conditions"
);
const timeZone = document.getElementById("time-zone");
const country = document.getElementById("country");
const weatherForecastElement = document.getElementById("weather-forecast");
const currentTempElement = document.getElementById("current-temp");

// Arrays for days and months
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
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

// API key
const API_KEY = "d73e73977ab8f45dbfa12046fd104849";

// Function to update time and date
setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";

  // Update time element
  timeElement.innerHTML =
    hoursIn12HrFormat + ":" + minutes + `<span id="am-pm">${ampm}</span>`;

  // Update date element
  dateElement.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);
// Fetch weather data
getWeatherData();
function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    // console.log(success);

    let { latitude, longitude } = success.coords;

    // Fetch weather data using latitude and longitude
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Display weather data
        showWeatherData(data);
      });
  });
}
function showWeatherData(data) {
  // Extract weather data
  let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

  // Update timezone and country elements
  timeZone.innerHTML = data.timezone
  country.innerHTML = data.lat + 'N ' + data.lon + 'E'

  // Update current weather conditions element
  currentWeatherItemsElement.innerHTML = `<div class="weather-item">
	<div>Humidity</div>
	<div>${humidity}</div>
</div>
<div class="weather-item">
	<div>Pressure</div>
	<div>${pressure}</div>
</div>
<div class="weather-item">
	<div>Wind Speed</div>
	<div>${wind_speed}</div>
</div>
<div class="weather-item">
	<div>Sunrise</div>
	<div>${window.moment(sunrise * 1000).format("HH:mm a")}</div>
</div>
<div class="weather-item">
	<div>Sunset</div>
	<div>${window.moment(sunset * 1000).format("HH:mm a")}</div>
</div>`;

  // Initialize otherDayForecast variable
  let otherDayForecast = "";
  // Iterate over daily weather data
  data.daily.forEach((day, idx) => {
    if (idx == 0) {
      // Update current temperature element
      currentTempElement.innerHTML = `
       <img
          src=" https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"
          alt="weather icon"
          class="w-icon"
        />
        <div class="other">
          <div class="day">${window.moment(day.dt * 1000).format("ddd")}</div>
          <div class="temp">Night - ${day.temp.night}&#176;C</div>
          <div class="temp">Day - ${day.temp.day}&#176;C</div>
        </div>
       `
    } else {
      // Update other day forecast
      otherDayForecast += `
  <div class="weather-forecast-items">
  <div class="day">${window.moment(day.dt * 1000).format("ddd")}</div>
  <img src=" https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
  <div class="temp">Night - ${day.temp.night}&#176;C</div>
  <div class="temp">Day - ${day.temp.day}&#176;C</div>
</div>`;
    }
  });

  // Update weather forecast element
  weatherForecastElement.innerHTML = otherDayForecast;
}

// Export showWeatherData function
module.exports = {
  showWeatherData,
};
