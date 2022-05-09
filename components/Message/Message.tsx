import { useEffect, useRef } from "react";
import Text from "@/styles/Text";

interface MessageProps {
  children: string;
  onClose: () => void;
  ms: number;
  color: string;
  role?: string;
  id?: string;
}

const Message = ({ children, onClose, ms = 2000, color = "black", ...rest }: MessageProps): JSX.Element => {
  const timerRef = useRef<NodeJS.Timeout>(null!);

  useEffect(() => {
    timerRef.current = setTimeout(onClose, ms);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [ms, onClose]);

  return (
    <Text {...rest} $color={color} $weight={600} $padding="38px 0px 0px 0px" aria-label="Popover message">
      {children}
    </Text>
  );
};

export default Message;
