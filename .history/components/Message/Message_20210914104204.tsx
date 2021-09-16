import { useEffect, useRef } from "react";
import Text from "../../styles/Text";

interface MessageProps {
  children: string;
  onClose: () => void;
  ms: number;
  color: string;
}

const Message = ({
  children,
  onClose,
  ms = 2000,
  color = "black",
}: MessageProps): JSX.Element => {
  const timerRef = useRef<NodeJS.Timeout>(null!);
  useEffect(() => {
    timerRef.current = setTimeout(onClose, ms);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);
  return (
    <Text color={color} weight={400}>
      {children}
    </Text>
  );
};

export default Message;
