import Text from "../../styles/Text";

interface MessageProps {
  children: string;
}

const Message = ({ children }: MessageProps): JSX.Element => {
  useEffect(() => {}, []);
  return <Text>{children}</Text>;
};

export default Message;
