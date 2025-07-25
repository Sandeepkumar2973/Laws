import React from "react";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  VStack,
  Container,
} from "@chakra-ui/react";
import draftimage from "../../Assets/lawsImage/draft.jpg"; // Adjust the path as necessary

const drafts = [
  {
    title:
      "Petition for Dissolution of Marriage by a Decree of Divorce Amended by the Mar...",
    image: draftimage,
  },
  {
    title: "Suit for Permanent Injunction",
    image: draftimage,
  },
  {
    title: "Revision Petition under Section 25-B (1) of DRC Act",
    image: draftimage,
  },
  {
    title: "Maintenance for Wife under Section 125 of CrPC",
    image: draftimage,
  },
  {
    title: "Criminal Appellate Jurisdiction SLP 438",
    image: draftimage,
  },
  {
    title:
      "Writ Petition under Article 226 of the Constitution of India to be filed before ...",
    image: draftimage,
  },
  {
    title:
      "Petition for Dissolution of Marriage by a Decree of Divorce Amended by the Mar...",
    image: draftimage,
  },
  {
    title: "Suit for Permanent Injunction",
    image: draftimage,
  },
  {
    title: "Revision Petition under Section 25-B (1) of DRC Act",
    image: draftimage,
  },
  {
    title: "Maintenance for Wife under Section 125 of CrPC",
    image: draftimage,
  },
  {
    title: "Criminal Appellate Jurisdiction SLP 438",
    image: draftimage,
  },
  {
    title:
      "Writ Petition under Article 226 of the Constitution of India to be filed before ...",
    image: draftimage,
  },
];

export default function DraftsGrid() {
  return (
    <Container maxW="7xl" py={12}>
      {/* Search Bar */}
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

      {/* Drafts Cards */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
        {drafts.map((draft, idx) => (
          <Box
            key={idx}
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            p={4}
            boxShadow="md"
          >
            <VStack
              spacing={4}
              as="a"
              href={`/drafts/${draft.id}`}             
              color="white"
              _hover={{ textDecoration: "none", cursor: "pointer", backgroundColor: "gray.50" }}
            >
              <Image
                src={draft.image}
                alt="Draft"
                boxSize="80px"
                objectFit="contain"
              />
              <Box
                bg="navy"
                color="white"
                p={3}
                textAlign="center"
                borderRadius="md"
                fontWeight="semibold"
                fontSize="sm"
                lineHeight="short"
              >
                <Text noOfLines={3}>{draft.title.toUpperCase()}</Text>
              </Box>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
