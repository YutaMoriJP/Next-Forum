import styled from "styled-components";
import CommentWrapper from "./ColumnFlex";
import Box from "./Box";
import Right from "./Right";

const Button = styled.button`
  width: fit-content;
  padding: 10px 20px;
  border: 2px solid #4926b4;
  border-radius: 4px;
  cursor: pointer;
  background-color: #4926b4;
  color: white;
  margin: 2px 0;
  transition: all 0.6s ease-in-out;
  :active {
    background-color: white;
    color: black;
  }
  :hover {
    transform: scale(0.96);
  }

  ${Right} & {
  }

  ${Box} & {
    padding: 10px 30px;
    background-color: #4926b4;
    border: 0;
    font-size: 1rem;
    min-width: fit-content;
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
