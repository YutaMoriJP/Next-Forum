import styled from "styled-components";

const Title = styled.h1`
  font-size: 2rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-transform: uppercase;
  color: #212529;
  text-align: ${props => props.position || "center"};
  align-self: left;
`;

export default Title;
