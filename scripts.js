/*Functionality for displaying today's date and time */
let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let months = [
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
let month = months[now.getMonth()];
let days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
	hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
	minutes = `0${minutes}`;
}

function currentDateTime(today) {
	let p = document.querySelector("#currentDateTime");
	p.innerHTML = `Today is ${day}, ${month} ${date}, ${year} | ${hour}:${minutes}`;
}
currentDateTime();

let form = document.querySelector("#searchForm");
form.addEventListener("submit", search);


/*Functionality for the search engine */
function search(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#searchCities");

	let h5 = document.querySelector("#enteredCity");
	h5.innerHTML = `${searchInput.value}`;

	let form = document.querySelector("#searchForm");
	form.addEventListener("submit", search);
	
	let apiKey = "31552a699343e5496f02718f72996b3d";

	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=imperial`;



	/*Display the timestamp for when the api was called */
	function dateApi(timestamp){
		let date =  new Date(timestamp);
		let hours = date.getHours();
		if (hours < 10){
			hours = `0${hours}`;
		}
		let minutes = date.getMinutes();
		if (minutes < 10){
			minutes = `0${minutes}`;
		}
		let days = ["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday", "Sunday"];
		let day = days[date.getDay()];
			return `${day} | ${hours}:${minutes}`;
	}

	let tempFromApi = null; 

	/*Display the temperature and conditions. Sub-function is to convert the temperatures to Celsius and Fahrenheit*/
	function showTemp(response) {
			console.log(response.data);

			/*rounds the temperature received */
			tempFromApi = Math.round(response.data.main.temp);
			/*rounds the wind speed */
			windFromApi = Math.round(response.data.wind.speed);
			/*updates the weather page with the API's temperature values */
			let temperatureElement = document.querySelector("#tempApi");
			/*adds in the wind speed from the API */
			let windSpeed = document.querySelector("#windApi");
			/*displays the temperature's conditions */
			let tempConditions = document.querySelector("#tempApiConditions");
			/*timestamp for the api */
			let dateFromApi = document.querySelector("#apiTime");
			let iconElement = document.querySelector ("#tempIcon");

			temperatureElement.innerHTML = `${tempFromApi}° F`;
			windSpeed.innerHTML = `Wind Speed: ${windFromApi} mph`;
			tempConditions.innerHTML = response.data.weather[0].description;
			dateFromApi.innerHTML = dateApi(response.data.dt * 1000);
			iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

		}
		/*calls the function for the API to show the temp */
		axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);

		/*Functionality for Fahrenheit to Celsius*/
		function convertFahrenheitToCelsius(event) {
			event.preventDefault();
			/*remove the active class from fahrenheit and add to celsius*/
			convertLinkFahrenheit.classList.remove("active");
			convertLinkCelsius.classList.add("active"); 
			let calculatedCelsiusTemp = document.querySelector("#tempApi");
			let convertToCelsiusCalculation = Math.round(((tempFromApi) - 32)*(5 / 9));
			calculatedCelsiusTemp.innerHTML = `${convertToCelsiusCalculation} °C`;
		}
		let convertLinkCelsius = document.querySelector("#celsius");
		convertLinkCelsius.addEventListener("click", convertFahrenheitToCelsius);
		
		/*Functionality for convert to Celsius to Fahrenheit*/
		function convertCelsiusToFahrenheit(event) {
			event.preventDefault();
			/*add the active class to fahrenheit and remove from celsius*/
			convertLinkFahrenheit.classList.add("active");
			convertLinkCelsius.classList.remove("active"); 
			let defaultFTempElement = document.querySelector("#tempApi");
			defaultFTempElement.innerHTML = `${tempFromApi} °F`;
		}
		let convertLinkFahrenheit = document.querySelector("#fahrenheit");
		convertLinkFahrenheit.addEventListener("click", convertCelsiusToFahrenheit);
}

