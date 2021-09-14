import Text from "../../styles/Text";

interface MessageProps {
  children: string;
}

const Message = ({ children }: MessageProps): JSX.Element => {
  return <Text>{children}</Text>;
};

export default Message;
