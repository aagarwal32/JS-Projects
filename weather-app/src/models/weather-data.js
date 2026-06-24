export class WeatherDataModel {
    constructor(city, temp, condition, windSpeed = null, forecast = []) {
        this.city = city;
        this.temp = temp;
        this.condition = condition;
        this.windSpeed = windSpeed;
        this.forecast = forecast;
    }
}

export class ForecastDayModel {
    constructor(date, condition, tempHigh, tempLow) {
        this.date = date;
        this.condition = condition;
        this.tempHigh = tempHigh;
        this.tempLow = tempLow;
    }
}