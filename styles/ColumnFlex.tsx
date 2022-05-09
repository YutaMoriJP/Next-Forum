import styled from "styled-components";

type StyledColumnProps = Record<"$align" | "$width", string>;

const Column = styled.div<Partial<StyledColumnProps>>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.$align || "stretch"};
  width: ${(props) => props.$width || "100%"};

  > * {
    margin: 0 5px;
  }
`;

export default Column;
