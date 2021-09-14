import styled from "styled-components";

const Center = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.position};
`;

export default Center;
