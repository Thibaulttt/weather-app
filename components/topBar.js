import styles from "../styles/Landing.module.css";

const TopBar = ({ updateWeather }) => {
    return (
        <div className={styles.navigationContainer}>
            {/* <button className={styles.submitButton} onClick={updateWeather}>Rechercher</button> */}

            <form className={styles.searchForm} onSubmit={updateWeather} method="GET">
                <button className={styles.submitButton} type="submit">Rechercher</button>
                <input className={styles.searchInput} id="city" name="city" placeholder="Ville" autoComplete="off" required />
            </form>

            {/* <form>
                <input type="radio" id="radio2" name="radios" value="all" checked />
                <label for="radio1">FR</label>

                <input type="radio" id="radio1" name="radios" value="all" checked />
                <label for="radio1">EN</label>
            </form> */}
        </div>
    );
}

export {
    TopBar
};