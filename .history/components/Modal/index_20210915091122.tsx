import { motion } from "framer-motion";
import Backdrop from "../Backdrop";
import style from "./style.module.css";

//for animation
const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

interface Modalprops {
  handleClose: () => void;
  text: string;
}

const Modal = ({ handleClose, text }: Modalprops) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); //event will NOT bubble up to parent element
  };
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={handleClick}
        className={style.modal}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {text}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
