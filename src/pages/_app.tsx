import Head from "next/head";
import { IconContext } from "react-icons";
import "../style/common.css";

function MyApp({ Component, pageProps }) {
  return (
    <IconContext.Provider value={{ className: "inline" }}>
      <Head>
        <title>H10</title>
        <link rel="icon" type="image/svg" href="/favicon.svg"></link>
      </Head>
      <Component {...pageProps} />
    </IconContext.Provider>
  );
}

export default MyApp;
