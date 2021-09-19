import styled from "styled-components";
import IconWrapper from "./IconWrapper";

const Link = styled.a`
  text-decoration: 0;
  color: ${props => props.color || "white"};
  ${IconWrapper} & {
    position: relative;
    .tooltiptext {
      visibility: hidden;
      width: 200px;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 6px;
      position: absolute;
      z-index: 1;
      top: -5px;
      left: 110%;
      font-size: 0.8rem;
    }

    :hover .tooltiptext {
      visibility: visible;
    }
  }
`;
export default Link;
