import styles from '../styles/Home.module.css';
import LandingPage from './landing';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <LandingPage />
      </div>
    </div>
  );
};
