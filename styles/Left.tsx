import styled, { css } from "styled-components";

const Left = styled.aside`
  position: fixed;
  left: 1px;
  padding: 1px;

  ${props =>
    props.top &&
    css`
      top: 0px;
    `}
    
  ${props =>
    props.bottom &&
    css`
      bottom: 10px;
    `}
`;

export default Left;
