import useToggle from "../../hooks/useToggle";
import ReadMore from "../../styles/Readmore";
import Markdown from "../Markdown";

interface MoreProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface ReadmoreProps {
  children: string;
}

const More = ({ open, onOpen, onClose }: MoreProps): JSX.Element => (
  <ReadMore onClick={open ? onClose : onOpen} size="0.8rem">
    {open ? "Hide." : "read more"}
  </ReadMore>
);

const Readmore = ({ children }: ReadmoreProps): JSX.Element => {
  const visibleComment = children.split(" ").slice(0, 30).join(" ");

  const { open, onOpen, onClose } = useToggle();

  // if comment is smaller than an array of size 30, then rest will point at empty string
  const rest = children.split(" ").slice(30).join(" ");

  return (
    <>
      {/* rest.length checks that comment is large, and if open is also true, then rest will be rendered*/}
      <Markdown>{visibleComment + " " + (rest.length > 0 && open ? rest : "")}</Markdown>

      {/*if rest is an empty string then <More/> will NOT be rendered*/}
      {/*<More/> will toggle the open state, with a Read More... and Hide text*/}
      {rest && <More open={open} onOpen={onOpen} onClose={onClose} />}
    </>
  );
};

export default Readmore;
