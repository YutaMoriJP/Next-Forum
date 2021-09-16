import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import style from "../styles/notfound.module.css";
import Link from "next/link";

const NotFound = (): JSX.Element => {
  const timerRef = useRef<NodeJS.Timeout>(null);
  const counterRef = useRef<NodeJS.Timeout>(null);
  const [counter, setCount] = useState(10);

  const router = useRouter();

  useEffect(() => {
    //called every 1000ms and decrements count state
    counterRef.current = setInterval(() => {
      setCount(prevCount => prevCount - 1);
    }, 1000);
    //calls router.push('/') after 10 seconds
    timerRef.current = setTimeout(() => {
      router.push("/");
    }, 10000);
    return () => {
      //when component unmounts, clean up side-effects
      clearTimeout(timerRef.current);
      clearInterval(counterRef.current);
    };
  }, []);

  return (
    <Layout>
      <article className={style.container}>
        <article className={style.content}>
          <h1 className={style.title}>Page not found...</h1>
          <Link href="/">
            <a className={style.link}>Go back to home page.</a>
          </Link>
          <p>You will be re-directed to the home page in {counter}</p>
        </article>
      </article>
    </Layout>
  );
};

export default NotFound;
