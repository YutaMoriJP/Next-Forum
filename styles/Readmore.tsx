import styled from "styled-components";

interface ReadMoreProps {
  $weight: number;
  $size: string;
}

const ReadMore = styled.span<Partial<ReadMoreProps>>`
  color: #37378a;
  cursor: pointer;
  font-weight: ${(props) => props.$weight || 400};
  font-size: ${(props) => props.$size || "1rem"};
  word-break: normal;
`;

export default ReadMore;
