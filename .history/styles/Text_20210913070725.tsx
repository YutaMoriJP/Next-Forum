import styled from "styled-components";

const Text = styled.p`
  color: ${props => props.color || "black"};
  font-weight: ${props => props.weight || 100};
  line-height: 20px;
`;

export default Text;
