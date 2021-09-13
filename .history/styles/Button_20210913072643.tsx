import styled from "styled-components";
import CommentWrapper from "./ColumnFlex";

const Button = styled.button`
  min-width: 150px;
  padding: 10px 20px;
  border: 2px solid #37378a;
  border-radius: 4px;
  cursor: pointer;
  background-color: #37378a;
  color: white;
  transition: all 0.4s ease-in-out;
  :active {
    background-color: white;
    color: black;
  }
  :hover {
    transform: scale(0.9);
  }

  ${CommentWrapper} & {
    width: 30px;
    padding: 5px;
    :hover {
      transform: scale(1);
      background-color: white;
      color: black;
    }
  }
`;

export default Button;
