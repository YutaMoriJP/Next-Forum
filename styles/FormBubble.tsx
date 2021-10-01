import styled from "styled-components";

const Bubble = styled.div`
  position: relative;
  z-index: 0;

  ::before {
    content: "";
    position: absolute;
    width: 50vw;
    max-width: 800px;
    height: 30vh;
    background: #223dc5;
    border-radius: 50%;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 0;
  }
`;

export default Bubble;
