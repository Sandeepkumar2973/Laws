import React from "react";
import {
  Box,
  Avatar,
  Text,
  Badge,
  VStack,
  Heading,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";

const jobs = [
  {
    name: "Aarav Sharma",
    rank: 1,
    news: 15,
    articles: 12,
    type: "Internship Seeker",
    img: null,
  },
  {
    name: "Priya Mehta",
    rank: 2,
    news: 9,
    articles: 11,
    type: "Jobseeker",
    img: null,
  },
  {
    name: "Rohan Kapoor",
    rank: 3,
    news: 7,
    articles: 9,
    type: "Jobseeker",
    img: null,
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
        mb={6}
        borderBottom="2px solid"
        borderColor="yellow.800"
        w="fit-content"
      >
        Latest Job Openings
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
        {jobs.map((job, index) => (
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
                src={job.img || "https://via.placeholder.com/150"}
                name={job.name}
                size="xl"
              />
            </Center>

            <Text fontSize="lg" fontWeight="medium">
              {job.name}
            </Text>

            <Box mt={2}>
              <Badge
                colorScheme="yellow"
                fontSize="0.8em"
                px={4}
                py={1}
                borderRadius="md"
              >
                Rank #{job.rank}
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
                {job.type}
              </Text>
              <Text>
                <Text as="span" color="gray.500">
                  News:
                </Text>{" "}
                {job.news} |{" "}
                <Text as="span" color="gray.500">
                  Articles:
                </Text>{" "}
                {job.articles}
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default LatestJob;
