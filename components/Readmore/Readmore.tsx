import useToggle from "../../useHooks/useToggle";
import ReadMore from "../../styles/Readmore";
import ReactMarkDown from "react-markdown";

interface MoreProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface ReadmoreProps {
  children: string;
}

const More = ({ open, onOpen, onClose }: MoreProps): JSX.Element => {
  return (
    <>
      {!open && (
        <>
          {"..."}
          <ReadMore onClick={onOpen} size="0.8rem">
            read more
          </ReadMore>
        </>
      )}
      {open && (
        <>
          <ReadMore onClick={onClose} size="0.8rem">
            Hide.
          </ReadMore>
        </>
      )}
    </>
  );
};

const Readmore = ({ children }: ReadmoreProps): JSX.Element => {
  const visibleComment = children.split(" ").slice(0, 30).join(" ");
  const { open, onOpen, onClose } = useToggle();
  const rest = children.split(" ").slice(30).join(" "); //if comment is smaller than an array of size 30, then rest will point at empty string
  return (
    <>
      {/* rest.length checks that comment is large, and if open is also true, then rest will be rendered*/}
      <ReactMarkDown>
        {visibleComment + " " + (rest.length > 0 && open ? rest : "")}
      </ReactMarkDown>
      {/*if rest is an empty string then <More/> will NOT be rendered*/}
      {/*<More/> will toggle the open state, with a Read More... and Hide text*/}
      {rest && <More open={open} onOpen={onOpen} onClose={onClose} />}
    </>
  );
};

export default Readmore;
