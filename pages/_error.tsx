import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Container from "../styles/NotFoundContainer";
import Title from "../styles/Title";
import Text from "../styles/Text";

//custom Error Page  next/Error

const Error = (): JSX.Element => {
  const timerRef = useRef<NodeJS.Timeout>(null);
  const counterRef = useRef<NodeJS.Timeout>(null);
  const [counter, setCount] = useState(10);
  const router = useRouter();
  useEffect((): (() => void) => {
    //called every 1000ms and decrements count state
    counterRef.current = setInterval(() => {
      setCount(prevCount => prevCount - 1);
    }, 1000);
    //calls router.push('/') after 10 seconds
    timerRef.current = setTimeout(() => {
      router.push("/");
    }, 10000);
    return (): void => {
      //when component unmounts, clean up side-effects
      clearTimeout(timerRef.current);
      clearInterval(counterRef.current);
    };
  }, []);
  return (
    <>
      <Container>
        <Title>Page not found...</Title>
        <Text>You will be redirected in {counter} seconds.</Text>
      </Container>
    </>
  );
};
export default Error;
