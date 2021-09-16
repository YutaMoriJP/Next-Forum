import React, { useEffect, useState } from "react";
import Box from "../../styles/Box";
import Text from "../../styles/Text";
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

type State =
  | { title: string; content: string; created: false }
  | { title: string; content: string; created: true };

interface MockProps {
  handleClose: () => void;
}

const Mock = ({ handleClose }: MockProps) => {
  const [post, setPost] = useState<State>({
    title: "",
    content: "",
    created: false,
  });
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

  //called when user submits comment

  const handleClick = () => {
    const { value: titleVal } = title;
    const { value: contentVal } = content;
    if (isStringEmptry(titleVal) || isStringEmptry(contentVal)) {
      onOpen();
      return;
    }
    onClose();
    setPost({ title: titleVal, content: contentVal, created: true });
    //slug for the post, or create it in the server?
    const slug = titleVal.toLowerCase().split(" ").join("-");
    //clean up input
    resetInput();
  };
  return (
    <Box>
      <BoxHeader>
        <Text weight={600} size="1.2rem">
          New Topic
        </Text>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </BoxHeader>
      <BoxContent>
        <Input
          id="Topic Title"
          name="Title"
          onSubmitted={onSubmitted}
          placeholder="Enter Title"
          label={true}
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

export default Mock;
