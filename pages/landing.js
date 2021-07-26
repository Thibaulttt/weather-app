import { useEffect, useState } from "react";
import { getCurrentWeather } from "./api/weather";
import styles from "../styles/Landing.module.css";
import moment from "moment";

const LandingPage = () => {
    const [cityWeather, setCityWeather] = useState({});
    // metric (Celsius), imperial (Fahrenheit), null (Kelvin)
    const [unit, setUnit] = useState({ unit: "metric", label: "(C°)" });
    const [localDayTime, setLocalDayTime] = useState(null);

    useEffect(() => {
        getCurrentWeather("Périgny", unit.unit).then((res) => {
            setCityWeather(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        let utcTime = cityWeather.dt / 60;
        setLocalDayTime(moment(new Date(cityWeather.dt * 1000)).format('LTS'));
    }, [cityWeather]);

    function getIcon(description) {
        let iconName = '';
        switch (description) {
            case "clear sky":
                iconName = 'clear-day.svg';
                break;
            case "few clouds":
                iconName = 'few-clouds-day.svg';
                break;
            case "scattered clouds":
                iconName = 'scattered-clouds.svg';
                break;
            case "broken clouds":
                iconName = 'broken-clouds.svg';
                break;
            case "shower rain":
                iconName = 'shower-rain.svg';
                break;
            case "rain":
                iconName = 'rain.svg';
                break;
            case "thunderstorm":
                iconName = 'storm.svg';
                break;
            case "snow":
                iconName = 'snow.svg';
                break;
            case "mist":
                iconName = 'mist.svg';
                break;
            default:
                console.error("unknow description");
        }
        return iconName;
    }

    return (
        Object.keys(cityWeather).length > 0 ? (
            <>
                <div className={styles.headerContainer}>
                    <div className={styles.titleContainer}>
                        <h1>{cityWeather.name}</h1>
                        <h3>{cityWeather.sys.country}</h3>
                        <h3>{localDayTime}</h3>
                    </div>
                    <img className={styles.weatherIcon} src={getIcon(cityWeather.weather[0].description)} alt={cityWeather.weather[0].description}></img>
                </div>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            <th>Tempétature {unit.label}</th>
                            <th>Tempétature ressentie {unit.label}</th>
                            <th>Température minimum {unit.label}</th>
                            <th>Tempétature maximum {unit.label}</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        <tr>
                            <td>{cityWeather.main.temp}</td>
                            <td>{cityWeather.main.feels_like}</td>
                            <td>{cityWeather.main.temp_min}</td>
                            <td>{cityWeather.main.temp_max}</td>
                        </tr>
                    </tbody>
                </table>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            <th>Pression</th>
                            <th>Humidité</th>
                            <th>Vent (direction)</th>
                            <th>Vent (vitesse)</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        <tr>
                            <td>{cityWeather.main.pressure}</td>
                            <td>{cityWeather.main.humidity}</td>
                            <td>{cityWeather.wind.deg}</td>
                            <td>{cityWeather.wind.speed}</td>
                        </tr>
                    </tbody>
                </table>
            </>
        ) : (
            <div></div>
        )
    )
}

export default LandingPage;
