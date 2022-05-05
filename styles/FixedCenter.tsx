import styled from "styled-components";

const Center = styled.aside`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  z-index: 1000000;
  
  > * {
    color: white;
  }
`;

export default Center;
