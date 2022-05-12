import BackDropMotion from "@/styles/Backdrop";

interface BackdropProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Backdrop = ({ children, onClick }: BackdropProps): JSX.Element => {
  return (
    <BackDropMotion
      onClick={onClick}
      // initial state has opacity
      initial={{ opacity: 0 }}
      // animation state has opacity:1
      animate={{ opacity: 1 }}
      // exit state has opacity: 0
      exit={{ opacity: 0 }}
    >
      {children}
    </BackDropMotion>
  );
};

export default Backdrop;
