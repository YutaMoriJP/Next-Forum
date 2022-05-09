import styled from "styled-components";

type TitleProps = Record<"$position" | "$align" | "$cursor", string>;

const Title = styled.h1<Partial<TitleProps>>`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-transform: uppercase;
  color: #212529;
  text-align: ${(props) => props.$position || "center"};
  align-self: ${(props) => props.$align || "flex-start"};
  cursor: ${(props) => props.$cursor};
  padding: 5px;
`;

export default Title;
