import styled from "styled-components";
import { motion } from "framer-motion";

const Modal = styled(motion.div)`
  width: clamp(
    50%,
    700px,
    90%
  ); /* attempts to set 700px, but if screen too large than 50%, too small 90%, which avoids setting media queries*/
  height: min(50%, 300px);
  margin: auto; /* centers element */
  padding: 0 2rem;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
`;

export default Modal;
