import useToggle from "../../useHooks/useToggle";

interface MoreProps {
  children: string;
}

interface ReadmoreProps {
  children: string;
}

const More = ({ children }: MoreProps): JSX.Element => {
  const { open } = useToggle();
  return (
    <>
      {!open && <span>...</span>}
      {open && children}
    </>
  );
};

const Readmore = ({ children }: ReadmoreProps): JSX.Element => {
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
