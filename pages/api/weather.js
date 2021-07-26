import axios from "axios";
import API_URL from "./env";

function getCurrentWeather(city, units) {
    return units ? axios.get(API_URL + '?q=' + city + '&units=' + units + '&appid=' + process.env.API_KEY) : axios.get(API_URL + '?q=' + city + '&appid=' + process.env.API_KEY);
}

export {
    getCurrentWeather
};
