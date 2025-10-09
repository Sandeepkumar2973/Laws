import React from "react";
import {
  Box,
  Text,
  Badge,
  Avatar,
  VStack,
  Heading,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import * as mode from "../../url";

const intern = [
  {
    name: "Aarav Mehta",
    rank: 1,
    news: 15,
    articles: 12,
    type: "Jobseeker",
    img: null,
  },
  {
    name: "Saanvi Sharma",
    rank: 2,
    news: 10,
    articles: 9,
    type: "Jobseeker",
    img: null,
  },
  {
    name: "Vivaan Singh",
    rank: 3,
    news: 8,
    articles: 6,
    type: "Jobseeker",
    img: null,
  },
  {
    name: "Diya Patel",
    rank: 4,
    news: 5,
    articles: 7,
    type: "Jobseeker",
    img: null,
  },
  {
    name: "Saanvi Sharma",
    rank: 2,
    news: 10,
    articles: 9,
    type: "Jobseeker",
    img: null,
  },
  {
    name: "Saanvi Sharma",
    rank: 2,
    news: 10,
    articles: 9,
    type: "Jobseeker",
    img: null,
  },
];

const Internship = () => {
  const [internship, setInternship] = useState([]);

  const fetchLatestInternship = async () => {
    try {
      const response = await axios.get(
        `${mode.api_url}/api/v1/job/get-internship-jobs`
      );
      const data = response.data;
      // console.log(data, "latest internship jobs");
      if (data.success) {
        setInternship(data.data);
      }
    } catch (error) {
      console.error("Error fetching latest internship jobs:", error);
    }
  };
  useEffect(() => {
    fetchLatestInternship();
  }, []);
  // console.log(internship, "internship");
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
        Latest Internship
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={6}>
        {intern.map((job, index) => (
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

export default Internship;
