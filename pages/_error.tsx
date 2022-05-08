import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Container from "../styles/NotFoundContainer";
import Title from "../styles/Title";
import Text from "../styles/Text";
import Center from "../styles/FixedCenter";
import Loading from "../components/Loading";
// custom Error Page  next/Error

const Error = (): JSX.Element => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const counterRef = useRef<NodeJS.Timeout | null>(null);

  const [counter, setCount] = useState(5);

  const router = useRouter();

  useEffect((): (() => void) => {
    // called every 1000ms and decrements count state
    counterRef.current = setInterval(() => {
      setCount((prevCount) => (prevCount === 0 ? 0 : prevCount - 1));
    }, 1000);

    // calls router.push('/') after 10 seconds
    timerRef.current = setTimeout(() => {
      router.push("/");
    }, 5000);

    return (): void => {
      // when component unmounts, clean up side-effects
      timerRef.current && clearTimeout(timerRef.current);
      counterRef.current && clearInterval(counterRef.current);
    };
  }, []);

  return (
    <>
      <Center>
        <Title align="center">Page not found...</Title>

        <Text align="center">
          {counter === 0 ? (
            <Loading style={{ color: "white" }} />
          ) : (
            `You will be redirected in ${counter} second${
              counter === 1 ? "" : "s"
            }.`
          )}{" "}
        </Text>
      </Center>

      <Container></Container>
    </>
  );
};
export default Error;
