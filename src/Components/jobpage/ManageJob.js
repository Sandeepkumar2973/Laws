import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useToast,
  Heading,
  Badge,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import * as mod from "../../url";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar/Navbar";

const ManageCourse = () => {
  const [jobList, setJobList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [countapplication, setCountapplication] = useState(0)
  const [allApplications, setAllApplications] = useState([]);

  const jobsPerPage = 6;

  const toast = useToast();
  const AdminjobInfo = sessionStorage.getItem("AdminjobInfo");
  const parsedUserInfo = JSON.parse(AdminjobInfo);
  const adminId = parsedUserInfo?.data?.admin?.id;
  const token = parsedUserInfo?.data?.token;
  const navigate = useNavigate();
  const SIDEBAR_WIDTH = "250px";

  const getMyjob = async () => {
    try {
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      const { data } = await axios.get(
        `${mod.api_url}/api/v1/job/get-job-byAdminId/${adminId}?page=${currentPage}&limit=${jobsPerPage}`,
        config
      );

      let jobs = data?.data || [];

      // Filter by status
      if (statusFilter !== "All") {
        jobs = jobs.filter((job) => job.status === statusFilter);
      }

      // Search filter
      if (searchTerm.trim()) {
        jobs = jobs.filter(
          (job) =>
            job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.jobType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.salaryRange?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Sort by timestamp
      jobs.sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return sortOrder === "Newest"
          ? dateB - dateA
          : dateA - dateB;
      });

      setJobList(jobs);
      setTotalPages(data?.pagination?.pages || 1);
    } catch (error) {
      toast({
        title: "Error fetching jobs.",
        description: error.response?.data?.message || "Something went wrong!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (adminId) getMyjob();
  }, [currentPage, searchTerm, statusFilter, sortOrder]);

  const handleUpdate = (id) => {
    navigate(`/update-job/${id}`);
  };

  const handleDelete = async (_id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this job?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const config = {
                headers: {
                  Authorization: `${token}`,
                },
              };
              await axios.delete(
                `${mod.api_url}/api/v1/job/delete-jobList-byId/${_id}`,
                config
              );
              toast({
                title: "Job deleted.",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
              getMyjob();
            } catch (error) {
              toast({
                title: "Error deleting job.",
                description:
                  error.response?.data?.message || "Something went wrong!",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
          },
        },
        { label: "No" },
      ],
    });
  };

  const handleCreateJob = () => {
    navigate("/create-job");
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const config = {
          headers: { Authorization: `${token}` },
        };
        const res = await axios.get(
          `${mod.api_url}/api/v1/admin/get-userBy-application/${adminId}`,
          config
        );
        setAllApplications(res.data?.data);
        // console.log(res.data.data, 'res')
      } catch (err) {
        console.error("Error fetching applications", err.message);
      }
    };

    if (adminId) {
      fetchApplications();
    }
  }, [adminId]);



  return (
    <>
      <Navbar />
      <Sidebar />
      <Box mt="100px" ml={{ base: 0, md: SIDEBAR_WIDTH }} p={6}>
        <Container maxW="container.xl" p={4}>
          <Flex justify="space-between" align="center" mb={4} wrap="wrap" gap={4}>
            <Heading size="md">Manage All Jobs</Heading>
            <Flex gap={2} align="center" wrap="wrap">
              <input
                type="text"
                placeholder="Search by title, location"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #CBD5E0",
                  fontSize: "14px",
                  width: "200px",
                }}
              />

              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                width="150px"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Select>

              <Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                width="150px"
              >
                <option value="Newest">Newest First</option>
                <option value="Oldest">Oldest First</option>
              </Select>

              <Button colorScheme="blue" onClick={handleCreateJob}>
                Create Job
              </Button>
            </Flex>
          </Flex>

          <Divider mb={6} />

          <Box overflowX="auto">
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  {/* <Th>Company</Th> */}
                  <Th> Applicants</Th>
                  <Th>Date</Th>
                  <Th>Job Type</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {jobList.length === 0 ? (
                  <Tr>
                    <Td colSpan="7" textAlign="center">
                      No jobs found.
                    </Td>
                  </Tr>
                ) : (
                  jobList.map((job) => (
                    <Tr key={job._id}>
                      <Td>{job.title}</Td>
                      {/* <Td>{job.company}</Td> */}
                      {/* <Td>{countapplication?.count} /Applicants</Td> */}
                      <Td>{job._id && allApplications.filter(app => app.jobId?._id === job._id).length} /Applicants</Td>

                      <Td>{new Date(job.timestamp).toLocaleDateString()}</Td>
                      <Td>{job.jobType}</Td>
                      <Td>
                        <Badge colorScheme={job.status === "Active" ? "green" : "red"}>
                          {job.status}
                        </Badge>
                      </Td>
                      <Td>
                        <Flex gap={2}>
                          <Button size="sm" colorScheme="teal" onClick={() => handleUpdate(job._id)}>
                            Update
                          </Button>
                          <Button size="sm" colorScheme="red" onClick={() => handleDelete(job._id)}>
                            Delete
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </Box>

          {totalPages > 1 && (
            <Flex justify="center" mt={6} gap={4} align="center">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                isDisabled={currentPage === 1}
              >
                Prev
              </Button>
              <Text fontWeight="medium">
                Page {currentPage} of {totalPages}
              </Text>
              <Button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                isDisabled={currentPage === totalPages}
              >
                Next
              </Button>
            </Flex>
          )}
        </Container>
      </Box>
    </>
  );
};

export default ManageCourse;
