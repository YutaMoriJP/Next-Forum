import { motion } from "framer-motion";
import BackDropMotion from "../../styles/Backdrop";

interface BackdropProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Backdrop = ({ children, onClick }: BackdropProps): JSX.Element => {
  return (
    <BackDropMotion
      BackDropMotion
      onClick={onClick}
      initial={{ opacity: 0 }} //initial state has opacity:0
      animate={{ opacity: 1 }} //animation state has opacity:1
      exit={{ opacity: 0 }} //exit state has opacity: 0
    >
      {children}
    </BackDropMotion>
  );
};

export default Backdrop;
