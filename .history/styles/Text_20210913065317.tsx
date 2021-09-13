import styled from "styled-components";

const Text = styled.p`
  font-weight: ${props => props.weight || 100};
`;

export default Text;
