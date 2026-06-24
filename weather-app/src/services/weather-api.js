export class WeatherAPI {
    constructor(key, baseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline") {
        this.key = key;
        this.baseUrl = baseUrl;
    }

    async getData(location) {
        const query = `${this.baseUrl}/${encodeURIComponent(location)}?key=${this.key}`;

        const response = await fetch(query);
        if (!response.ok) {
            throw new Error(`Weather API request failed: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }
}