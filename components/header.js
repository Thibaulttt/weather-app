import Image from 'next/image';
import styles from "../styles/Landing.module.css";
import moment from "moment";
import { dayFormat, times } from "../utils/dayTimes";

const Header = ({ name, country, localDayTime, iconLabel }) => {
    // https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
    function getIcon(iconLabel) {
        console.info(iconLabel, moment(localDayTime, dayFormat))
        let iconName = '';
        let sunIsUp = moment(localDayTime, dayFormat).isBetween(times.dawnBeginning, times.twilightBeginning)
        switch (iconLabel) {
            case "clear sky":
                iconName = sunIsUp ? '/clear-day.svg' : '/night.svg';
                break;
            case "few clouds":
                iconName = '/few-clouds-day.svg';
                break;
            case "scattered clouds":
                iconName = '/scattered-clouds.svg';
                break;
            case "broken clouds":
            case "overcast clouds":
                iconName = '/broken-clouds.svg';
                break;
            case "shower rain":
                iconName = '/shower-rain.svg';
                break;
            case "rain":
                iconName = '/rain.svg';
                break;
            case "thunderstorm":
                iconName = '/storm.svg';
                break;
            case "snow":
                iconName = '/snow.svg';
                break;
            case "mist":
                iconName = '/mist.svg';
                break;
            default:
                iconName = '/default.svg';
        }
        return iconName;
    }

    return (
        <div className={styles.headerContainer}>
            <div className={styles.titleContainer}>
                <h1>{name}</h1>
                <h3>{country}</h3>
                <h3>{localDayTime}</h3>
            </div>
            <Image
                src={getIcon(iconLabel)}
                alt={iconLabel}
                width={300}
                height={300}
            />
        </div>
    );
}

export default Header;