import { AppProps } from "next/app";
import "../styles/splash.css";
import "../styles/style.css";

function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default App;
