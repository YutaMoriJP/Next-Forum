import styled from "styled-components";
import IconWrapper from "./IconWrapper";

const Link = styled.a`
  text-decoration: 0;
  color: ${props => props.color || "white"};
  ${IconWrapper} & {
    position: relative;
    .tooltiptext {
      visibility: hidden;
      width: 120px;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 10px;
      position: absolute;
      z-index: 1;
      top: -5px;
      left: 110%;
    }
    .tooltiptext::after {
      content: "";
      position: absolute;
      top: 50%;
      right: 100%;
      margin-top: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent transparent black;
    }
    :hover .tooltiptext {
      visibility: visible;
    }
  }
`;
export default Link;
