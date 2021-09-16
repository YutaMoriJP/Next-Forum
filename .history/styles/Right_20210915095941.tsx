import styled, { css } from "styled-components";

const Right = styled.article`
  display: flex;
  justify-content: flex-end;
  width: ${props => props.width || "100%"};
  max-width: 800px;
  margin: 0;
  ${props =>
    props.center &&
    css`
      margin: auto;
    `}
`;

export default Right;
