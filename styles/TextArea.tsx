import styled from "styled-components";
import Box from "./Box";

const Input = styled.textarea`
  width: 80%;
  padding: 20px;
  border: 1px solid grey;
  display: block;
  border-radius: 5px;
  font-size: 1.1rem;
  font-family: sans-serif;
  width: 100%;

  :not(:focus) {
    background: #f5f5f5;
  }

  :hover {
    background: white;
  }

  ${Box} & {
    min-width: 100%;
  }
`;

export default Input;
