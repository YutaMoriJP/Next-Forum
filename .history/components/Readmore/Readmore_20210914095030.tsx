import useToggle from "../../useHooks/useToggle";

interface MoreProps {
  children: string;
}

const More = ({ children }): JSX.Element => {
  const { open } = useToggle();
  return (
    <>
      {!open && <span>...</span>}
      {open && children}
    </>
  );
};

const Readmore = ({ children }): JSX.Element => {
  const visibleComment = children.slice(0, 100);
  const rest = children.slice(100);
  return (
    <>
      {visibleComment}
      <More>{rest}</More>
    </>
  );
};

export default Readmore;
