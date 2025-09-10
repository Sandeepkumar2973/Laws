import React from "react";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";

import {
  Box,
  Flex,
  Text,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Divider,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import LawDecoded from "./LawDecoded";
import EbooksSlider from "./EbooksSlider";
import Webinar from "./Webinar";
import Interviews from "./Interviews";
import PreviousPapers from "./PreviousPapers";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import LatestArticles from "../Articles/LatestArticles";

// ...

<ChakraLink as={RouterLink} to="/" color="goldenrod" fontWeight="bold">
  View All
</ChakraLink>;

const Library = () => {
  return (
    <>
      <Header />
      {/* Banner Section */}
      <Box
        bgGradient="linear(to-r, gray.50, gray.100)"
        py={{ base: 12, md: 20 }}
        textAlign="center"
      >
        <Heading as="h1" size="2xl" mb={2}>
          Lawvs Library
        </Heading>
        <Text fontSize="2xl" color="orange.600" fontWeight="bold">
          Read Top articles from Lawvs Library
        </Text>
      </Box>
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={10}>
        <InputGroup size="lg" mb={8}>
          <Input
            placeholder="Search articles, ebooks, webinars..."
            borderRadius="md"
            borderColor="gray.300"
          />
          <InputRightElement width="6rem">
            <Button h="100%" colorScheme="blue" borderRadius="md">
              Search
            </Button>
          </InputRightElement>
        </InputGroup>

        <Flex justify="space-between" align="center" mb={1}>
          <Heading as="h2" size="xl" color="goldenrod">
            Top Articles
          </Heading>
          <ChakraLink
            as={RouterLink}
            to="/all-articles"
            color="goldenrod"
            fontWeight="bold"
          >
            View All
          </ChakraLink>
        </Flex>
        <Divider />
        <LatestArticles />
      </Box>

      <LawDecoded />
      <EbooksSlider />
      <Webinar />
      <Interviews />
      <PreviousPapers />
      <Footer />
    </>
  );
};

export default Library;
