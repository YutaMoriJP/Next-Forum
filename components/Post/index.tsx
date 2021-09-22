import React, { useEffect, useRef, useState } from "react";
import Box from "../../styles/Box";
import Title from "../../styles/Title";
import BoxHeader from "../../styles/BoxHeader";
import Input from "../Form/Input";
import useToggle from "../../useHooks/useToggle";
import BoxContent from "../../styles/BoxContent";
import Button from "../../styles/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import useInput from "../../useHooks/useInput";
import Message from "../Message/Message"; //rendered if invalid action occurs and renders a message
import isStringEmptry from "../../util/isStringEmpty"; //validates whether string is empty or not
import { useRouter } from "next/router";

type State =
  | { title: string; content: string; created: false }
  | { title: string; content: string; created: true };

interface MockProps {
  handleClose: () => void;
  postToggle: () => void;
}

//used for creating a new thread
const Thread = ({ handleClose, postToggle }: MockProps) => {
  const [post, setPost] = useState<State>({
    title: "",
    content: "",
    created: false,
  }); //fires POST Request to create a new post

  const { open: onSubmitted } = useToggle();
  //used for <Message/> when invalid action happens
  const { open, onClose, onOpen } = useToggle();
  //post title & content
  const [title, resetTitle] = useInput("");
  const [content, resetContent] = useInput("");
  //helper function to reset input fields
  const resetInput = () => {
    resetTitle();
    resetContent();
  };

  const pageSlug = useRef(null);

  //used to re-direct user to the newly created post
  const router = useRouter();
  console.log("router", router);
  //called when user submits comment, transform to async fn
  const handleClick = async () => {
    const { value: titleVal } = title;
    const { value: contentVal } = content;
    //validation - if title or content are empty, then POST request is not sent
    if (isStringEmptry(titleVal) || isStringEmptry(contentVal)) {
      onOpen();
      return;
    }
    onClose(); //closes <Message/> if it's still mounted
    setPost({ title: titleVal, content: contentVal, created: true });
    //body for post request
    const postData = { title: titleVal, content: contentVal };
    //send post request like this?
    await fetch("/.netlify/functions/express/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    })
      .then(res => res.json())
      .then(data => {
        //stores a reference of the newly created post's slug
        pageSlug.current = data.slug;
        return data;
      })
      .catch(e => {
        console.log("e", e.message);
        return e;
      });
    //update <Home/> to render the newly created data
    postToggle();
    //clean up input
    resetInput();
    //close modal
    handleClose();
    //if at home then user does not need to be re-directed to home page
    router.asPath !== "/" && router.push("/");
  };

  useEffect(() => {
    //this check is necessary as this function runs when page is unmounted, and it can unmount when the modal is closed too
    //if pageSlug.current points at some path string, like 'new-post', then user will first be re-directed to home page '/'
    //and then re-directed to the newly created post page, which is necessary to properly render the newly created [slug].tsx page
    return () => {
      //if at home, then timer logic is not needed
      if (router.asPath === "/" && pageSlug.current) {
        router.push(pageSlug.current);
      }
      if (pageSlug.current) {
        setTimeout(() => {
          router.push(pageSlug.current);
        }, 800);
      }
    };
  }, []);
  return (
    <Box>
      <BoxHeader>
        <Title alignSelf="center">New Topic</Title>
        <IconButton onClick={handleClose}>
          <CloseIcon aria-label="Close Thread" />
        </IconButton>
      </BoxHeader>
      <BoxContent>
        <Input
          id="Topic Title"
          name="Title"
          onSubmitted={onSubmitted}
          placeholder="Enter Title"
          label={true}
          localState={false}
          {...title}
        />
      </BoxContent>
      <BoxContent>
        <Input
          id="Topic Content"
          name="Content"
          onSubmitted={onSubmitted}
          placeholder="Enter Content"
          label={true}
          localState={false}
          {...content}
        />
      </BoxContent>
      <BoxContent>
        <Button onClick={handleClick}>Create Topic</Button>
      </BoxContent>
      {open && (
        <Message onClose={onClose} ms={3000} color="#f03e3e">
          *Both Title and Content must be filled.
        </Message>
      )}
    </Box>
  );
};

export default Thread;
