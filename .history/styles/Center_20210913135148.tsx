import styled from "styled-components";

const Center = styled.article`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.center};
  > * {
    margin: 5px;
  }
`;

export default Center;
