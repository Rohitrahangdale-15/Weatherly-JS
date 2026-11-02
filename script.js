const weatherApi = {
    key: "YOUR_API_KEY",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
};
const txtInput = document.getElementById("input-box");
const btnWeather = document.getElementById("button");

const divWeatherBody = document.getElementById("weather-body");
const divErrorMessage = document.getElementById("error-message");

const hTemp = document.getElementById("temp");
const hCity = document.getElementById("city");

const pDate = document.getElementById("date");
const pMinMax = document.getElementById("min-max");
const pWeather = document.getElementById("weather");
const pHumidity = document.getElementById("humidity");
const pWind = document.getElementById("wind");
const pPressure = document.getElementById("pressure");

txtInput.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        await getWeatherReport(event.target.value);
    }
});
btnWeather.addEventListener("click", async () => {
    await getWeatherReport(txtInput.value);
});
async function getWeatherReport(city) {
    try {
        const response = await fetch(
         `${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`
         );
         if (!response.ok) {
         throw new Error("City not found!");
    }
        const data = await response.json();

        showWeatherReport(data);

        divWeatherBody.classList.remove("d-none");
        divErrorMessage.classList.add("d-none");

    } catch (error) {
        console.log(`Error: ${error}`);

        divWeatherBody.classList.add("d-none");
        divErrorMessage.classList.remove("d-none");
    }
}
function showWeatherReport(weather) {

    hCity.innerText = `${weather.name}, ${weather.sys.country}`;

    pDate.innerText = formatDate(new Date());

    hTemp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    pMinMax.innerHTML = `${Math.floor(
    weather.main.temp_min
    )}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    pWeather.innerText = `${weather.weather[0].main}`;

    pHumidity.innerText = `${weather.main.humidity}%`;

    pWind.innerText = `${(weather.wind.speed * 3.6).toFixed(1)} Kmph`;

    pPressure.innerText = `${weather.main.pressure} hPa`;

    updateBackground(weather.weather[0].main);
}
function formatDate(date) {
    const obj = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return date.toLocaleDateString(undefined, obj);
}
function updateBackground(weathertype) {
    const backgrounds = {
        Clear: "images/Clear.jpg",
        Clouds: "images/Clouds.jpg",
        Haze: "images/Clouds.jpg",
        Mist: "images/Clouds.jpg",
        Fog: "images/Clouds.jpg",
        Rain: "images/Rain.jpg",
        Drizzle: "images/Rain.jpg",
        Thunderstorm: "images/Thunder.jpg",
        Sunny: "images/Sunny.jpg",
        Snow: "images/Snow.jpg",
    };

    document.body.style.backgroundImage =
        `url(${backgrounds[weathertype] || "images/Clear.jpg"})`;
}
function clearWeatherDisplay() {
    hCity.innerText = "";
    pDate.innerText = "";
    pHumidity.innerText = "";
    pMinMax.innerText = "";
    pPressure.innerText = "";
    pWeather.innerText = "";
    hTemp.innerText = "";
    pWind.innerText = "";
}