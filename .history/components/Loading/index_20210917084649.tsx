import Center from "../../styles/Center";
import Spinner from "@material-ui/core/CircularProgress";

const Loading = (): JSX.Element => {
  return (
    <Center>
      <Spinner />
    </Center>
  );
};

export default Loading;
