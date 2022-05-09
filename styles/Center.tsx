import styled from "styled-components";

type StyledCenterProps = Record<"$height" | "$maxWidth" | "$center", string>;

const Center = styled.div<Partial<StyledCenterProps>>`
  display: flex;
  flex-direction: column;
  margin: 5px auto;
  width: 100%;
  height: ${(props) => props.$height};
  max-width: ${(props) => props.$maxWidth || "1200px"};
  align-items: ${(props) => props.$center || "center"};

  > * {
    margin: 0 5px;
  }
`;

export default Center;
