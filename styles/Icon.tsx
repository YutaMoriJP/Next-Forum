import styled, { css } from "styled-components";

const Icon = styled.section`
  border-radius: 50%;
  width: ${props => (props.small ? "30px" : "40px")};
  height: ${props => (props.small ? "30px" : "40px")};
  font-size: ${props => (props.small ? "0.8rem" : "1rem")};
  background: ${props =>
    props.count ? `var(--color-${props.count})` : "black"};
  flex: 0 0 auto !important;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  //only applies to reply icon, to create some space
  ${props =>
    props.small &&
    css`
      margin: 8px 0;
      margin-right: 5px;
    `}
`;

export default Icon;
