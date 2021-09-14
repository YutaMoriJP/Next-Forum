import styled from "styled-components";

const Text = styled.p`
  line-height: 20px;
  word-break: break-all;
  color: ${props => props.color || "black"};
  font-weight: ${props => props.weight || 100};
  font-size: ${props => props.size || "2rem"};
`;

export default Text;
