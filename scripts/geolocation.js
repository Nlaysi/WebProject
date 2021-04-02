var value;

if(localStorage.getItem("city") == null) {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric&appid=a013324cdcd65a54ee5b6c5c40271e96";
            getMainWeather(url);
        }
        ,
        function error() {
            var url = "http://api.openweathermap.org/data/2.5/weather?q=Saint%20Petersburg&units=metric&appid=a013324cdcd65a54ee5b6c5c40271e96";
            getMainWeather(url);
        }
    )
}
else {
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + localStorage.getItem("city") + "&units=metric&appid=a013324cdcd65a54ee5b6c5c40271e96";
    getMainWeather(url);
}