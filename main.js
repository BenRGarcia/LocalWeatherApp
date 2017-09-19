if (navigator.geolocation) {


	// A function that gets geolocation latitude and longitude
	navigator.geolocation.getCurrentPosition(function(position) {

		// Generate URL specific to geolocation
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;

		// Call function to get local weather data
		localWeather(lat, lon);

		// Call function to get city, state data
		cityState(lat, lon);

	});


	// A function that takes latitude and longitude, retrieves location using Google Maps API
	function cityState(lat, lon) {

		// Generate URL specific to geolocation
		var mapAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&sensor=false";

		// Ajax Request to Google Maps Geolocation API
		var apiRequest = new XMLHttpRequest();
		apiRequest.open('GET', mapAPI);

		apiRequest.onload = function () {
			var locationData = JSON.parse(apiRequest.responseText);

			// Call function to render 'city, state' to DOM
			renderCityState(locationData);

		};

		apiRequest.send();

	}; // End function cityState()


	// A function that renders 'city, state' to DOM
	function renderCityState(data) {

		// Parse only the first geolocation JSON object
		var fullAddress = data.results[0].address_components;

		// Find the full city and state name within data
		for (var i = 0; i < fullAddress.length; i++) {

			if (fullAddress[i].types[0] == "locality") {
				var city = fullAddress[i].long_name;
			};

			if (fullAddress[i].types[0] == "administrative_area_level_1") {
				var state = fullAddress[i].long_name;
			};

			document.getElementById("city-state").innerHTML = city + ", " + state;

		}; // End for loop

	}; // End function renderCityState()


	// A function that takes latitude and longitude, retrieves local weather data from Free Code Camp Weather API
	function localWeather(lat, lon) {

		// Generate URL specific to geolocation (Weather API only accepts integers -- not full length coordinates)
			var truncatedLat = Math.floor(lat);
			var truncatedLon = Math.floor(lon);
			var weatherAPI = 'https://fcc-weather-api.glitch.me/api/current?lat=' + truncatedLat + "&lon=" + truncatedLon;

			// AJAX request to local weather data API
			var apiRequest = new XMLHttpRequest();
			apiRequest.open('GET', weatherAPI);

			apiRequest.onload = function() {
				var localWeather = JSON.parse(apiRequest.responseText);
				renderLocalWeather(localWeather);
			};

			// Execute the apiRequest
			apiRequest.send();

	}; // End function localWeather()
	

	// A function that renders local weather data to DOM
	function renderLocalWeather(data) {

		var celcius = data.main.temp;
		var fahrenheit = celcius * 9 / 5 + 32;
		var description = data.weather[0].description;
		var iconURL = data.weather[data.weather.length - 1].icon;

		document.getElementById("temperature").innerHTML = Math.floor(fahrenheit) + "&deg;F";
		document.getElementById("description").innerHTML = description;
		document.getElementById("weatherImage").src = iconURL;

		// Call function that adds C & F selectors to the page
		renderCFButtons(celcius, fahrenheit);

	}; // End function renderLocalWeather()


	// A function that renders celcius and fahrenheit button and temperature toggling to the page
	function renderCFButtons(c, f) {

		document.getElementById("buttons").innerHTML = "<button id='fahrOrCel'>&deg;C/&deg;F</button>";

		// Toggle celcius and fahrenheit with button click event
		var i = 2;

		document.getElementById("fahrOrCel").addEventListener("click", function() {
			console.log("Button was clicked!");
			if (i % 2 == 0) {
				document.getElementById("temperature").innerHTML = Math.floor(c) + "&deg;C";
				i++;
			} else {
				document.getElementById("temperature").innerHTML = Math.floor(f) + "&deg;F";
				i++;
			};

		});

	}; // End renderCFButtons()

}; // End 'if (navigator.geolocation)'