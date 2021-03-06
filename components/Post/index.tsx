import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Box from "@/styles/Box";
import Title from "@/styles/Title";
import BoxHeader from "@/styles/BoxHeader";
import Input from "../Form/Input";
import useToggle from "@/hooks/useToggle";
import BoxContent from "@/styles/BoxContent";
import Button from "@/styles/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import useInput from "@/hooks/useInput";
import Message from "../Message/Message"; // rendered if invalid action occurs and renders a message
import isStringEmpty from "util/isStringEmpty"; // validates whether string is empty or not
import { useAuth } from "@/store/AuthContext";
import getUsername from "util/getUsername";
import useUpdatePosts from "@/hooks/mutations/useUpdatePosts";

import type { Post } from "@/typings/posts";

interface MockProps {
  handleClose: () => void;
  postToggle: () => void;
}

// used for creating a new thread
const Thread = ({ handleClose, postToggle }: MockProps) => {
  // get user object from useAuth hook
  const { user } = useAuth();

  // pass user object to getUsername function to get the username from the user object
  const userName = getUsername(user);

  // used for <Message/> when invalid action happens
  const { open, onClose, onOpen } = useToggle();

  // post title & content
  const [title, resetTitle] = useInput("");
  const [content, resetContent] = useInput("");

  const resetInput = () => {
    resetTitle();
    resetContent();
  };

  const pageSlug = useRef<string>("");

  const cleanUp = (data: Post) => {
    // update <Home/> to render the newly created data
    postToggle();
    // clean up input
    resetInput();
    // close modal
    handleClose();

    pageSlug.current = data.slug;
  };

  const { mutate: createPost } = useUpdatePosts(cleanUp);

  // used to re-direct user to the newly created post
  const router = useRouter();

  // called when user submits comment
  const handleClick = async () => {
    const { value: titleVal } = title;
    const { value: contentVal } = content;

    // validation - if title or content are empty, then POST request is not sent
    if (isStringEmpty(titleVal) || isStringEmpty(contentVal)) {
      onOpen();

      return;
    }

    // closes <Message/> if it's still mounted
    onClose();

    // if user is logged in pass user id as postID
    // user could be null if user is not logged in, use ternary operator to assign postID to an empty object in that case
    // which means that the post will not contain postID, {title, content, creator, ...postID}
    const postID = (user ? { postID: user.id } : {}) as {
      [key: string]: string;
    };

    // if postID exists then postID:1, but if not then a new property is not added
    // and the created post cannot be updated/deleted by the use
    const body = {
      title: titleVal,
      content: contentVal,
      creator: userName,
      ...postID
    };

    createPost({ method: "POST", body, params: "" });

    // if at home then user does not need to be re-directed to home page
    router.asPath !== "/" && router.push("/");
  };

  useEffect(() => {
    // this check is necessary as this function runs when page is unmounted, and it can unmount when the modal is closed too
    // if pageSlug.current points at some path string, like 'new-post', then user will first be re-directed to home page '/'
    // and then re-directed to the newly created post page, which is necessary to properly render the newly created [slug].tsx page
    return () => {
      // if at home, then timer logic is not needed
      if (router.asPath === "/" && pageSlug.current) {
        router.push(pageSlug.current);
      }

      // pageSlug.current does point at valid URL and current location is not home, then push user to the NEWLY created page
      // after 800ms seconds
      if (pageSlug.current) {
        setTimeout(() => {
          pageSlug.current && router.push(pageSlug.current);
        }, 800);
      }
    };
  }, [router]);

  return (
    <Box>
      <BoxHeader>
        <Title $align="center">New Topic</Title>
        <IconButton onClick={handleClose}>
          <CloseIcon aria-label="Close Thread" />
        </IconButton>
      </BoxHeader>

      <BoxContent>
        <Input
          id="Topic-Title"
          labelText="Topic Title"
          name="Title"
          placeholder="Enter Title"
          label={true}
          required={true}
          {...title}
        />
      </BoxContent>

      <BoxContent>
        <Input
          as="textarea"
          id="Topic-Content"
          labelText="Topic Content"
          name="Content"
          placeholder="Enter Content"
          label={true}
          required={true}
          style={{ resize: "vertical", fontFamily: "arial" }}
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
