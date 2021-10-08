import styled from "styled-components";
import { motion } from "framer-motion";

const BackDrop = styled(motion.div)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  margin: 0;
  top: 0;
  left: 0;
  background: #000000e1;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: scroll;
`;

export default BackDrop;
