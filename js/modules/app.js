export default class App {

    constructor(apiKey) {

        this.apiKey = apiKey;
        this.location = {};
        this.weather = {};

    }

    getLocation() {

        return this.location;

    }

    getWeather() {

        return this.weather;

    }
    
    setLocation(location) {

        this.location = location;

    }

    setWeather(weather) {

        this.weather = weather;

    }
    
    parseLocation(object) {

        const {name, country, lat, lon} = object[0];
        return {name, country, lat, lon};

    }

    parseWeather(object) {

        function getLocationTime(timezoneOffset) {

            const date = new Date();
            const localTime = date.getTime();
            const localTimezone = date.getTimezoneOffset() * 60000;
            const currentUtcTime = localTime + localTimezone;
            const currentLocationTime = currentUtcTime + (timezoneOffset * 1000);
            
            return currentLocationTime;
        
        }

        const locationTime = getLocationTime(object.city.timezone);
        const locationDate = new Date(locationTime);

        const newObj = {

            date: locationDate,
            list: [],

        }

        for (let i = 0; i < object.list.length; i+=8) {

            const obj = object.list[i];

            newObj.list.push({

                temperature: obj.main.temp,
                feelsLike: obj.main.feels_like,
                humidity: obj.main.humidity,
                wind: obj.wind.speed,
                state: obj.weather[0].main,
                stateDescription: obj.weather[0].description,
                icon: obj.weather[0].icon,

            });

        }

        return newObj;

    }

    async fetchLocation(cityName) {

        try {

            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${this.apiKey}`);
            const geocodeObj = await response.json();

            return this.parseLocation(geocodeObj);

        } catch(error) {

            alert("Failed to fetch location data.");

        }

    }

    async fetchWeather(location = this.location) {

        try {

            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${this.apiKey}`);
            const weatherObj = await response.json();

            return this.parseWeather(weatherObj);

        } catch(error) {

            alert("Failed to fetch weather data.");

        }

    }

}