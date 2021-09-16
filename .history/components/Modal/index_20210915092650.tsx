import Backdrop from "../Backdrop";
import ModalMotion from "../../styles/Modal";
import { AnimatePresence } from "framer-motion";

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
  children: React.ReactNode;
}

const Modal = ({ handleClose, children }: Modalprops): JSX.Element => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); //event will NOT bubble up to parent element
  };
  return <AnimatePresence></AnimatePresence>;
};

export default Modal;
