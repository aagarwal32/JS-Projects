import { WeatherDataModel, ForecastDayModel } from "../models/weather-data.js";

export class WeatherDisplay {
    constructor(dataContainer, weatherAPI) {
        this.dataContainer = document.querySelector(`#${dataContainer}`);
        this.weatherAPI = weatherAPI;
    }

    async displayData(location, range = [1, 6]) {
        // clear previous results
        this.dataContainer.replaceChildren();

        // initialize error div (hidden by default)
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('data-div', 'error');
        this.dataContainer.appendChild(errorDiv);

        // call api
        let weatherData;
        try {
            weatherData = await this.weatherAPI.getData(location);
        } catch (error) {
            errorDiv.classList.add('visible');
            errorDiv.textContent = error.message;
            return;
        }
        errorDiv.classList.remove('visible');
        
        // create and populate weather data models
        const forecast = weatherData.days.slice(range[0], range[1]).map(day =>
            new ForecastDayModel(day.datetime, day.conditions, day.tempmax, day.tempmin)
        );
        const model = new WeatherDataModel(
            weatherData.address,
            weatherData.currentConditions.temp,
            weatherData.currentConditions.conditions,
            weatherData.currentConditions.windspeed,
            forecast
        );

        // create today div
        const todayDiv = document.createElement('div');
        todayDiv.classList.add('data-div', 'today-div');
        todayDiv.textContent = `${model.city}\n${model.temp}°\n${model.condition}\nWind: ${model.windSpeed}`;

        // future forecast div
        const forecastContainer = document.createElement('div');
        forecastContainer.classList.add('data-div', 'forecast-container');

        model.forecast.forEach(day => {
            const forecastDayDiv = document.createElement('div');
            forecastDayDiv.classList.add('data-div', 'forecast-day-div');
            forecastDayDiv.textContent = `${day.date}\n${day.condition}\nHigh: ${day.tempHigh}°\nLow: ${day.tempLow}°`;
            forecastContainer.appendChild(forecastDayDiv);
        });

        // append DOM elements to main container
        this.dataContainer.appendChild(todayDiv);
        this.dataContainer.appendChild(forecastContainer);
    }
}