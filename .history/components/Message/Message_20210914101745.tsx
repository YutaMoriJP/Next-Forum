import Text from "../../styles/Text";

interface MessageProps {
  children: string;
}

const Message = ({ children }) => {
  return <Text>{children}</Text>;
};

export default Message;
