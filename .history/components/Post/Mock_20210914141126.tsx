import React, { useState } from "react";
import Box from "../../styles/Box";
import Text from "../../styles/Text";
import BoxHeader from "../../styles/BoxHeader";
import Input from "../Form/Input";
import useToggle from "../../useHooks/useToggle";
import BoxContent from "../../styles/BoxContent";

const Mock = () => {
  const { open: onSubmitted } = useToggle();
  return (
    <Box>
      <BoxHeader>
        <Text weight={600} size="1.2rem">
          New Topic
        </Text>
      </BoxHeader>
      <BoxContent></BoxContent>
    </Box>
  );
};

export default Mock;
