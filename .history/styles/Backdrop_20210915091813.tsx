import styled from "styled-components";
import { motion } from "framer-motion";

const BackDrop = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #000000e1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default BackDrop;
