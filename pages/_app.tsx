import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import AuthContext from "../store/AuthContext";
import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import useToggle from "../hooks/useToggle"; // manages opening/closing modal, and fetching updated data from server
import { AnimatePresence } from "framer-motion"; // used for modal animation
import Modal from "../components/Modal"; // used for submitting new post
import Post from "../components/Post"; // component used for creating & submitting new post
import { IconComponent } from "../components/Icon";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import type { AppProps } from "next/app";

interface CreateThreadProps {
  open: boolean;
  toggle: () => void;
  onClose: () => void;
  postToggle: () => void;
}

const CreateThread = ({ open, toggle, onClose, postToggle }: CreateThreadProps) => {
  return (
    <>
      <IconComponent
        txt={!open ? "CREATE THREAD" : "CLOSE THREAD"}
        Icon={
          <IconButton onClick={toggle} aria-label={open ? "Close Thread" : "Open Thread"}>
            {/* if open is false, then + open icon will be rendered, if not then - close icon will be rendered */}
            {!open ? <Add color="primary" /> : <Close color="primary" />}
          </IconButton>
        }
      />

      {/*  after  Modal is rendered by button click,the <Post/> component gets rendered, allowing users to submit a new post  */}
      {open && (
        <AnimatePresence exitBeforeEnter>
          <Modal handleClose={onClose}>
            {/* handleClose will close Modal, can be fired by Close Icon  */}
            {/* postToggle is called after Post request is sent, causing useEffect to be called that updates postState state  */}
            {/*  Composition Model avoids passing props from <Modal> => <Post/>, instead passes handleClose & postToggle directly  */}
            <Post handleClose={onClose} postToggle={postToggle} />
          </Modal>
        </AnimatePresence>
      )}
    </>
  );
};

function MyApp({ Component, pageProps: props }: AppProps): JSX.Element {
  const [queryClient] = useState(() => new QueryClient());

  // used to render loading ui
  const { open: showLoading, onClose: stopLoading, onOpen: startLoading } = useToggle();

  const { open, toggle, onClose } = useToggle();
  const { open: postSubmitted, toggle: postToggle } = useToggle();

  const [postsState, setPostsState] = useState([]);

  const pageProps = {
    ...props,
    postsState,
    setPostsState,
    postSubmitted,
    stopLoading
  };

  console.log("page renders...", pageProps);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthContext>
            <Layout
              showLoading={showLoading}
              startLoading={startLoading}
              CreateThread={<CreateThread open={open} toggle={toggle} onClose={onClose} postToggle={postToggle} />}
            >
              <Component {...pageProps} />
            </Layout>
          </AuthContext>
        </Hydrate>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
