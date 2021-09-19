import "../styles/globals.css";
import { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import AuthContext from "../store/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  console.log("app is called");
  return (
    <>
      <AuthContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContext>
    </>
  );
}

export default MyApp;
