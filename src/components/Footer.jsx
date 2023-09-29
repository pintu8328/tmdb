import React from "react";
import {
  Container,
  SimpleGrid,
  Stack,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Container
      as={Stack}
      maxW={"7xl"}
      py={10}
      background={"black"}
      color={"white"}
    >
      <SimpleGrid
        templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr 1fr" }}
        spacing={8}
      >
        <Stack spacing={6}>
          <Box></Box>
          <Text fontSize={"sm"}>© 2023 Your Company. All rights reserved</Text>
        </Stack>
        <Stack align={"flex-start"}>
          <Button>Product</Button>
          <Box as="a" href={"#"}>
            Overview
          </Box>
          <Box as="a" href={"#"}>
            Features
          </Box>
          <Box as="a" href={"#"}>
            Tutorials
          </Box>
          <Box as="a" href={"#"}>
            Pricing
          </Box>
          <Box as="a" href={"#"}>
            Releases
          </Box>
        </Stack>
        <Stack align={"flex-start"}>
          <Button>Company</Button>
          <Box as="a" href={"#"}>
            About
          </Box>
          <Box as="a" href={"#"}>
            Press
          </Box>
          <Box as="a" href={"#"}>
            Careers
          </Box>
          <Box as="a" href={"#"}>
            Contact
          </Box>
          <Box as="a" href={"#"}>
            Partners
          </Box>
        </Stack>
        <Stack align={"flex-start"}>
          <Button>Support</Button>
          <Box as="a" href={"#"}>
            Help Center
          </Box>
          <Box as="a" href={"#"}>
            Terms of Service
          </Box>
          <Box as="a" href={"#"}>
            Legal
          </Box>
          <Box as="a" href={"#"}>
            Privacy Policy
          </Box>
          <Box as="a" href={"#"}>
            Status
          </Box>
        </Stack>
        <Stack align={"flex-start"}>
          <Button>Follow Us</Button>
          <Box as="a" href={"#"}>
            Facebook
          </Box>
          <Box as="a" href={"#"}>
            Twitter
          </Box>
          <Box as="a" href={"#"}>
            Dribbble
          </Box>
          <Box as="a" href={"#"}>
            Instagram
          </Box>
          <Box as="a" href={"#"}>
            LinkedIn
          </Box>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default Footer;
