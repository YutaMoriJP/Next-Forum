import styled from "styled-components";

const ReadMore = styled.span`
  color: #37378a;
  cursor: pointer;
  font-weight: ${props => props.weight || 400};
  font-size: ${props => props.size || "1rem"};
  word-break: normal;
`;

export default ReadMore;
