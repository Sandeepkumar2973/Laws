import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Text,
  IconButton,
  Stack,
  Spinner,
  useToast,
  Image,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import axios from "axios";
import * as mod from "../../../url";
import { formats, modules } from "../../../utils/Quill";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer"; // Update with your actual URL file path
const token = JSON.parse(sessionStorage.getItem("superAdminLawvs"))?.data
  ?.token;
const config = { headers: { Authorization: token } };
const SIDEBAR_WIDTH = "250px";
const RECORDS_PER_PAGE = 20;

const ManageAllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Fetch blogs from API
  const fetchAllBlogs = async () => {
    try {
      const { data } = await axios.get(`${mod.api_url}/api/v1/blogs/get_blogs`);
      //   console.log(data, "ijoijdsps");
      setBlogs(data.blogs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  const handleStatusToggle = async (slug, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await axios.put(
        `${mod.api_url}/api/v1/blogs/status_blogs/${slug}`,
        { status: newStatus },
        config
      );

      setBlogs((prevStory) =>
        prevStory.map((blogs) =>
          blogs.slug === slug ? { ...blogs, status: newStatus } : blogs
        )
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);
  const handleDelete = async (slug) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blogs?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${mod.api_url}/api/v1/blogs/delete_blogs/${slug}`,
        config
      );

      // Update state to remove the deleted blogs
      setBlogs((prevStory) =>
        prevStory.filter((blogs) => blogs?.slug !== slug)
      );

      toast({
        title: "Draft deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Failed to delete blogs.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Pagination calculation
  const totalPages = Math.ceil(blogs?.length / RECORDS_PER_PAGE);
  const startIdx = (currentPage - 1) * RECORDS_PER_PAGE;
  const currentRecords = blogs.slice(startIdx, startIdx + RECORDS_PER_PAGE);

  return (
    <>
      <Header />

      <Box mt="100px" ml={{ base: 0, md: SIDEBAR_WIDTH }} p={6}>
        <Text fontSize="2xl" mb={4} size="md" bg="#D29B3F" p={3}>
          <strong>All Blogs</strong>
        </Text>

        <Flex
          bg="white"
          p={4}
          mb={4}
          borderRadius="md"
          boxShadow="sm"
          align="center"
          flexWrap="wrap"
          gap={4}
        >
          <Input
            placeholder="Enter title, name or keyword to search record"
            maxW="300px"
          />

          <Flex ml="auto">
            <Button
              colorScheme="blue"
              leftIcon={<AddIcon />}
              as={RouterLink}
              to="/create-article"
              _hover={{ bg: "blue.100" }}
              textDecoration="none"
            >
              Add New Record
            </Button>
          </Flex>
        </Flex>

        <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
          <Text fontWeight="bold" fontSize="lg" mb={4}>
            Total Record: {blogs?.length}
          </Text>
          {/* <Text fontSize="sm"></Text> */}
          {loading ? (
            <Spinner size="xl" />
          ) : (
            <>
              <Table
                variant="simple"
                size="sm"
                style={{ border: "1px solid #ccc", borderCollapse: "collapse" }}
              >
                <Thead bg="gray.100">
                  <Tr>
                    {/* <Th border="1px solid #ccc">
                      <Checkbox />
                    </Th> */}
                    {/* <Th border="1px solid #ccc">Sr. No</Th> */}
                    <Th border="1px solid #ccc">ID</Th>
                    <Th border="1px solid #ccc">Image</Th>
                    <Th border="1px solid #ccc">Title</Th>
                    <Th border="1px solid #ccc">Posted on</Th>
                    <Th border="1px solid #ccc">Action</Th>
                    <Th border="1px solid #ccc">Status</Th>
                    <Th border="1px solid #ccc">Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currentRecords?.map((blogs, index) => (
                    <Tr key={blogs?._id}>
                      {/* <Td border="1px solid #ccc">
                        <Checkbox />
                      </Td> */}
                      <Td border="1px solid #ccc">{startIdx + index + 1}</Td>
                      <Td border="1px solid #ccc">
                        <Image
                          src={blogs?.blogImage}
                          alt="Story"
                          boxSize="80px" // you can adjust to your needs, like boxSize="100px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                      </Td>

                      <Td border="1px solid #ccc">
                        <ChakraLink
                          as={RouterLink}
                          to={`/update-blogs/${blogs?.slug}`} // navigate to single blogs page
                          color="blue.500"
                          _hover={{ textDecoration: "underline" }}
                        >
                          {blogs?.title.slice(0, 100)}
                        </ChakraLink>
                      </Td>

                      <Td border="1px solid #ccc">
                        {new Date(blogs.postedOn).toLocaleDateString()}
                      </Td>
                      <Td border="1px solid #ccc">
                        <ChakraLink
                          as={RouterLink}
                          to={`/update-blogs/${blogs?.slug}`} // navigate to single blogs page
                          color="blue.500"
                          _hover={{ textDecoration: "underline" }}
                        >
                          <IconButton
                            icon={<EditIcon />}
                            colorScheme="blue"
                            size="sm"
                            aria-label="Edit"
                          />
                        </ChakraLink>
                      </Td>
                      <Td border="1px solid #ccc">
                        <Button
                          size="sm"
                          colorScheme={
                            blogs?.status === "active" ? "green" : "red"
                          }
                          onClick={() =>
                            handleStatusToggle(blogs?.slug, blogs?.status)
                          }
                        >
                          {blogs?.status === "active" ? "Active" : "Inactive"}
                        </Button>
                      </Td>

                      <Td border="1px solid #ccc">
                        <IconButton
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          size="sm"
                          aria-label="Delete"
                          onClick={() => handleDelete(blogs?.slug)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              {/* Pagination */}
              <Flex justify="space-between" align="center" mt={4}>
                <Stack direction="row" spacing={2}>
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <Button
                      key={idx}
                      size="sm"
                      onClick={() => setCurrentPage(idx + 1)}
                      colorScheme={currentPage === idx + 1 ? "blue" : "gray"}
                      variant={currentPage === idx + 1 ? "solid" : "outline"}
                    >
                      {idx + 1}
                    </Button>
                  ))}
                </Stack>
              </Flex>
            </>
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ManageAllBlogs;
