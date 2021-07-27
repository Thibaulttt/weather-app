import Image from 'next/image';
import styles from "../styles/Landing.module.css";

const Header = ({ name, country, localDayTime, iconLabel }) => {
    function getIcon(iconLabel) {
        let iconName = '';
        switch (iconLabel) {
            case "clear sky":
                iconName = '/clear-day.svg';
                break;
            case "few clouds":
                iconName = '/few-clouds-day.svg';
                break;
            case "scattered clouds":
                iconName = '/scattered-clouds.svg';
                break;
            case "broken clouds":
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
                console.error("unknow description");
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