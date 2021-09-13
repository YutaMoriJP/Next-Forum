import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-transform: uppercase;
  color: #212529;
  text-align: ${props => props.position || "center"};
  align-self: flex-start;
  padding: 5px;
`;

export default Title;
