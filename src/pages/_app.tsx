import { AppProps } from "next/app";
import "react-datepicker/dist/react-datepicker.css";
import "react-dropdown/style.css";
import "../styles/settings.css";
import "../styles/splash.css";
import "../styles/style.css";

function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default App;
