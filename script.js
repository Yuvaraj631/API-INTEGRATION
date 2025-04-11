document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const city = document.getElementById('cityInput').value;
    const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key
  
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then(data => {
        const weatherCard = document.getElementById('weatherResult');
        weatherCard.classList.remove('hidden');
        weatherCard.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
          <p><strong>Weather:</strong> ${data.weather[0].description}</p>
          <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
          <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
        `;
      })
      .catch(error => {
        const weatherCard = document.getElementById('weatherResult');
        weatherCard.classList.remove('hidden');
        weatherCard.innerHTML = `<p style="color: red;">${error.message}</p>`;
      });
  });
  