import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Spinner,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Select,
  useToast,
  Container,
  Badge,
  Flex,
  IconButton
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import * as mod from "../../url";

const SIDEBAR_WIDTH = "250px";

const UserApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc"); // for appliedAt sorting
  const [currentPage, setCurrentPage] = useState(1);
  const appsPerPage = 6;

  const toast = useToast();
  const navigate = useNavigate();

  const adminInfo = sessionStorage.getItem("AdminjobInfo");
  const parsedInfo = JSON.parse(adminInfo);
  const adminId = parsedInfo?.data?.admin?.id;
  const token = parsedInfo?.data?.token;

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${mod.api_url}/api/v1/admin/get-userBy-application/${adminId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const dataArray = Array.isArray(res.data.data)
        ? res.data.data
        : [res.data.data];
      setApplications(dataArray);
      setFilteredApps(dataArray);
    } catch (err) {
      toast({
        title: "Error fetching data",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    let filtered = [...applications];

    if (statusFilter !== "All") {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.appliedAt);
      const dateB = new Date(b.appliedAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredApps(filtered);
    setCurrentPage(1); // reset to page 1 after filter/sort
  }, [statusFilter, sortOrder, applications]);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const res = await axios.post(
        `${mod.api_url}/api/v1/admin/change-application-status/${applicationId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      toast({
        title: "Status updated",
        description: res.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      fetchApplications();
    } catch (err) {
      toast({
        title: "Failed to update status",
        description: err.response?.data?.message || err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const indexOfLastApp = currentPage * appsPerPage;
  const indexOfFirstApp = indexOfLastApp - appsPerPage;
  const currentApps = filteredApps.slice(indexOfFirstApp, indexOfLastApp);
  const totalPages = Math.ceil(filteredApps.length / appsPerPage);

  const handleViewDetails = (userId) => {
    navigate(`/user-details/${userId}`);
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <Box mt="100px" ml={{ base: 0, md: SIDEBAR_WIDTH }} p={6}>
        <Container maxW="container.xl" p={4}>
          <Flex justify="space-between" align="center" mb={4} wrap="wrap" gap={3}>
            <Heading>User Applications</Heading>
            <Flex gap={2} align="center">
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                width="200px"
              >
                <option value="All">All</option>
                <option value="Viewed">Viewed</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Rejected">Rejected</option>
              </Select>
              <IconButton
                icon={sortOrder === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />}
                onClick={() =>
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                }
                title="Toggle sort"
              />
            </Flex>
          </Flex>

          {loading ? (
            <Center mt={10}>
              <Spinner size="lg" />
            </Center>
          ) : currentApps.length === 0 ? (
            <Text>No applications found.</Text>
          ) : (
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Applied Role</Th>
                  <Th>Status</Th>
                  <Th>Change Status</Th>
                  <Th>Applied At</Th>
                  <Th>Resume</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentApps.map((app) => (
                  <Tr key={app._id}>
                    <Td
                      onClick={() => handleViewDetails(app.userId?._id)}
                      color="blue.500"
                      cursor="pointer"
                      _hover={{ textDecoration: "underline" }}
                    >
                      {app.userId?.fullName || "N/A"}
                    </Td>
                    <Td>{app.userId?.email || "N/A"}</Td>
                    <Td>{app?.jobId?.title || "N/A"}</Td>
                    <Td>
                      <Badge
                        colorScheme={
                          app.status === "Rejected"
                            ? "red"
                            : app.status === "Shortlisted"
                              ? "green"
                              : "yellow"
                        }
                        variant="subtle"
                        px={3}
                        py={1}
                        borderRadius="md"
                      >
                        {app.status}
                      </Badge>
                    </Td>
                    <Td>
                      <Select
                        size="sm"
                        value={app.status}
                        onChange={(e) =>
                          handleStatusChange(app._id, e.target.value)
                        }
                      >
                        <option value="Viewed">Viewed</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Rejected">Rejected</option>
                      </Select>
                    </Td>
                    <Td>{new Date(app.appliedAt).toLocaleDateString()}</Td>
                    <Td>
                      {app.userId?.resumeUrl ? (
                        <Button
                          colorScheme="blue"
                          size="sm"
                          onClick={() =>
                            window.open(app.userId.resumeUrl, "_blank")
                          }
                        >
                          Download
                        </Button>
                      ) : (
                        "No Resume"
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Flex justify="center" mt={6} gap={4} align="center">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                isDisabled={currentPage === 1}
              >
                Prev
              </Button>
              <Text>
                Page {currentPage} of {totalPages}
              </Text>
              <Button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
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

export default UserApplications;
