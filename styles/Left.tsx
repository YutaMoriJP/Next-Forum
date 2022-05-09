import styled, { css } from "styled-components";

type LeftProps = Record<"$top" | "$bottom", boolean>;

const Left = styled.aside<Partial<LeftProps>>`
  position: fixed;
  left: 1px;
  padding: 1px;

  ${(props) =>
    props.$top &&
    css`
      top: 0px;
    `}

  ${(props) =>
    props.$bottom &&
    css`
      bottom: 10px;
    `}
`;

export default Left;
