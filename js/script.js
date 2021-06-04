var searchBtn = $('#searchBtn')
var searchDate = $('#cityInput')
var listItem = document.createElement('button')
var prevCities = $('#prevCities')


searchBtn.on('click', searchCity)

function searchCity(event) {
    event.preventDefault()
    listItem.textContent = searchDate.val()
    listItem.classList.add('btn', 'btn-light', 'my-2', 'cityLi')
    prevCities.append(listItem)
}