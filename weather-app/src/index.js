import "./styles.css";
import { WeatherAPI } from "./services/weather-api.js";
import { WeatherDisplay } from "./interface/weather-display.js";

const API_KEY = "979P5VXXPAZT7B9H3HG6V67YR"; // free api key exposed, but this is for practice

const weatherAPI = new WeatherAPI(API_KEY);
const weatherDisplay = new WeatherDisplay("weather-data-container", weatherAPI);

const searchInput = document.querySelector("#search-city-input");
const searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (!city) return;
    weatherDisplay.displayData(city);
});
