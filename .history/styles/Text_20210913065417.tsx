import styled from "styled-components";

const Text = styled.p`
  font-weight: ${props => props.weight || 100};
  line-height: 25px;
`;

export default Text;
