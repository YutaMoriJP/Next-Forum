import styled from "styled-components";

const Input = styled.input`
  width: 80%;
  padding: 20px;
  border: 1px solid grey;
  margin: 10px;
  display: block;
  border-radius: 5px;
  font-size: 1.1rem;
  :not(:focus) {
    background: #f5f5f5;
  }
  :hover {
    background: white;
  }
`;

export default Input;
