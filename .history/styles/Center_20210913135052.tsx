import styled from "styled-components";

const Center = styled.article`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.center};
`;

export default Center;
