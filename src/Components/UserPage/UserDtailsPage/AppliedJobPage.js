import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Badge,
  Divider,
  VStack,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import axios from "axios";
import * as mod from "../../../url";
import Header from "../../Navbar/Header";

const AppliedJobPage = () => {
  // State to store all applied jobs
  const [appliedJobs, setAppliedJobs] = useState([]);

  // State to store selected job details
  const [selectedJob, setSelectedJob] = useState(null);

  const toast = useToast();
  const data = JSON.parse(localStorage.getItem("lawvsuserinfo"));
  const token = data?.data?.token;
  const userId = data?.data?.userData?._id;
  // Get user token and ID from localStorage
  const fetchAppliedJobs = async () => {
    if (!userId) return;
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/user/get-apply-jobBy/${userId}`,
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );
      if (data.success) {
        setAppliedJobs(data.data);
      }
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
      toast({
        title: "Error",
        description: "Failed to fetch applied jobs.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Load applied jobs on component mount
  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  // Update selectedJob whenever appliedJobs change
  useEffect(() => {
    if (appliedJobs.length > 0) {
      setSelectedJob(appliedJobs[0]);
    }
  }, [appliedJobs]);

  // console.log(selectedJob, "selectedJob");
  return (
    <>
      <Header />
      <Flex
        direction={{ base: "column", md: "row" }}
        p={4}
        gap={4}
        h={{ base: "auto", md: "90vh" }}
      >
        {/* Left Sidebar - Scrollable Job List */}
        <Box
          w={{ base: "100%", md: "30%" }}
          borderRight={{ base: "none", md: "1px solid #e2e8f0" }}
          pr={{ base: 0, md: 4 }}
          mb={{ base: 4, md: 0 }}
          overflowY="auto"
          maxH={{ base: "600px", md: "auto" }}
        >
          <Heading
            size="md"
            mb={4}
            position={"sticky"}
            top={0}
            bg={"white"}
            zIndex={1}
            backgroundColor="gray.100"
            p={2}
          >
            My Applications
          </Heading>
          <VStack spacing={4} align="stretch">
            {appliedJobs?.map((job) => (
              <Box
                key={job?._id}
                p={4}
                borderWidth="1px"
                rounded="lg"
                shadow="sm"
                cursor="pointer"
                onClick={() => setSelectedJob(job)}
                _hover={{ shadow: "md", bg: "blue.50" }}
                bg={selectedJob?._id === job?._id ? "blue.50" : "white"}
              >
                <Text fontWeight="bold">{job?.jobId?.title}</Text>
                <Text fontSize="sm" color="blue.600">
                  {job?.jobId?.company}
                </Text>
                <Badge colorScheme={job?.statusColor} mt={2}>
                  {job?.status}
                </Badge>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Right Section - Job Details */}
        <Box w={{ base: "100%", md: "70%" }} p={2}>
          {/* Job Info */}
          <Heading size="lg" backgroundColor="gray.100" p={2}>
            Job Role :- {selectedJob?.jobId?.title}
          </Heading>
          <Text fontSize="md" color="gray.600" mb={4}>
            Company Name :- {selectedJob?.jobId?.company}
          </Text>

          {/* Application Status Timeline */}
          <Heading size="sm" mb={2} backgroundColor="gray.100" p={2}>
            Application status
          </Heading>
          <Flex
            direction={{ base: "column", sm: "row" }}
            align={{ base: "start", sm: "center" }}
            justify="space-between"
            mb={6}
            gap={4}
          >
            {selectedJob?.statusTimeline?.map((step, idx) => {
              // Determine icon and color based on status
              const isPositive = [
                "Applied",
                "Viewed",
                "Shortlisted",
                "Pending",
              ].includes(step.status);
              const icon = isPositive ? CheckCircleIcon : WarningIcon;
              const color = isPositive ? "green.500" : "red.500";

              return (
                <HStack key={idx} spacing={2} flex="1" position="relative">
                  <Icon as={icon} color={color} boxSize={6} />
                  <VStack spacing={0} align="start">
                    <Text fontSize="sm" fontWeight="bold">
                      {step.status}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {new Date(step.date).toLocaleDateString()}
                    </Text>
                  </VStack>

                  {idx < selectedJob?.statusTimeline.length - 1 && (
                    <Box
                      flex="1"
                      h={{ base: "40px", sm: "2px" }}
                      w={{ base: "2px", sm: "auto" }}
                      bg={isPositive ? "green.500" : "red.500"}
                      ml={{ base: 3, sm: 0 }}
                    />
                  )}
                </HStack>
              );
            })}
          </Flex>
          <Divider />

          {/* Activity Stats */}
          <Heading size="sm" mt={4} mb={2} backgroundColor="gray.100" p={2}>
            Activity on this Application
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6} mb={6}>
            <Stat>
              <StatLabel>Total applications</StatLabel>
              <StatNumber>{appliedJobs?.length}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Applications viewed by recruiter</StatLabel>
              <StatNumber>
                {
                  appliedJobs?.filter((job) => {
                    const lastStatus =
                      job?.statusTimeline?.[job.statusTimeline.length - 1];
                    return lastStatus?.status === "Viewed";
                  }).length
                }
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Applications Shortlisted by recruiter</StatLabel>
              <StatNumber>
                {
                  appliedJobs?.filter((job) => {
                    const lastStatus =
                      job?.statusTimeline?.[job.statusTimeline.length - 1];
                    return lastStatus?.status === "Shortlisted";
                  }).length
                }
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Applications Rejected by recruiter</StatLabel>
              <StatNumber>
                {
                  appliedJobs?.filter((job) => {
                    const lastStatus =
                      job?.statusTimeline?.[job.statusTimeline.length - 1];
                    return lastStatus?.status === "Rejected";
                  }).length
                }
              </StatNumber>
            </Stat>
          </SimpleGrid>
          <Divider />

          {/* Matching Criteria */}
          <Heading size="sm" mt={4} mb={2}>
            What may work for you?
          </Heading>
          <VStack align="start" spacing={2}>
            {selectedJob?.matchingCriteria?.map((crit, idx) => (
              <HStack key={idx}>
                <Icon
                  as={crit.matched ? CheckCircleIcon : WarningIcon}
                  color={crit.matched ? "green.500" : "red.500"}
                />
                <Text>{crit.label}</Text>
              </HStack>
            ))}
          </VStack>
        </Box>
      </Flex>
    </>
  );
};

export default AppliedJobPage;
