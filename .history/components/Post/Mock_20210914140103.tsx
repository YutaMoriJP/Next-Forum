import React from "react";
import Box from "../../styles/Box";
import Text from "../../styles/Text";
import BoxHeader from "../../styles/BoxHeader";

const Mock = () => {
  return (
    <Box>
      <BoxHeader></BoxHeader>
      <Text weight={600} size="1.2rem">
        New Topic
      </Text>
      <hr />
    </Box>
  );
};

export default Mock;
