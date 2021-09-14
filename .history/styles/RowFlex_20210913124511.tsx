import styled from "styled-components";

const RowFlex = styled.article`
  display: flex;
  flex-direction: row;
  border: 1px solid red;
  > * {
    margin-right: 8px;
    margin-bottom: 3px;
  }
`;

export default RowFlex;
