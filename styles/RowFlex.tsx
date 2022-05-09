import styled from "styled-components";

type RowFlexProps = Record<"$width" | "$justify" | "$align" | "$marginTop" | "$marginLeft" | "$flex" | "$wrap", string>;

const RowFlex = styled.div<Partial<RowFlexProps>>`
  display: flex;
  flex-direction: row;
  width: ${(props) => props.$width || "100%"};
  justify-content: ${(props) => props.$justify || "flex-start"};
  align-items: ${(props) => props.$align || "stretch"};
  margin-top: ${(props) => props.$marginTop};
  margin-left: ${(props) => props.$marginLeft};
  flex: ${(props) => props.$flex};
  flex-wrap: ${(props) => props.$wrap};

  > * {
    margin-right: 0.4rem;
    margin-bottom: 3px;
    z-index: 3;
  }
`;

export default RowFlex;
