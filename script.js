const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const currentWeatherItemsElement = document.getElementById('current-weather-items');
const timeZone = document.getElementById('time-zone');
const country = document.getElementById('country');
const weatherForecastElement = document.getElementById('weather-forecast');
const currentTempElement = document.getElementById('current-temp')


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

setInterval(() => {
	const time = new Date();
	const month = time.getMonth();
	const date = time.getDate();
	const day = time.getDay();
	const hour = time.getHours();
	const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
	const minutes = time.getMinutes().toString().padStart(2, '0');
	const ampm = hour >= 12 ? 'PM' : 'AM'

	timeElement.innerHTML = hoursIn12HrFormat + ':' + minutes + `<span id="am-pm">${ampm}</span>`

	dateElement.innerHTML = days[day] + ', ' + date +' ' + months[month];
}, 1000);