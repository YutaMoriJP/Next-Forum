import styled from "styled-components";

const RowFlex = styled.div`
  display: flex;
  flex-direction: row;
  width: ${props => props.width || "100%"};
  justify-content: ${props => props.justify || "flex-start"};
  align-items: ${props => props.align || "stretch"};
  margin-top: ${props => props.marginTop};
  margin-left: ${props => props.marginLeft};
  flex: ${props => props.flex};
  flex-wrap: ${props => props.wrap};
  > * {
    margin-right: 0.4rem;
    margin-bottom: 3px;
    z-index: 3;
  }
`;

export default RowFlex;
