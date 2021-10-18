import styled from "styled-components";

const BoxContent = styled.div`
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  line-height: 30px;
  overflow-x: scroll;

  > * {
    margin: 5px;
  }
`;

export default BoxContent;
