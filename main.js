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

}; // End 'if (navigator.geolocation)'