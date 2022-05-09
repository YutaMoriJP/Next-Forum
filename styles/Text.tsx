import styled from "styled-components";
import RowFlex from "./RowFlex";

type TextUnionProps = Record<"$weight" | "$size" | "$padding", string | number>;

type TextStrProps = Record<"$color" | "$bg" | "$align", string>;

type TextProps = TextUnionProps & TextStrProps;

const Text = styled.p<Partial<TextProps>>`
  line-height: 20px;
  word-break: break-word;
  color: ${(props) => props.$color || "black"};
  font-weight: ${(props) => props.$weight || 100};
  font-size: ${(props) => props.$size || "1rem"};
  text-align: ${(props) => props.$align || "left"};
  padding: ${(props) => props.$padding};
  background-color: ${(props) => props.$bg};

  ${RowFlex} & {
    align-self: center;
  }
`;

export default Text;
