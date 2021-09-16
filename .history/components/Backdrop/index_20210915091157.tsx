import { motion } from "framer-motion";
import style from "./style.module.css";

interface BackdropProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Backdrop = ({ children, onClick }: BackdropProps): JSX.Element => {
  return (
    <motion.div
      className={style.backdrop}
      onClick={onClick}
      initial={{ opacity: 0 }} //initial state has opacity:0
      animate={{ opacity: 1 }} //animation state has opacity:1
      exit={{ opacity: 0 }} //exit state has opacity: 0
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
