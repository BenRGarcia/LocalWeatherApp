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

}; // End 'if (navigator.geolocation)'