const More = () => {
  return <>...</>;
};

const Readmore = ({ children }) => {
  const visibleComment = children.slice(0, 100);
  const rest = children.slice(100);
  return <>{visibleComment}...</>;
};

export default Readmore;
