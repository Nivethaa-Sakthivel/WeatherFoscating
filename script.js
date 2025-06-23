const apiKey = "9a7a9ae2abb45eac2960fa0cc1298183";

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return alert("Please enter a city name.");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        alert("City not found!");
        return;
      }

      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const description = data.weather[0].description;
      const main = data.weather[0].main;

      document.getElementById("weatherInfo").innerHTML = `
        <div class="weather-box"><strong>City</strong>${city}</div>
        <div class="weather-box"><strong>Temperature</strong>${temp}°C</div>
        <div class="weather-box"><strong>Humidity</strong>${humidity}%</div>
        <div class="weather-box"><strong>Condition</strong>${description}</div>
      `;

      setVideoBackground(main);
      showMap(city);
    })
    .catch(error => {
      alert("Error fetching weather data!");
    });
}

function showMap(city) {
  const mapSection = document.getElementById("mapSection");
  mapSection.innerHTML = `
    <iframe 
      src="https://www.google.com/maps?q=${city}&output=embed" 
      allowfullscreen
    ></iframe>
  `;
}

function setVideoBackground(condition) {
  const video = document.getElementById("bgVideo");

  let videoSrc = "";

  switch (condition) {
    case 'Clear':
      videoSrc = "clear cloud.mp4";
      break;
    case 'Clouds':
      videoSrc = "cloudy.mp4";
      break;
    case 'Rain':
    case 'Drizzle':
      videoSrc = "rain.mp4";
      break;
    case 'Thunderstorm':
      videoSrc = "thunderstorm.mp4";
      break;
    case 'Snow':
      videoSrc = "snow.mp4";
      break;
    default:
      videoSrc = "summer.mp4";
  }

  video.src = videoSrc;
  video.load();
  video.play();
}
