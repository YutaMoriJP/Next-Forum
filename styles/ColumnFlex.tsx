import styled from "styled-components";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align || "stretch"};
  width: ${props => props.width || "100%"};
  > * {
    margin: 0 5px;
  }
`;

export default Column;
