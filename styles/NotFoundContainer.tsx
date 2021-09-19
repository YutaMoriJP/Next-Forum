import styled from "styled-components";

const Container = styled.article`
  position: relative;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  ::before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background: #223dc5;
    border-radius: 50%;
    transform: translateX(-50%) scale(2);
    transform-origin: bottom;
  }
`;

export default Container;
