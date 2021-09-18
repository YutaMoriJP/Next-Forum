import "../styles/globals.css";
import { AppProps } from "next/app";
import Source from "../components/Source";

function MyApp({ Component, pageProps }: AppProps) {
  console.log("App", Component);
  console.log("pageprops", pageprops);
  return (
    <>
      <Source />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
