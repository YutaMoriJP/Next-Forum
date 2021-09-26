import { useEffect } from "react";
import Nav from "./Nav";
import useToggle from "../../useHooks/useToggle";
import Modal from "../Modal/";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Box from "../../styles/Box";
import Title from "../../styles/Title";
import BoxHeader from "../../styles/BoxHeader";
import BoxContent from "../../styles/BoxContent";
import ReactMarkdown from "react-markdown";
interface LayoutProps {
  children: React.ReactNode;
  CreateThread: React.ReactNode;
}

const Layout = ({ children, CreateThread }: LayoutProps): JSX.Element => {
  const { open, onClose, onOpen } = useToggle();
  //removed, when project is done
  useEffect((): void => {
    onOpen();
  }, []);
  return (
    <>
      {/* can be removed when project is done */}
      {open && (
        <Modal handleClose={onClose}>
          <Box>
            <BoxHeader>
              <Title>Hi! Thank you for visiting.</Title>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </BoxHeader>
            <BoxContent>
              <ReactMarkdown>
                Please note that this project is not fully done yet and is still
                under construction. Please checkout the [GitHub
                repo](https://github.com/YutaMoriJP/next-forum) if you are
                curious about the development. More features will be added 😊
              </ReactMarkdown>
            </BoxContent>
          </Box>
        </Modal>
      )}
      <Nav CreateThread={CreateThread} />
      {children}
    </>
  );
};

export default Layout;
