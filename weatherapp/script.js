const API_KEY = "YOUR_API_KEY"; // Replace with your API key

// Get weather on load via geolocation
window.onload = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeatherByCoords(latitude, longitude);
    });
  }
};

async function getWeatherByCoords(lat, lon) {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const [weatherRes, forecastRes] = await Promise.all([
    fetch(weatherURL),
    fetch(forecastURL),
  ]);

  const weatherData = await weatherRes.json();
  const forecastData = await forecastRes.json();

  displayWeather(weatherData);
  displayForecast(forecastData);
  changeBackground(weatherData.weather[0].main);
}

async function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) return;

  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  const [weatherRes, forecastRes] = await Promise.all([
    fetch(weatherURL),
    fetch(forecastURL),
  ]);

  const weatherData = await weatherRes.json();
  const forecastData = await forecastRes.json();

  if (weatherData.cod === "404") {
    document.getElementById("weatherCard").innerHTML = `<p>City not found</p>`;
    document.getElementById("weatherCard").style.display = "block";
    document.getElementById("forecast").style.display = "none";
    return;
  }

  displayWeather(weatherData);
  displayForecast(forecastData);
  changeBackground(weatherData.weather[0].main);
}

function displayWeather(data) {
  const card = document.getElementById("weatherCard");
  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  card.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="${icon}" alt="${data.weather[0].description}" />
    <h3>${Math.round(data.main.temp)}°C</h3>
    <p>${data.weather[0].description}</p>
  `;
  card.style.display = "block";
}

function displayForecast(data) {
  const forecastEl = document.getElementById("forecast");
  const forecastList = data.list.filter((item) => item.dt_txt.includes("12:00:00")); // Daily at noon

  forecastEl.innerHTML = forecastList
    .map((day) => {
      const date = new Date(day.dt_txt);
      const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
      const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
      const temp = Math.round(day.main.temp);

      return `
        <div class="forecast-day">
          <p>${weekday}</p>
          <img src="${icon}" alt="${day.weather[0].description}" />
          <p>${temp}°C</p>
        </div>
      `;
    })
    .join("");

  forecastEl.style.display = "grid";
}

function changeBackground(weatherMain) {
  const body = document.body;

  const weatherBackgrounds = {
    Clear: "linear-gradient(to right, #fceabb, #f8b500)",
    Clouds: "linear-gradient(to right, #bdc3c7, #2c3e50)",
    Rain: "linear-gradient(to right, #4b79a1, #283e51)",
    Thunderstorm: "linear-gradient(to right, #141E30, #243B55)",
    Snow: "linear-gradient(to right, #83a4d4, #b6fbff)",
    Mist: "linear-gradient(to right, #3e5151, #decba4)",
    Drizzle: "linear-gradient(to right, #4CA1AF, #C4E0E5)",
    Haze: "linear-gradient(to right, #636363, #a2ab58)",
  };

  body.style.background = weatherBackgrounds[weatherMain] || "#009ffd";
}
