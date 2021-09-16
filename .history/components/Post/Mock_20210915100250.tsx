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

interface MockProps {
  onClose: () => void;
}

const Mock = ({ onClose }: MockProps) => {
  const { open: onSubmitted } = useToggle();

  return (
    <Box>
      <BoxHeader>
        <Text weight={600} size="1.2rem">
          New Topic
        </Text>
        <IconButton onClick={onClose}>
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
        />
      </BoxContent>
      <BoxContent>
        <Input
          id="Topic Content"
          name="Content"
          onSubmitted={onSubmitted}
          placeholder="Enter Content"
          label={true}
        />
      </BoxContent>
      <BoxContent>
        <Button>Create Topic</Button>
      </BoxContent>
    </Box>
  );
};

export default Mock;
