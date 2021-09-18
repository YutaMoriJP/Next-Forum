import "../styles/globals.css";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <h1>HELLO</h1>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
