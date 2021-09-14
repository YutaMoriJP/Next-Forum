import useToggle from "../../useHooks/useToggle";
import ReadMore from "../../styles/Readmore";

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
      {!open && <ReadMore onClick={onOpen}>... read more</ReadMore>}
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
