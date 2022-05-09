import styled from "styled-components";
import Box from "./Box";

import type { ComponentProps } from "react";

const Input = styled.input<ComponentProps<"input">>`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border: 1px solid grey;
  display: block;
  border-radius: 5px;
  font-size: 1.1rem;

  :not(:focus) {
    background: #f5f5f5;
  }

  :hover {
    background: white;
  }
  ${Box} & {
    width: 100%;
  }
`;

export default Input;
