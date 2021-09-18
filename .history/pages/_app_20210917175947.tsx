import "../styles/globals.css";
import { AppProps } from "next/app";
function MyApp({ Component, pageProps }: AppProps) {
  console.log("App", Component);
  console.log("pageprops", pageProps);
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
