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
	p.innerHTML = `${day}, ${month} ${date}, ${year} | ${hour}:${minutes}`;
}
currentDateTime();

let form = document.querySelector("#searchForm");
form.addEventListener("submit", search);

/*Functionality for convert to Celsius*/
function convertCelsius(event) {
	event.preventDefault();
	let a = document.querySelector("#celsius");
	let p = document.querySelector("#temp");
	p.innerHTML = `17° C`;
}
let convertLinkCelsius = document.querySelector("#celsius");
convertLinkCelsius.addEventListener("click", convertCelsius);

/*Functionality for convert to Fahrenheit */
function convertFahrenheit(event) {
	event.preventDefault();
	let a = document.querySelector("#fahrenheit");
	let p = document.querySelector("#temp");
	p.innerHTML = `65°F`;
}
let convertLinkFahrenheit = document.querySelector("#fahrenheit");
convertLinkFahrenheit.addEventListener("click", convertFahrenheit);

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
	/*the function used for pulling in the temperature API */

	function showTemp(response) {
			console.log(response.data);

			/*rounds the temperature received */
			let tempFromApi = Math.round(response.data.main.temp);
			/*updates the weather page with the API's temperature values */
			let temperatureElement = document.querySelector("#tempApi");
			/*displays the temperature's conditions */
			let tempConditions = document.querySelector("#tempApiConditions");

			temperatureElement.innerHTML = `${tempFromApi}° F`;
			tempConditions.innerHTML = response.data.weather[0].description;
		}
		/*calls the function for the API to show the temp */
		axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}
