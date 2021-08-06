import '../styles/global.css';
import Head from 'next/head';
import applyTheme from '../hooks/applyTheme';
import { darkTheme } from '../styles/darkTheme';

function MyApp({ Component, pageProps }) {
  const themePath = applyTheme("light");

  return (
    <div>
      <Head>
        <title>Meteo app</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{darkTheme}</style>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
