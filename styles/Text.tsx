import styled from "styled-components";
import RowFlex from "./RowFlex";

const Text = styled.p`
  line-height: 20px;
  word-break: break-word;
  color: ${props => props.color || "black"};
  font-weight: ${props => props.weight || 100};
  font-size: ${props => props.size || "1rem"};
  text-align: ${props => props.align || "left"};
  padding: ${props => props.padding};

  ${RowFlex} & {
    align-self: center;
  }
`;

export default Text;
