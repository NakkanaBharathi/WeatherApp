async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const result = document.getElementById("weatherResult");
  const apiKey = "efd6ce93f3aa8c23406d627b8e67b619"; // Replace with your real key

  if (!city) {
    result.innerHTML = "⚠️ Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      result.innerHTML = `❌ Error: ${data.message}`;
    } else {
      result.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temperature: ${data.main.temp} °C</p>
        <p>🌤️ Weather: ${data.weather[0].main}</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
      `;
    }
  } catch (err) {
    console.error("Fetch error:", err);
    result.innerHTML = "⚠️ Failed to fetch weather data.";
  }
}
