import styled from "styled-components";
import { motion } from "framer-motion";

const Modal = styled(motion.div)`
  width: clamp(
    80%,
    600px,
    100%
  ); /* attempts to set 700px, but if screen too large than 50%, too small 90%, which avoids setting media queries*/
  height: fit-content;
  margin: auto; /* centers element */
  padding: 0 2rem;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Modal;
