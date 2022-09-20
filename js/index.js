import App from "./modules/app.js";
import UI from "./modules/ui.js";

const API_KEY = "3df0f4e4788d46ed7c9de3de3b857d95";
const app = new App(API_KEY);
const ui = new UI();
const searchBox = document.querySelector("#location-input");

async function init(value) {

    const location = await app.fetchLocation(value);
    app.setLocation(location);
    const weather = await app.fetchWeather();
    app.setWeather(weather);
    ui.render(app.getLocation(), app.getWeather());

}

init("Istanbul");

searchBox.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        const searchValue = searchBox.value;
        const location = app.getLocation();

        if (typeof searchValue === "string" && location.name.toLowerCase() !== searchValue.toLowerCase()) {

            init(searchValue);

        }

    }

});

document.addEventListener("click", (e) => {

    if (e.target.tagName === "SELECT") {

        ui.render(app.getLocation(), app.getWeather());

    }

});
