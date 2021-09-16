import React, { useState } from "react";
import Box from "../../styles/Box";
import Text from "../../styles/Text";
import BoxHeader from "../../styles/BoxHeader";
import Input from "../Form/Input";

const Mock = () => {
  const [onSubmitted, setOnSubmitted] = useState(false);
  return (
    <Box>
      <BoxHeader>
        <Text weight={600} size="1.2rem">
          New Topic
        </Text>
        <Input id="Topic Title" name="Title" onSubmitted={onSubmitted} />
      </BoxHeader>
    </Box>
  );
};

export default Mock;
