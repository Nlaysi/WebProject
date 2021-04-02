var cities;

if(localStorage.getItem("cities") != null) {
    cities = new Set(JSON.parse(localStorage.getItem("cities")));
}
else {
    cities = new Set();
}

function deleteElement(x) {
    x.parentNode.parentNode.style.opacity = 0;
    cities.delete(x.name);
    localStorage.setItem('cities', JSON.stringify(Array.from(cities.values())));
    setTimeout(() => x.parentNode.parentNode.parentNode.removeChild(x.parentNode.parentNode), 400);
}

function LoadCities() {
    favorites = document.getElementById("favorite");
    array = Array.from(cities.values())

    for (let i = 0; i < array.length; i++) {
        const city = array[i];

        favorites.innerHTML = favorites.innerHTML + `<section id="` + city + `">
        <div><span class="fav_city">` + city + `</span><span id="` + city + `Temp" class="fav_temp">-°C</span><img id="` + city + `Img" src="" class="fav_img" /><button name="` + city + `" class="fav_btn" onclick="deleteElement(this)">×</button></div>
        <div class="section_item" style="display: none;"><span class="atr">Ветер</span><span id="` + city + `Wind" class="value">-</span></div>
        <div class="section_item" style="display: none;"><span class="atr">Облачность</span><span id="` + city + `Weather" class="value">-</span></div>
        <div class="section_item" style="display: none;"><span class="atr">Давление</span><span id="` + city + `Pressure" class="value">-</span></div>
        <div class="section_item" style="display: none;"><span class="atr">Влажность</span><span id="` + city + `Humidity" class="value">-</span></div>
        <div class="section_item" style="display: none;"><span class="atr">Координаты</span><span id="` + city + `Coords" class="value">-</span></div>
        <div id="` + city + `Load" class="fload"></div>
        </section>`
    }
}

function RefreshCities() {
    array = Array.from(cities.values())

    for (let i = 0; i < array.length; i++) {
        const city = array[i];

    let request = new XMLHttpRequest();
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=a013324cdcd65a54ee5b6c5c40271e96";
    request.open('GET', url);
    request.responseType = 'json';
    let value;

    request.onload = function() {
        value = request.response;
        console.log(value);
        img =  document.getElementById(value["name"] + "Img");
        if (value["cod"] == 200){
            img.src = "images/" + value["weather"][0]["icon"] + "@4x.png";
            console.log(value["name"] + "Wind");
            //document.getElementById(value["name"] + "Name").textContent = value["name"];
            document.getElementById(value["name"] + "Temp").textContent = value["main"]["temp_max"] + "°C";
            document.getElementById(value["name"] + "Wind").textContent = value["wind"]["speed"] + " m/s";
            document.getElementById(value["name"] + "Weather").textContent = value["weather"][0]["description"];
            document.getElementById(value["name"] + "Pressure").textContent = value["main"]["pressure"] + " hpa";
            document.getElementById(value["name"] + "Humidity").textContent = value["main"]["humidity"] + " %";
            document.getElementById(value["name"] + "Coords").textContent = "[" + value["coord"]["lat"] + ", " + value["coord"]["lon"] + "]";
            document.getElementById(value["name"] + "Wind").parentNode.removeAttribute('style');
            document.getElementById(value["name"] + "Weather").parentNode.removeAttribute('style');
            document.getElementById(value["name"] + "Pressure").parentNode.removeAttribute('style');
            document.getElementById(value["name"] + "Humidity").parentNode.removeAttribute('style');
            document.getElementById(value["name"] + "Coords").parentNode.removeAttribute('style');
            document.getElementById(value["name"] + "Load").style.display = "none";
        }
        else {
            
        }
    }

    request.send();
}
}

function CloseCities() {
    array = Array.from(cities.values())
    for (let i = 0; i < array.length; i++) {
        const city = array[i];
        document.getElementById(city + "Temp").textContent = "-°C";
        document.getElementById(city + "Wind").parentNode.style.display = "none";
        document.getElementById(city + "Weather").parentNode.style.display = "none";
        document.getElementById(city + "Pressure").parentNode.style.display = "none";
        document.getElementById(city + "Humidity").parentNode.style.display = "none";
        document.getElementById(city + "Coords").parentNode.style.display = "none";
        document.getElementById(city + "Load").style.display = "block";
    }
}
