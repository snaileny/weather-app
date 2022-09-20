export default class UI {

    constructor() {

        this.elements = {

            locationInfo: document.querySelector("#location-info"),
            unitSelector: document.querySelector("#unit-selection"),

            currentWeather: document.querySelector(".current-weather"),
            currentTemperature: document.querySelector("#current-temperature"),
            currentWeatherState: document.querySelector("#current-weather-state"),
            currentWeatherIcon: document.querySelector("#current-weather-icon"),
            currentDay: document.querySelector("#current-day"),
            feelsLike: document.querySelector("#feels-like"),
            humidity: document.querySelector("#humidity"),
            pressure: document.querySelector("#pressure"),
            wind: document.querySelector("#wind"),
            calenderList: document.querySelector(".calender-list")

        }

    }

    formatTemperature(temperature) {

        const selectedUnit = this.elements.unitSelector.value;
        let convertedTemp;

        switch(selectedUnit) {

            case "Kelvin":
                convertedTemp = Math.ceil(temperature) + "°K";
                break;

            case "Celsius":
                convertedTemp = Math.ceil((temperature - 273)) + "°C";
                break;

            case "Fahrenheit":
                convertedTemp = Math.ceil((1.8 * (temperature - 273) + 32)) + "°F";
                break;

        }

        return convertedTemp;

    }

    render(location, weather) {

        this.renderLocationInfo(location);
        this.renderCurrentWeather(weather);
        this.renderCalenderWeather(weather);

    }

    renderLocationInfo(location) {
        
        this.elements.locationInfo.textContent = `${location.name}, ${location.country}`;

    }

    renderCurrentWeather(weather) {

        const date = weather.date;
        const currentDay = date.toLocaleString("en-US", {weekday:"long"});

        this.elements.currentTemperature.textContent = this.formatTemperature(weather.list[0].temperature);
        this.elements.currentWeatherState.textContent = weather.list[0].state;
        this.elements.currentWeatherIcon.src = `http://openweathermap.org/img/wn/${weather.list[0].icon}@4x.png`;

        this.elements.currentDay.textContent = currentDay;
        this.elements.feelsLike.textContent = "Feels Like: " + this.formatTemperature(weather.list[0].feelsLike);
        this.elements.humidity.textContent = "Humidity: " + weather.list[0].humidity + "%";
        this.elements.wind.textContent = "Wind: " + weather.list[0].wind + "m/s";

    }

    renderCalenderWeather(weather) {

        const date = weather.date;
        const isDayTime = date.getHours() > 6 && date.getHours() < 20;
        const currentDay = date.toLocaleString("en-US", {weekday:"long"});
        const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const index = week.indexOf(currentDay);
        const days = week.slice(index, index + 5);

        if (isDayTime) {

            this.elements.currentWeather.classList.remove("night");
            this.elements.currentWeather.classList.add("day");

        } else {

            this.elements.currentWeather.classList.remove("day");
            this.elements.currentWeather.classList.add("night");

        }

        this.elements.calenderList.innerHTML = "";

        for (let i = 1; i < weather.list.length; i++) {

            const li = document.createElement("li");
            li.className = "calender-element";
    
            const pDay = document.createElement("p");
            pDay.className = "calender-day";
            pDay.textContent = days[i];
    
            const img = document.createElement("img");
            img.className = "calender-weather-icon";
            img.src = `http://openweathermap.org/img/wn/${weather.list[i].icon}@2x.png`;
    
            const div = document.createElement("div");
    
            const pTemperature = document.createElement("p");
            pTemperature.className = "calender-temperature";
            pTemperature.textContent = this.formatTemperature(weather.list[i].temperature);
    
            const pWeather = document.createElement("p");
            pWeather.className = "calender-weather";
            pWeather.textContent = weather.list[i].state;

            div.appendChild(pTemperature);
            div.appendChild(pWeather);
            li.appendChild(pDay);
            li.appendChild(img);
            li.appendChild(div);
            this.elements.calenderList.appendChild(li);

        }


    }

}