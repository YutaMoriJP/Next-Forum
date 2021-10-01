import Center from "../../styles/Center";
import Spinner from "@material-ui/core/CircularProgress";

const Loading = ({ ...rest }): JSX.Element => {
  return (
    <Center>
      <Spinner {...rest} />
    </Center>
  );
};

export default Loading;
