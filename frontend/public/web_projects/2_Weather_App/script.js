document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    const weatherData = document.getElementById('weatherData');

    searchBtn.onclick = async () => {
        const coords = input.value.trim();
        if (!coords) return;

        const API_KEY = '4cd0e142cf3540e8efdfe678ffb8145c5';
        weatherData.innerHTML = `<div class="loader" style="animation: pulse 1s infinite alternate;">Scanning Atmosphere...</div>`;

        try {
            // --- TRY OPENWEATHER FIRST ---
            let owUrl;
            const coordRegex = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/;
            const match = coords.match(coordRegex);

            if (match) {
                owUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${match[1]}&lon=${match[3]}&appid=${API_KEY}&units=metric`;
            } else {
                owUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(coords)}&appid=${API_KEY}&units=metric`;
            }

            const owRes = await fetch(owUrl);
            const owData = await owRes.json();

            if (owData.cod !== 200) throw new Error("OpenWeather Unavailable");

            renderWeather(
                `${owData.name}, ${owData.sys.country}`,
                Math.round(owData.main.temp),
                owData.weather[0].description,
                `Wind: ${owData.wind.speed} m/s | Hum: ${owData.main.humidity}%`,
                "OPENWEATHER (PRIMARY)"
            );

        } catch (e) {
            // --- FALLBACK TO OPEN-METEO ---
            console.warn("OpenWeather Failed, falling back to Open-Meteo...");
            weatherData.innerHTML = `<div class="loader" style="animation: pulse 1s infinite alternate;">OpenWeather Offline. Using Secondary Link...</div>`;

            try {
                let lat, lon, locName;
                const coordRegex = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/;
                const match = coords.match(coordRegex);

                if (match) {
                    lat = match[1];
                    lon = match[3];
                    locName = "Target Coordinates";
                } else {
                    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(coords)}&count=1&language=en&format=json`;
                    const geoRes = await fetch(geoUrl);
                    const geoData = await geoRes.json();
                    if (!geoData.results || geoData.results.length === 0) throw new Error("Location not found");
                    const city = geoData.results[0];
                    lat = city.latitude;
                    lon = city.longitude;
                    locName = `${city.name}, ${city.country}`;
                }

                const metUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
                const metRes = await fetch(metUrl);
                const metData = await metRes.json();

                renderWeather(
                    locName,
                    Math.round(metData.current_weather.temperature),
                    "Atmospheric scan via Meteo",
                    `Wind: ${metData.current_weather.windspeed} km/h`,
                    "OPEN-METEO (FALLBACK ACTIVE)"
                );
            } catch (fallbackError) {
                weatherData.innerHTML = `<div style="color: #ff4d4d; font-weight: bold;">Dual-Link Failure. All Atmospheric Feeds Offline.</div>`;
            }
        }

        function renderWeather(loc, temp, desc, stats, source) {
            weatherData.innerHTML = `
                <div class="desc" style="font-weight: 600; color: #fff; margin-bottom: 5px;">${loc}</div>
                <div class="temp">${temp}°C</div>
                <div class="desc">${desc}</div>
                <div class="desc" style="margin-top: 5px; opacity: 0.7;">${stats}</div>
                <div class="desc" style="margin-top: 15px; font-size: 0.8em; font-weight: 700; color: #ffeb3b; letter-spacing: 1px;">${source}</div>
            `;
            weatherData.style.opacity = '0';
            setTimeout(() => weatherData.style.opacity = '1', 50);
        }
    };

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchBtn.click();
    });

});
