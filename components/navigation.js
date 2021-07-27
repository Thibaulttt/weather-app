import styles from "../styles/Landing.module.css";

const Navigation = () => {

    return (
        <div className={styles.navigationContainer}>
            <form className={styles.searchForm}>
                <input className={styles.searchInput} />
                <button type="submit">Rechercher</button>
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
    Navigation
};