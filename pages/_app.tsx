import "../styles/globals.css";
import { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import AuthContext from "../store/AuthContext";
import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import useToggle from "../useHooks/useToggle"; //manages opening/closing modal, and fetching updated data from server
import { AnimatePresence } from "framer-motion"; //used for modal animation
import Modal from "../components/Modal"; //used for submitting new post
import Post from "../components/Post"; //component used for creating & submitting new post
import { IconComponent } from "../components/Icon";

const CreateThread = ({ open, toggle, onClose, postToggle }) => {
  return (
    <>
      <IconComponent
        txt={!open ? "CREATE THREAD" : "CLOSE THREAD"}
        Icon={
          <IconButton onClick={toggle}>
            {/*if open is false, then + open icon will be rendered, if not then - close icon will be rendered*/}
            {!open ? (
              <Add color="primary" aria-label="Open Thread" />
            ) : (
              <Close color="primary" aria-label="Close Thread" />
            )}
          </IconButton>
        }
      />
      {/* after  Modal is rendered by button click,the <Post/> component gets rendered, allowing users to submit a new post */}
      {open && (
        <AnimatePresence exitBeforeEnter>
          {open && (
            <Modal handleClose={onClose}>
              {/*handleClose will close Modal, can be fired by Close Icon */}
              {/*postToggle is called after Post request is sent, causing useEffect to be called that updates postState state */}
              {/* Composition Model avoids passing props from <Modal> => <Post/>, instead passes handleClose & postToggle directly */}
              <Post handleClose={onClose} postToggle={postToggle} />
            </Modal>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

function MyApp({ Component, pageProps: props }: AppProps): JSX.Element {
  const { open, toggle, onClose } = useToggle();
  const { open: postSubmitted, toggle: postToggle } = useToggle();
  const [postsState, setPostsState] = useState([]);
  const pageProps = {
    ...props,
    postsState,
    setPostsState,
    postSubmitted,
  };
  return (
    <>
      <AuthContext>
        <Layout
          CreateThread={
            <CreateThread
              open={open}
              toggle={toggle}
              onClose={onClose}
              postToggle={postToggle}
            />
          }
        >
          <Component {...pageProps} />
        </Layout>
      </AuthContext>
    </>
  );
}

export default MyApp;
