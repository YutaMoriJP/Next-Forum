import { useEffect, useRef } from "react";
import Text from "../../styles/Text";

interface MessageProps {
  children: string;
  ms: number;
  onClose: () => void;
}

const Message = ({ children, ms, onClose }: MessageProps): JSX.Element => {
  const timerRef = useRef<NodeJS.Timeout>(null!);
  useEffect(() => {
    timerRef.current = setTimeout(onClose, [ms]);
  }, []);
  return <Text>{children}</Text>;
};

export default Message;
