import { useEffect, useRef } from "react";
import Text from "../../styles/Text";

interface MessageProps {
  children: string;
  onClose: () => void;
  ms: number;
}

const Message = ({
  children,
  onClose,
  ms = 2000,
}: MessageProps): JSX.Element => {
  const timerRef = useRef<NodeJS.Timeout>(null!);
  useEffect(() => {
    timerRef.current = setTimeout(onClose, ms);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);
  return <Text>{children}</Text>;
};

export default Message;
