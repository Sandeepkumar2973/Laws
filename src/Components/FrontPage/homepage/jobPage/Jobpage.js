import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Text,
  Badge,
  VStack,
  Heading,
  SimpleGrid,
  Center,
  Toast,
  Flex,
  Divider,
  Button,
  Img,
} from "@chakra-ui/react";
import * as mod from "../../../../url";
import axios from "axios";
import { CiLocationOn } from "react-icons/ci";
import logo from "./../../../Assets/logo/logo.png"; // Adjust the path as necessary
import { Link } from "react-router-dom";
const JobPage = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/job/get-latest-jobs`
      );
      if (data) {
        setJobs(data.data);
      }
    } catch (error) {
      Toast({
        title: "Error fetching jobs",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  // console.log(jobs, "data");

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <Box px={{ base: 4, md: 16 }} py={12}>
        <Flex justifyContent="space-between">
          <Heading as="h2" size="lg" color="yellow.700" w="fit-content">
            Latest Job Openings
          </Heading>
          <Button
            as={Link}
            to="/get-all-jobs"
            size="sm"
            color="yellow.700"
            w="fit-content"
            p={2}
            variant="outline"
          >
            View All Jobs
          </Button>
        </Flex>
        <Divider />
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {jobs?.map((job, index) => (
            <Box
              key={index}
              bg="white"
              rounded="xl"
              borderWidth="1px"
              shadow="sm"
              p={6}
              _hover={{ shadow: "lg", transform: "scale(1.02)" }}
              transition="all 0.2s"
            >
              <Img
                src={logo}
                alt={job?.name}
                boxSize="80px"
                objectFit="contain"
                mx="auto"
                mb={3}
              />

              <Text fontSize="lg" fontWeight="bold" mb={1}>
                {job?.title}
              </Text>
              <Text fontSize="sm" color="gray.600" mb={2}>
                {job?.company}
              </Text>

              <VStack align="start" spacing={1} fontSize="sm" mb={3}>
                <Text>
                  <b>Experience:</b> {job?.experienceRequired}
                </Text>
                <Flex align="center">
                  <CiLocationOn size="18px" style={{ marginRight: "4px" }} />
                  {job?.location}
                </Flex>
                <Text>
                  <b>CTC:</b> {job?.salaryRange}
                </Text>
              </VStack>

              <Flex justify="space-between" gap={2}>
                <Button
                  flex="1"
                  size="sm"
                  colorScheme="yellow"
                  as={Link}
                  to={`/get-single-job/details/${job._id}`}
                >
                  View Details
                </Button>
                <Button flex="1" size="sm" colorScheme="green" variant="solid">
                  Apply Now
                </Button>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default JobPage;
