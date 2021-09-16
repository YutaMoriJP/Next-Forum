import React from "react";
import Box from "../../styles/Box";
import Text from "../../styles/Text";
import BoxHeader from "../../styles/BoxHeader";
import Input from "../Form/Input";

const Mock = () => {
  return (
    <Box>
      <BoxHeader>
        <Text weight={600} size="1.2rem">
          New Topic
        </Text>
      </BoxHeader>
    </Box>
  );
};

export default Mock;
