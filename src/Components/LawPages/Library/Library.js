import React from "react";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";

import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  VStack,
  HStack,
  Link,
  SimpleGrid,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import LawDecoded from "./LawDecoded";
import EbooksSlider from "./EbooksSlider";
import Webinar from "./Webinar";
import Interviews from "./Interviews";
import PreviousPapers from "./PreviousPapers";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
const articles = [
  {
    id: 1,
    title:
      "Space Law and India’s Private Sector Boom: Time for a New Regulatory Code?",
    description:
      "India's private space sector is expanding rapidly with startups entering rocket and satellite development...",
    image: "/space-law.jpg", // Replace with your actual image path
  },
  {
    id: 2,
    title:
      "Data Localization Laws in India: National Security vs. Global Commerce",
    description:
      "This article explores India’s data localization framework, its rationale grounded in national security...",
    image: "/data-localization.jpg",
  },
  {
    id: 3,
    title:
      "Navigating Copyright Challenges in the Age of Internet Memes: A Legal Analysis",
    description:
      "In the digital age, memes have emerged as a dominant form of communication, commentary, and entertainment...",
    image: "/copyright.jpg",
  },
];

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

        {/* <Breadcrumb
          separator="/"
          fontWeight="medium"
          color="gray.600"
          justifyContent="center"
          mt={4}
        >
          <BreadcrumbItem>
            <ChakraLink as={RouterLink} to="/">
              home
            </ChakraLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink to="#"></BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb> */}
      </Box>
      <Container maxW="7xl" py={10}>
        {/* <Text
          fontSize="2xl"
          mb={6}
          color="white"
          fontWeight="bold"
          textAlign="center"
          backgroundColor={"goldenrod"}
          p={4}
          borderRadius="md"
        >
          LAWVS Library
        </Text> */}
        <InputGroup size="lg" mb={8}>
          <Input
            placeholder="Search drafts"
            borderRadius="md"
            borderColor="gray.300"
          />
          <InputRightElement width="6rem">
            <Button h="100%" colorScheme="blue" borderRadius="md">
              Search
            </Button>
          </InputRightElement>
        </InputGroup>

        <Flex justify="space-between" align="center" mb={8}>
          <Heading as="h2" size="xl" color="goldenrod">
            Top Articles
          </Heading>
          <Link color="goldenrod" fontWeight="bold">
            View All
          </Link>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {articles.map((article) => (
            <VStack
              key={article.id}
              spacing={4}
              align="flex-start"
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
              _hover={{ shadow: "md" }}
            >
              <Box>
                <Image
                  src={article.image}
                  alt={article.title}
                  objectFit="cover"
                  w="100%"
                  h="200px"
                />
              </Box>
              <Box p={4}>
                <Text color="goldenrod" fontWeight="bold">
                  LAWVS
                </Text>
                <Heading as="h3" size="md" mb={2}>
                  {article.title}
                </Heading>
                <Text color="gray.600">{article.description}</Text>
              </Box>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
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
