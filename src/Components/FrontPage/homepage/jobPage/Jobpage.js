import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  Heading,
  SimpleGrid,
  Flex,
  Divider,
  Button,
  Img,
  useToast,
} from "@chakra-ui/react";
import * as mod from "../../../../url";
import axios from "axios";
import logo from "./../../../Assets/logo/logo.png";
import { Link } from "react-router-dom";
import { IoLocation } from "react-icons/io5";
import { CiStopwatch } from "react-icons/ci";
const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]); // 👈 Track applied jobs
  const toast = useToast();

  const data = JSON.parse(localStorage.getItem("lawvsuserinfo"));
  const token = data?.data?.token;
  const userId = data?.data?.userData?._id;

  // fetch jobs
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/job/get-latest-jobs`
      );
      if (data) {
        setJobs(data.data);
      }
    } catch (error) {
      toast({
        title: "Error fetching jobs",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchAppliedJobs = async () => {
    if (!userId) return;
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/user/user/applied-jobs/${userId}`,
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );
      // console.log(data, "data");
      if (data.success) {
        setAppliedJobs(data.appliedJobs);
      }
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchAppliedJobs();
  }, []);

  // job apply
  const applyJobByUser = async (jobId, adminId) => {
    if (!userId || !token) {
      toast({
        title: "Please login",
        description: "You need to login before applying for a job.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const response = await axios.post(
        `${mod.api_url}/api/v1/user/job-apply/${jobId}/${userId}`,
        { adminId },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      toast({
        title: "Job applied successfully",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setAppliedJobs((prev) => [...prev, jobId]);
    } catch (error) {
      toast({
        title: "Application failed",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
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
        {jobs?.map((job) => (
          <Box
            key={job._id}
            bg="white"
            rounded="xl"
            borderWidth="1px"
            shadow="sm"
            p={5}
            _hover={{ shadow: "lg", transform: "scale(1.02)" }}
            transition="all 0.2s"
          >
            <Img
              src={logo}
              alt={job?.name}
              boxSize="100px"
              objectFit="contain"
              mx="auto"
              mb={1}
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
              <Flex align="center" gap={6}>
                <Flex
                  align="center"
                  color="blue.600"
                  fontSize="sm"
                  fontWeight="500"
                >
                  <IoLocation size="18px" style={{ marginRight: "6px" }} />
                  {job?.city || "Location"}
                </Flex>

                <Flex
                  align="center"
                  color="green.600"
                  fontSize="sm"
                  fontWeight="500"
                >
                  <CiStopwatch size="18px" style={{ marginRight: "6px" }} />
                  {job?.jobType || "Work Type"}
                </Flex>
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

              {appliedJobs.includes(job._id) ? (
                <Button
                  flex="1"
                  size="sm"
                  colorScheme="gray"
                  variant="solid"
                  disabled
                >
                  Applied
                </Button>
              ) : (
                <Button
                  flex="1"
                  size="sm"
                  colorScheme="green"
                  variant="solid"
                  onClick={() => applyJobByUser(job._id, job.adminId)}
                >
                  Apply Now
                </Button>
              )}
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default JobPage;
