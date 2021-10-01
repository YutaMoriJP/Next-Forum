import styled from "styled-components";

const Container = styled.article`
  position: relative;
  width: 100vw;
  height: 70vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  ::before {
    content: "";
    position: absolute;
    width: 70vw;
    height: 60%;
    background: #223dc5;
    border-radius: 90%;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%) scale(2);
    transform-origin: bottom;
    z-index: 0;
  }
`;

export default Container;
