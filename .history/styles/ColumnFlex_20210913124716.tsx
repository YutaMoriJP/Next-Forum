import styled from "styled-components";

const Column = styled.article`
  display: flex;
  flex-direction: column;
  border: 1px solid blue;
  width: 100%;
  > * {
    margin: 0 5px;
  }
`;

export default Column;
