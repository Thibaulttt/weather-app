import { useEffect, useState } from "react";
import { getCurrentWeather } from "./api/weather";
import styles from "../styles/Landing.module.css";
import moment from "moment";
import Header from "../components/header";
import { Navigation } from "../components/navigation";

const LandingPage = () => {
    const [cityWeather, setCityWeather] = useState({});
    // metric (Celsius), imperial (Fahrenheit), null (Kelvin)
    const [unit, setUnit] = useState({ unit: "metric", label: "(C°)" });

    useEffect(() => {
        getCurrentWeather("Périgny", unit.unit).then((res) => {
            setCityWeather(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        Object.keys(cityWeather).length > 0 ? (
            <>
                <Navigation />
                <Header
                    name={cityWeather.name}
                    country={cityWeather.sys.country}
                    localDayTime={moment(new Date(cityWeather.dt * 1000)).format('LTS')}
                    iconLabel={cityWeather.weather[0].description}
                />
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
