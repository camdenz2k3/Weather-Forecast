var APIKey = "d4b7dac23a9c9ae4defc1fcc6412365c"
var input = $("#input")
var searchCityButton = $("#search-city-button")
var searchHistory = $("#search-history")

function getLocalStorage() {
    var localInputStorage = localStorage.getItem("input")
    var searchHistoryEl = $("<p>").text(localInputStorage)
    searchHistory.append(searchHistoryEl)
}

getLocalStorage()

function search() {
    var inputValue =input.val()
    theWeather(inputValue)
    theForecast(inputValue)
    localStorage.setItem("input", inputValue)
    var localInputStorage = localStorage.getItem("input")
    var searchHistoryEl = $("<p>").text(localInputStorage)
    searchHistory.append(searchHistoryEl)
    input.val("")
}

searchCityButton.on("click", search)

function theWeather(input) {
    var link = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=" + APIKey;
    fetch (link)
    .then(response => response.json())
    .then(data => {
        var cityName = data.name
        var icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        $("#city-name").text(cityName + " " + moment().format('MM/DD/YY'))
        $('#icon').attr("src", icon)
        var temp = "Temperature: " + Math.floor(data.main.temp) + "° F"
        $("#temp").text(temp)
        var wind = "Wind Speed: " + Math.floor(data.wind.speed) + " MPH"
        $('#wind').text(wind)
        var humidity = "Humidity: " + data.main.humidity + "%"
        $("#humidity").text(humidity)
    })
}

function theForecast(input) {
    var link = "https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&units=imperial&appid=" + APIKey;
    fetch (link)
    .then(response => response.json())
        .then(data => {
            for (var i = 4; i < data.list.length; i += 8) {
                var card = $('<div>').addClass('card col-2')
                var dateCard = $('<h5>').addClass('card-header')
                var icon = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`
                dateCard.text(moment.unix(data.list[i].dt).format("dddd"))
                var icons = $('<img>').attr("src", icon).addClass('icons')
                var ul = $('<ul>').addClass('list-group list-group-flush')
                var temp = $('<li>').addClass('list-group-item')
                temp.text("Temp: " + Math.floor(data.list[i].main.temp) + "° F")
                var wind = $('<li>').addClass('list-group-item')
                wind.text("Wind: " + Math.floor(data.list[i].wind.speed) + " MPH")
                var humidity = $('<li>').addClass('list-group-item')
                humidity.text("Humidity: " + data.list[i].main.humidity + "%")
                ul.append(temp, wind, humidity)
                card.append(dateCard, icons, ul)
                $('#five-cards').append(card)
            }
        })
    }