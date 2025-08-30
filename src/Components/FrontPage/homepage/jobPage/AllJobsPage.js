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
  Input,
  Select,
  Img,
  useToast,
} from "@chakra-ui/react";
import * as mod from "../../../../url";
import axios from "axios";
import { CiLocationOn } from "react-icons/ci";
import logo from "./../../../Assets/logo/logo.png";
import { Link } from "react-router-dom";
import Header from "../../../Navbar/Header";
import Footer from "../../../Navbar/Footer";

const AlljobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const toast = useToast();
  const [filters, setFilters] = useState({
    jobType: "",
    salary: "",
    location: "",
    title: "",
  });
  const data = JSON.parse(localStorage.getItem("lawvsuserinfo"));
  const token = data?.data?.token;
  const userId = data?.data?.userData?._id;
  // fetch all jobs
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/job/get-all-jobs`
      );
      if (data) {
        setJobs(data.data);
        setFilteredJobs(data.data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
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
  // search + filter logic
  useEffect(() => {
    let temp = jobs;

    if (search) {
      temp = temp.filter((j) =>
        j.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filters.jobType) {
      temp = temp.filter((j) => j.jobType === filters.jobType);
    }

    if (filters.salary) {
      temp = temp.filter((j) => j.salaryRange.includes(filters.salary));
    }
    if (filters.title) {
      temp = temp.filter((j) =>
        j.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.location) {
      temp = temp.filter((j) =>
        j.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredJobs(temp);
  }, [search, filters, jobs]);

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
    <>
      <Header />
      <Box px={{ base: 4, md: 8 }} py={8}>
        <Flex direction={{ base: "column", md: "row" }} gap={6} align="start">
          {/* Sidebar Filters */}
          <Box
            w={{ base: "100%", md: "25%" }}
            border="1px solid"
            borderColor="gray.200"
            rounded="md"
            p={4}
            bg="white"
          >
            <Heading size="md" mb={4} color="yellow.700">
              Filters
            </Heading>

            {/* Search */}
            <Input
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              mb={4}
            />

            {/* job by job name */}
            <Select
              placeholder="Job Name"
              mb={3}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, title: e.target.value }))
              }
            >
              <option value="legal-intern">Legal Intern</option>
              <option value="judicial-intern">Judicial Intern</option>
              <option value="ngo-intern">NGO/Policy Intern</option>
              <option value="junior-advocate">Junior Advocate</option>
              <option value="associate">Associate (Law Firm)</option>
              <option value="litigation-associate">Litigation Associate</option>
              <option value="legal-researcher">Legal Researcher</option>
              <option value="advocate">Advocate (Litigation)</option>
              <option value="corporate-lawyer">
                Corporate Lawyer (In-house)
              </option>
              <option value="legal-advisor">Legal Advisor</option>
              <option value="legal-officer">
                Legal Officer (PSU/Bank/Insurance)
              </option>
              <option value="public-prosecutor">Public Prosecutor</option>
              <option value="arbitration-specialist">
                Arbitration & Dispute Resolution Specialist
              </option>
              <option value="law-lecturer">Law Lecturer / Academic</option>
              <option value="policy-analyst">Policy Analyst</option>
            </Select>
            {/* Job Type */}
            <Select
              placeholder="Job Type"
              mb={3}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, jobType: e.target.value }))
              }
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
              <option value="Contract">Contract</option>
            </Select>

            {/* Salary */}
            <Select
              placeholder="Salary"
              mb={3}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, salary: e.target.value }))
              }
            >
              <option value="₹0 – ₹2 LPA">0-2 LPA</option>
              <option value="₹2 – ₹5 LPA">2-5 LPA</option>
              <option value="₹5 – ₹10 LPA">5-10 LPA</option>
              <option value="₹10 – ₹20 LPA">10-20 LPA</option>
              <option value="₹20 – ₹30 LPA">20-30 LPA</option>
            </Select>

            {/* Location */}
            <Input
              placeholder="Location"
              mb={3}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, location: e.target.value }))
              }
            />

            {/* Reset */}
            <Button
              w="full"
              mt={2}
              colorScheme="yellow"
              variant="outline"
              onClick={() => {
                setSearch("");
                setFilters({ jobType: "", salary: "", location: "" });
              }}
            >
              Reset Filters
            </Button>
          </Box>

          {/* Job Listings */}
          <Box flex="1">
            <Flex justify="space-between" mb={4}>
              <Heading as="h2" size="lg" color="yellow.700">
                All Jobs ({filteredJobs.length})
              </Heading>
            </Flex>
            <Divider mb={4} />

            <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3 }} spacing={6}>
              {filteredJobs.map((job, index) => (
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
                      <CiLocationOn
                        size="18px"
                        style={{ marginRight: "4px" }}
                      />
                      {job?.city}
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
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export default AlljobsPage;
