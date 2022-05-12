import { useEffect, useRef } from "react";
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

interface ModalProps {
  handleClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ handleClose, children }: ModalProps): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  const storeHandler = useRef<Function | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // event will NOT bubble up to parent element
    event.stopPropagation();
  };

  useEffect(() => {
    storeHandler.current = handleClose;
  }, [handleClose]);

  // Allow closing modal with esc keypress
  useEffect(() => {
    const isSupported = "addEventListener" in document?.body;
    if (!isSupported) return;

    const eventHandler = storeHandler.current;

    const handleEscClose = (e: KeyboardEvent) =>
      e.key === "Escape" && typeof eventHandler === "function" && eventHandler();

    document.body.addEventListener("keydown", handleEscClose);

    return () => document.body.removeEventListener("keydown", handleEscClose);
  }, []);

  useEffect(() => {
    const modalElement = ref.current;

    modalElement && modalElement.focus();
  }, []);

  return (
    <Backdrop onClick={handleClose}>
      <ModalMotion
        tabIndex={0}
        role="dialog"
        onClick={handleClick}
        ref={ref}
        aria-role="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </ModalMotion>
    </Backdrop>
  );
};

export default Modal;
