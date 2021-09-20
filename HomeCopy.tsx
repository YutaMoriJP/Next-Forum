const Home = ({ posts, count }: HomeProps): JSX.Element => {
  console.log("renders <Home/>");
  //used for controlling <Modal />
  const { open, toggle, onClose } = useToggle();
  //state managing forum posts data
  const [postsState, setPostsState] = useState(posts);
  //manages when postsState is updated (when user submits a new post)
  const { open: postSubmitted, toggle: postToggle } = useToggle();

  //if Home is mounted, setPostsState shouldn't be called, so it blocks data fetching in initial mounting phase
  const initialRender = useRef(true);

  console.log("postsState", postsState);
  //removed later if page is statically re-generated
  if (!posts) return <Loading />; //IF page is being statically re-generated
  //can be removed later
  useEffect(() => {
    console.log(
      "%c App is currently in development, so console will be pretty messy, but will be cleaned up later :)",
      "color: lightseagreen; font-size: 1.2rem"
    );
    console.log("<Home/> mounted");
    return () => console.log("<home/> unmounted");
  }, []);

  //called when a new post submission happens, and fetches the updated data from the database
  useEffect(() => {
    //effect is only called when postSubmitted updates (POST request is sent)
    //prevents effect from running in initial mounting
    if (initialRender.current) {
      console.log("initial render");
      //don't fetch data in initial render, as data is only statically obtained
    } else {
      //rewrite later
      console.log("not initial render");
      fetch("/.netlify/functions/express/posts")
        .then(res => res.json())
        .then(data => {
          console.log("new data", data);
          setPostsState(data);
        });
    }
    return () => {
      console.log("not called in initial render");
      //updates to false after first render, so data is updated
      //after post request is sent
      initialRender.current = false;
    };
  }, [postSubmitted]);

  return (
    <>
      <Head>
        <title>HOME</title>
      </Head>
      {/*Github link */}
      <Source />
      {/* renders Modal component by updating open state*/}
      <Left top>
        <IconButton onClick={toggle}>
          {/*if open is false, then + open icon will be rendered, if not then - close icon will be rendered*/}
          {!open ? <Add color="primary" /> : <Close color="primary" />}
        </IconButton>
      </Left>
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
      {/* posts content is fetched, and renders a posts list */}
      {postsState.map(post => {
        return (
          <Content
            key={post._id}
            title={post.title}
            content={post.content}
            slug={post.slug}
            main={true}
          ></Content>
        );
      })}
    </>
  );
};
