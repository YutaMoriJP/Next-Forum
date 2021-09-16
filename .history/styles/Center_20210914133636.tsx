import styled from "styled-components";

const Center = styled.article`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  max-width: ${props => props.maxWidth || "1200px"};
  align-items: ${props => props.center};
  margin: 5px;
  > * {
    margin: 0 5px;
  }
`;

export default Center;
