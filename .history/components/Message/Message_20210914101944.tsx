import { useEffect, useRef } from "react";
import Text from "../../styles/Text";

interface MessageProps {
  children: string;
  ms: number;
}

const Message = ({ children, ms }: MessageProps): JSX.Element => {
  const timerRef = useRef<NodeJS.Timeout>(null!);
  useEffect(() => {
    timerRef.current = setTimeout(() => {}, [ms]);
  }, []);
  return <Text>{children}</Text>;
};

export default Message;
