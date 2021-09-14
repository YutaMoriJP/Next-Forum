import useToggle from "../../useHooks/useToggle";

interface MoreProps {
  children: string;
}

interface ReadmoreProps {
  children: string;
}

const More = ({ children }: MoreProps): JSX.Element => {
  const { open, onOpen } = useToggle();
  return (
    <>
      {!open && <span onClick={onOpen}>... read more</span>}
      {open && children}
    </>
  );
};

const Readmore = ({ children }: ReadmoreProps): JSX.Element => {
  const visibleComment = children.slice(0, 150);
  const rest = children.slice(100);
  return (
    <>
      {visibleComment}
      {rest && <More>{rest}</More>}
    </>
  );
};

export default Readmore;
