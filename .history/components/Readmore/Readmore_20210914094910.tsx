import useToggle from "../../useHooks/useToggle";

const More = ({ children }) => {
  const { open } = useToggle();
  return (
    <>
      <span>...</span>
    </>
  );
};

const Readmore = ({ children }) => {
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
