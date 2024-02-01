const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const currentWeatherItemsElement = document.getElementById(
  "current-weather-conditions"
);
const timeZone = document.getElementById("time-zone");
const country = document.getElementById("country");
const weatherForecastElement = document.getElementById("weather-forecast");
const currentTempElement = document.getElementById("current-temp");

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

const API_KEY = "d73e73977ab8f45dbfa12046fd104849";

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";

  timeElement.innerHTML =
    hoursIn12HrFormat + ":" + minutes + `<span id="am-pm">${ampm}</span>`;

  dateElement.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);
getWeatherData();
function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    // console.log(success);

    let { latitude, longitude } = success.coords;

    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      });
  });
}
function showWeatherData(data) {
  let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

  console.log(`${sunrise}`);
  console.log(`${sunset}`);

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
	<div>${window.moment(sunrise).format('HH:mm a')}</div>
</div>
<div class="weather-item">
	<div>Sunset</div>
	<div>${window.moment(sunset).format('HH:mm a')}</div>
</div>`;
}
