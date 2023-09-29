import React from "react";
import { Box, Image, Flex, Heading } from "@chakra-ui/react";

const EmptySearch = ({ searchKeyword }) => {
  return (
    // Container to center the content vertically
    <Flex backgroundColor="black" align="center" justify="center" h={500}>
      <Box>
        {/* Image for empty search */}
        <Flex backgroundColor="black" align="center" justify="center">
          <Image
            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyLvYxSZ-n0JzwnQCi8PwPnqsf6797Y3OJUx_xsAQLjn_0wT_7vG_djDaa70kQa4rjgU0&usqp=CAU`}
            alt={`Empty search`}
          />
        </Flex>

        {/* Heading indicating the search term that wasn't found */}
        <Heading as="h4" size="lg" color={"white"}>
          Couldn't find "{searchKeyword}"
        </Heading>

        {/* Subheading with a suggestion for the user */}
        <Heading as="h6" size="xs" color={"white"}>
          Try searching for something else or try with a different spelling
        </Heading>
      </Box>
    </Flex>
  );
};

export default EmptySearch;
