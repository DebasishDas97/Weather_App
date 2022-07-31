const apiKey = "e79c6f239900ae96018f0a9dbac87428"

const searchInput = document.querySelector('.search-bar')
const searchBtn = document.getElementById('search-btn')

// showValues(searchInput.value = 'Assam')
async function fetchWeatherData(city = 'Assam') {
  const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey)
  if (response.ok) {
    return response.json()
  } throw new Error(response.statusText);
}

function showValues(value) {
  document.querySelector('.city').textContent = `Weather in ${value.name}`
  document.querySelector('.temp').textContent = `${value.main.temp}°C`
  document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + value.weather[0].icon + ".png";
  document.querySelector('.description').textContent = value.weather[0].description
  document.querySelector('.humidity').textContent = `Humidity : ${value.main.humidity}%`
  document.querySelector('.wind').textContent = `Wind Speed: ${value.wind.speed} km/h`
  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + value.name + "')";
}

async function getAndRenderWeather(city) {
  const result = await fetchWeatherData(city)
  showValues(result)
}

searchBtn.addEventListener('click', async () => {
  let searchValue = searchInput.value
  if (searchValue)
    getAndRenderWeather(searchValue)
})

getAndRenderWeather()