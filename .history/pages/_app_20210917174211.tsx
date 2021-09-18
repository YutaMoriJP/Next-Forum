import "../styles/globals.css";
import { AppProps } from "next/app";
import Source from "../components/Source";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
