const More = ({ children }) => {
  return <>...</>;
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
