import styled from "styled-components";

const Button = styled.button`
  min-width: 150px;
  padding: 10px 20px;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  background-color: #37378a;
  color: white;
  transition: all 1s ease-in-out;

  :active {
    transform: scale(0.9);
  }
  :hover {
    transform: translateX(-5%);
  }
`;

export default Button;
