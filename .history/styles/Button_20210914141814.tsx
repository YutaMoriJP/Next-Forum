import styled from "styled-components";
import CommentWrapper from "./ColumnFlex";

const Button = styled.button`
  max-width: 150px;
  padding: 10px 20px;
  border: 2px solid #37378a;
  border-radius: 4px;
  cursor: pointer;
  background-color: #37378a;
  color: white;
  transition: all 0.5s ease-in-out;
  :active {
    background-color: white;
    color: black;
  }
  :hover {
    transform: scale(0.96);
  }

  ${CommentWrapper} & {
    min-width: fit-content;
    max-width: fit-content;
    padding: 5px;
    margin-top: 5px;
    text-transform: uppercase;
    flex: 0;
    :hover {
      transform: scale(1);
      background-color: white;
      color: black;
    }
  }
`;

export default Button;
