import { useEffect, useState } from "react";
import { getCurrentWeather } from "./api/weather";
import styles from "../styles/Landing.module.css";
import moment from "moment";
import Header from "../components/header";
import { TopBar } from "../components/topBar";
import { darkTheme } from "../styles/darkTheme";

const LandingPage = () => {
    const [cityWeather, setCityWeather] = useState({});
    const [localDayTime, setLocalDayTime] = useState("");
    const format = 'hh:mm:ss a';
    const startingDawnTime = moment('06:00:00 am', format);
    const startingDayTime = moment('09:00:00 am', format);
    const startingTwilightTime = moment('06:00:00 pm', format);
    const startingNightTime = moment('09:00:00 pm', format);

    // metric (Celsius), imperial (Fahrenheit), null (Kelvin)
    const [unit, setUnit] = useState({ unit: "metric", label: "(C°)" });

    function updateWeather(city) {
        getCurrentWeather(city, unit.unit).then((res) => {
            setCityWeather(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    function submitCity(event) {
        event.preventDefault();
        updateWeather(event.target.city.value);
    }

    // function called after the state "cityWeather" is called
    useEffect(() => {
        // get the utc time and add the timezone shift
        setLocalDayTime(moment.utc().add(cityWeather.timezone, "seconds").format(format));
    }, [cityWeather]);

    useEffect(() => {
        updateWeather("Paris");
    }, []);

    return (
        Object.keys(cityWeather).length > 0 ? (
            <>
                <TopBar updateWeather={submitCity} />
                <Header
                    name={cityWeather.name}
                    country={cityWeather.sys.country}
                    localDayTime={localDayTime}
                    iconLabel={cityWeather.weather[0].description}
                />
                {!moment(localDayTime, format).isBetween(startingDayTime, startingNightTime) && (
                    <style jsx global>{darkTheme}</style>
                )}
                <div className={styles.tablesContainer}>
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
                </div>
            </>
        ) : (
            <div></div>
        )
    )
}

export default LandingPage;
