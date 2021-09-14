import { useEffect } from "react";
import Text from "../../styles/Text";

interface MessageProps {
  children: string;
}

const Message = ({ children }: MessageProps): JSX.Element => {
  const timerRef = useRef<NodeJS.Timeout>();
  useEffect(() => {}, []);
  return <Text>{children}</Text>;
};

export default Message;
