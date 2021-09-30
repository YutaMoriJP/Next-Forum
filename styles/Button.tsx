import styled from "styled-components";
import CommentWrapper from "./ColumnFlex";
import Box from "./Box";
import ReplyButtonContainer from "./ReplyButtonContainer";

const Button = styled.button`
  width: fit-content;
  padding: 10px 20px;
  border: 2px solid #4926b4 !important;
  border-radius: 4px;
  background-color: #4926b4;
  color: white;
  margin: 2px 0;
  cursor: pointer !important;
  transition: all 0.6s ease-in-out;
  :active {
    background: transparent !important;
    color: black;
  }
  :hover {
    transform: scale(0.96);
  }

  ${Box} & {
    padding: 15px 30px;
    background-color: #4926b4;
    border: 0;
    font-size: 1rem;
    min-width: fit-content;
  }

  ${CommentWrapper} & {
    min-width: fit-content;
    max-width: fit-content;
    padding: 5px;
    text-transform: uppercase;
    flex: 0;
  }
  ${ReplyButtonContainer} & {
    margin: 5px 0;
  }
`;

export default Button;
