import Center from "../../styles/Center";
import Spinner from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const FixedCenter = styled.aside`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  ::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
    background-color: #1d1d1d;
    opacity: 0.5;
    z-index: 9998;
  }
`;

type LoadingProps = {
  fixed?: boolean;
  [props: string]: any;
};

const Loading = ({ fixed = false, ...rest }: LoadingProps): JSX.Element => {
  if (fixed)
    return (
      <FixedCenter>
        <Spinner {...rest} size="5rem" />
      </FixedCenter>
    );

  return (
    <Center>
      <Spinner {...rest} />
    </Center>
  );
};

export default Loading;
