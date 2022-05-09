import styled, { css } from "styled-components";

type RightProps = Record<"$width" | "$maxWidth", string> & { $center: boolean };

const Right = styled.div<Partial<RightProps>>`
  display: flex;
  justify-content: flex-end;
  width: ${(props) => props.$width || "100%"};
  max-width: ${(props) => props.$maxWidth || "600px"};
  margin: 0;

  ${(props) =>
    props.$center &&
    css`
      margin: auto;
    `}
`;

export default Right;
