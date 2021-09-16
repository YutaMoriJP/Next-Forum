import "../styles/globals.css";
import { AppInitialProps } from "next/app";

function MyApp({ Component, pageProps }: AppInitialProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
