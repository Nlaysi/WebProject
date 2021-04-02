function getMainWeather(url){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    var value;

    request.onload = function() {
        value = request.response;
        console.log(value);
        img =  document.getElementById("mainImg");
        if (value["cod"] == 200){
            img.src = "images/" + value["weather"][0]["icon"] + "@4x.png";
            document.getElementById("mainName").textContent = value["name"];
            document.getElementById("mainTemp").textContent = value["main"]["temp_max"] + "°C";
            document.getElementById("mainWind").textContent = value["wind"]["speed"] + " m/s";
            document.getElementById("mainWeather").textContent = value["weather"][0]["description"];
            document.getElementById("mainPressure").textContent = value["main"]["pressure"] + " hpa";
            document.getElementById("mainHumidity").textContent = value["main"]["humidity"] + " %";
            document.getElementById("mainCoords").textContent = "[" + value["coord"]["lat"] + ", " + value["coord"]["lon"] + "]";
            unload();
            localStorage.setItem("city", value["name"]);
        }
        else {
            loaderror(value["cod"]);
        }
    }

    request.send();
}

function getCityWeather(url){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    var value;

    request.onload = function() {
        value = request.response;
        console.log(value);
        img =  document.getElementById("mainImg");
        if (value["cod"] == 200){
            img.src = "images/" + value["weather"][0]["icon"] + "@4x.png";
            document.getElementById("mainName").textContent = value["name"];
            document.getElementById("mainTemp").textContent = value["main"]["temp_max"] + "°C";
            document.getElementById("mainWind").textContent = value["wind"]["speed"] + " m/s";
            document.getElementById("mainWeather").textContent = value["weather"][0]["description"];
            document.getElementById("mainPressure").textContent = value["main"]["pressure"] + " hpa";
            document.getElementById("mainHumidity").textContent = value["main"]["humidity"] + " %";
            document.getElementById("mainCoords").textContent = "[" + value["coord"]["lat"] + ", " + value["coord"]["lon"] + "]";
            unload();
            localStorage.setItem("city", value["name"]);
        }
        else {
            loaderror(value["cod"]);
        }
    }

    request.send();
}
