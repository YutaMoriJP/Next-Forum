import Backdrop from "../Backdrop";
import ModalMotion from "../../styles/Modal";

// for animation
const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500
    }
  },
  exit: {
    y: "100vh",
    opacity: 0
  }
};

interface Modalprops {
  handleClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ handleClose, children }: Modalprops): JSX.Element => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // event will NOT bubble up to parent element
    event.stopPropagation();
  };

  return (
    <Backdrop onClick={handleClose}>
      <ModalMotion onClick={handleClick} variants={dropIn} initial="hidden" animate="visible" exit="exit">
        {children}
      </ModalMotion>
    </Backdrop>
  );
};

export default Modal;
