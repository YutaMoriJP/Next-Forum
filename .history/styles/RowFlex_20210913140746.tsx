import styled from "styled-components";

const RowFlex = styled.article`
  display: flex;
  flex-direction: row;
  > * {
    margin-right: 0.4rem;
    margin-bottom: 3px;
    flex: 0 1 100px;
  }
`;

export default RowFlex;
