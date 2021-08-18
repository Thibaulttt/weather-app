import { useEffect, useState } from "react";
import { getCurrentWeather } from "./api/weather";
import styles from "../styles/Landing.module.css";
import moment from "moment";
import Header from "../components/header";
import { TopBar } from "../components/topBar";
import { nightTheme } from "../styles/nightTheme";
import { dawnTheme } from "../styles/dawnTheme";
import { twilightTheme } from "../styles/twilightTheme";
import { dayTheme } from "../styles/dayTheme";
import { dayFormat, times } from "../utils/dayTimes";

const LandingPage = () => {
    const [cityWeather, setCityWeather] = useState({});
    const [localDayTime, setLocalDayTime] = useState("");
    const [theme, setTheme] = useState(dayTheme);

    // metric (Celsius), imperial (Fahrenheit), null (Kelvin)
    const [unit, setUnit] = useState({ unit: "metric", label: "(C°)" });

    function updateWeather(city) {
        getCurrentWeather(city, unit.unit).then((res) => {
            setCityWeather(res.data);
        }).catch((err) => {
            if (JSON.parse(err.request.response).message == "city not found") {
                alert("Aucune ville trouvée");
            } else {
                alert("Une erreur est survenue lors de la récupération des données");
            }
        });
    }

    function submitCity(event) {
        event.preventDefault();
        updateWeather(event.target.city.value);
    }

    // function called after the state "cityWeather" is called
    useEffect(() => {
        // get the utc time and add the timezone shift
        if (cityWeather.timezone) setLocalDayTime(moment.utc().add(cityWeather.timezone, "seconds").format(dayFormat));
    }, [cityWeather]);

    useEffect(() => {
        // set the theme according to the time of the day
        if (moment(localDayTime, dayFormat).isBetween(times.dawnBeginning, times.dayBeginning)) {
            setTheme(dawnTheme);
        }

        if (moment(localDayTime, dayFormat).isBetween(times.dayBeginning, times.twilightBeginning)) {
            setTheme(dayTheme);
        }

        if (moment(localDayTime, dayFormat).isBetween(times.twilightBeginning, times.nightBeginning)) {
            setTheme(twilightTheme);
        }

        if (moment(localDayTime, dayFormat).isBetween(times.nightBeginning, times.midnightPm) ||
            moment(localDayTime, dayFormat).isBetween(times.midnightAm, times.dawnBeginning)) {
            setTheme(nightTheme);
        }
    }, [localDayTime]);

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
                <style jsx global>{theme}</style>
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
