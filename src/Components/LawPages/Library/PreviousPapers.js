// src/components/PreviousPapers.jsx

import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

const papers = [
  { id: 1, title: "RJS PT 2021", year: 2021, file: "#" },
  { id: 2, title: "RJS PT 2018", year: 2018, file: "#" },
  { id: 3, title: "RJS PT 2017", year: 2017, file: "#" },
  { id: 4, title: "RJS PT 2016", year: 2016, file: "#" },
  { id: 5, title: "RJS PT 2015", year: 2015, file: "#" },
  { id: 6, title: "RJS PT 2013", year: 2013, file: "#" },
];

const PreviousPapers = () => {
  return (
    <Container maxW="7xl" py={10}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h2" size="xl" color="goldenrod">
          Previous Year Papers
        </Heading>
        <Link color="goldenrod" fontWeight="bold">
          View All
        </Link>
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 6 }} spacing={8}>
        {papers.map((paper) => (
          <VStack
            key={paper.id}
            p={4}
            borderRadius="md"
            borderWidth="1px"
            textAlign="center"
          >
            <Image
              src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
              alt="PDF Icon"
              boxSize="60px"
              mx="auto"
            />
            <Heading as="h3" size="sm" color="goldenrod" noOfLines={1}>
              {paper.title}
            </Heading>
            <Text color="gray.600">{paper.year}</Text>
            <Button
              as="a"
              href={paper.file}
              download
              colorScheme="red"
              size="sm"
              rightIcon={
                <span role="img" aria-label="download">
                  🔽
                </span>
              }
            >
              Download Now
            </Button>
          </VStack>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default PreviousPapers;
