import React from "react";
import {
  Box,
  Image,
  Text,
  Badge,
  Avatar,
  VStack,
  Heading,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";

const authors = [
  {
    name: "Aarav Sharma",
    rank: 1,
    news: 15,
    articles: 12,
    type: "Internship Seeker",
    img: "https://i.ibb.co/BBcKw9Z/avatar1.jpg",
  },
  {
    name: "Priya Mehta",
    rank: 2,
    news: 9,
    articles: 11,
    type: "Jobseeker",
    img: "https://i.ibb.co/YbfjqG8/avatar2.jpg",
  },
  {
    name: "Rohan Kapoor",
    rank: 3,
    news: 7,
    articles: 9,
    type: "Jobseeker",
    img: "https://i.ibb.co/f8RZ4nM/avatar3.jpg",
  },
  {
    name: "Simran Kaur",
    rank: 4,
    news: 6,
    articles: 8,
    type: "Internship Seeker",
    img: null,
  },
];

const LatestJob = () => {
  return (
    <Box px={{ base: 4, md: 16 }} py={12}>
      <Heading
        as="h2"
        size="lg"
        color="yellow.700"
        mb={4}
        borderBottom="2px solid"
        borderColor="yellow.800"
        w="fit-content"
      >
        Latest Jobs
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
        {authors.map((author, index) => (
          <Box
            key={index}
            bg="white"
            rounded="xl"
            borderWidth="1px"
            shadow="md"
            p={6}
            textAlign="center"
          >
            <Center mb={3}>
              <Avatar
                src={author.img || "https://via.placeholder.com/150"}
                name={author.name}
                size="xl"
              />
            </Center>

            <Text fontSize="lg" fontWeight="medium">
              {author.name}
            </Text>

            <Box mt={2}>
              <Badge
                colorScheme="yellow"
                fontSize="0.8em"
                px={4}
                py={1}
                borderRadius="md"
              >
                Rank #{author.rank}
              </Badge>
            </Box>

            <VStack
              spacing={1}
              mt={3}
              fontSize="sm"
              color="gray.700"
              fontWeight="semibold"
            >
              <Text>
                <Text as="span" color="gray.500">
                  Type:
                </Text>{" "}
                {author.type}
              </Text>
              <Text>
                <Text as="span" color="gray.500">
                  News:
                </Text>{" "}
                {author.news} |{" "}
                <Text as="span" color="gray.500">
                  Articles:
                </Text>{" "}
                {author.articles}
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default LatestJob;
