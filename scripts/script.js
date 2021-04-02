function load () {
    section1 = document.getElementById("main_sec1");
    section2 = document.getElementById("main_sec2");

    section1.style.display = 'none';
    section2.style.display = 'none';

    main.innerHTML = main.innerHTML + `<div id="mload">Подождите данные загружаются...</div>`;
    //setTimeout(() => main.innerHTML = `<div id="mload">Подождите данные загружаются.. </div>`, 1000)
    //setTimeout(() => main.innerHTML = `<div id="mload">Подождите данные загружаются...</div>`, 2000)
}

function unload () {
    section1 = document.getElementById("main_sec1");
    section2 = document.getElementById("main_sec2");

    section1.removeAttribute('style');
    section2.removeAttribute('style');

    document.getElementById("mload").remove();
}

function loaderror(code){
    document.getElementById("mload").innerHTML = "Error: " + code;
}

window.onload = function () {
    
    load();
    LoadCities();
    RefreshCities();

    btnAddCity = document.getElementById("btnAddCity");
    textBox = document.getElementById("newCity");

    btnAddCity.onclick = function() {
        favorites = document.getElementById("favorite");
        if(!cities.has("textBox.value")){

        var request = new XMLHttpRequest();
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + textBox.value + "&units=metric&appid=a013324cdcd65a54ee5b6c5c40271e96";
        request.open('GET', url);
        request.responseType = 'json';
        var value;

        request.onload = function() {
            value = request.response;
            console.log(value);
            if (value["cod"] == 200){
                favorites.innerHTML = favorites.innerHTML + `<section id="` + value["name"] + `">
                <div><span class="fav_city">` + value["name"] + `</span><span id="` + value["name"] + `Temp" class="fav_temp">` + value["main"]["temp_max"] + `°C</span><img id="` + value["name"] + `Img" src="images/` + value["weather"][0]["icon"] + `@4x.png" class="fav_img" /><button name="` + value["main"]["temp_max"] + `" class="fav_btn" onclick="deleteElement(this)">×</button></div>
                <div class="section_item"><span class="atr">Ветер</span><span id="` + value["name"] + `Wind" class="value">` + value["wind"]["speed"] + " m/s" + `</span></div>
                <div class="section_item"><span class="atr">Облачность</span><span id="` + value["name"] + `Weather" class="value">` + value["weather"][0]["description"] + `</span></div>
                <div class="section_item"><span class="atr">Давление</span><span id="` + value["name"] + `Pressure" class="value">` + value["main"]["pressure"] + " hpa" + `</span></div>
                <div class="section_item"><span class="atr">Влажность</span><span id="` + value["name"] + `Humidity" class="value">` + value["main"]["humidity"] + " %" + `</span></div>
                <div class="section_item"><span class="atr">Координаты</span><span id="` + value["name"] + `Coords" class="value">` + "[" + value["coord"]["lat"] + ", " + value["coord"]["lon"] + "]" + `</span></div>
                <div id="` + value["name"] + `Load" class="fload" style="display: none;"></div>
                </section>`;
                textBox.value = "";
                cities.add(value["name"]);
                localStorage.setItem('cities', JSON.stringify(Array.from(cities.values())));
            }
            else {
                textBox.placeholder = "Error " + value["cod"] + ": " + value["message"];
                textBox.value = "";
            }
        }

        request.send();}
    }

    textBox.onclick = function() {
        textBox.placeholder = "Добавить новый город";
    }

    btnRefresh = document.getElementById("btn_refresh");

    btnRefresh.onclick = function() {
        CloseCities();
        load();

        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + localStorage.getItem("city") + "&units=metric&appid=a013324cdcd65a54ee5b6c5c40271e96";
        getMainWeather(url);
        RefreshCities();
    }
}
