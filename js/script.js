var searchBtn = $('#searchBtn')
var searchData = document.getElementById('cityInput')
var listItem = document.createElement('button')
var prevCities = document.getElementById('prevCities')


searchBtn.on('click', searchCity)

var cities = [];
var cityInfo = [];

function searchCity(event) {
    event.preventDefault()

    var requestURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchData.value + '&units=imperial&appid=de4de53bbf62e4dc174f043136778a6f'
    
    fetch(requestURL)
    .then(function (response) {
        if (response.ok) {
        cities.push(searchData.value)
        return response.json()
        } else {
            alert('Error: City ' + response.statusText)
        }
    })
    .then(function (data) {
        console.log(data)
        var lat = data.coord.lat
        var lon = data.coord.lon;
        console.log(data.coord.lat)
        console.log(data.coord.lon)
        var mainIcon = data.weather
        $('#cityName').text(data.name + ' (' + moment().format('MM/DD/YY') + ') ')
        $('#firstIcon').attr('src', 'http://openweathermap.org/img/wn/' + mainIcon[0].icon + '.png')

        

        function secondCall() {
            var requestURL2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=de4de53bbf62e4dc174f043136778a6f'
            
            fetch(requestURL2)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data)
                $('#cityTemp').text('Temp: ' + data.current.temp + '°')
                $('#cityWind').text('Wind: ' + data.current.wind_speed + ' MPH')
                $('#cityHumidity').text('Humidity: ' + data.current.humidity + ' %')
                $('#cityUV').text('UV Index: ' + data.current.uvi)

                for (var t = 0; t < 5; t++) {
                    $('#forecastBox').children('section').eq(t).children().eq(0).text(moment().add(t + 1, 'days').format('MM/DD/YY'))
                    var dateData = data.daily
                    var iconData = dateData[t].weather

                    $('#forecastBox').children('section').eq(t).children().eq(1).attr('src', 'http://openweathermap.org/img/wn/' + iconData[0].icon + '.png')
                    $('#forecastBox').children('section').eq(t).children().eq(2).text('Temp: ' + dateData[t].temp.day)
                    $('#forecastBox').children('section').eq(t).children().eq(3).text('Wind: ' + dateData[t].wind_speed)
                    $('#forecastBox').children('section').eq(t).children().eq(4).text('Humidity: ' + dateData[t].humidity)
                }
            })
        }
        secondCall()
    })
    document.querySelector("#cityInput").value = ""
}

$('#searchBtn').trigger('click')
