import styled, { css } from "styled-components";

const Right = styled.article`
  display: flex;
  justify-content: flex-end;
  width: 80%;
  ${props =>
    props.center &&
    css`
      margin: auto;
    `}
`;

export default Right;
