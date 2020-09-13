import "../style/common.css";
import { IconContext } from "react-icons";

function MyApp({ Component, pageProps }) {
  return (
    <IconContext.Provider value={{ className: "inline" }}>
      <Component {...pageProps} />
    </IconContext.Provider>
  );
}

export default MyApp;
