import styled from "styled-components";

const Title = styled.h1`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-transform: uppercase;
  color: #212529;
  text-align: ${props => props.position || "center"};
  align-self: ${props => props.alignSelf || "flex-start"};
  cursor: ${props => props.cursor};
  padding: 5px;
  overflow-x: scroll;
`;

export default Title;
