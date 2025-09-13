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
import * as mod from "../../../url"; // Update with your actual URL file path
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";
const token = JSON.parse(localStorage.getItem("lawvsuserinfo"))?.data?.token;
const userInfo = JSON.parse(localStorage.getItem("lawvsuserinfo"))?.data?.token;
const userId = userInfo?.data?.userData._id;
// const userType = userInfo?.data?.userData.role;
const config = { headers: { Authorization: token } };
const RECORDS_PER_PAGE = 20;

const ManageAllArticles = () => {
  const [allArticles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Fetch drafts from API
  const fetchAllArticles = async () => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/article/get_user_articles/${userId}`
      );

      setArticles(data.Articles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching :", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllArticles();
  }, []);
  const handleDelete = async (slug, postedOn) => {
    if (postedOn) {
      const postedDate = new Date(postedOn);
      const now = new Date();

      // Difference in milliseconds
      const diffMs = now - postedDate;

      // Convert to hours
      const diffHours = diffMs / (1000 * 60 * 60);

      if (diffHours >= 24) {
        toast({
          title: "You cannot delete this article after 24 hours of posting.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${mod.api_url}/api/v1/article/delete_article/${slug}`,
        config
      );

      setArticles((prevStory) =>
        prevStory.filter((article) => article?.slug !== slug)
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
        title: "Failed to delete article.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Pagination calculation
  const totalPages = Math.ceil(allArticles?.length / RECORDS_PER_PAGE);
  const startIdx = (currentPage - 1) * RECORDS_PER_PAGE;
  const currentRecords = allArticles?.slice(
    startIdx,
    startIdx + RECORDS_PER_PAGE
  );

  return (
    <>
      <Header />
      <Box ml={{ base: 0 }} p={6}>
        <Text fontSize="2xl" mb={4} size="md" bg="#D29B3F" p={3}>
          <strong>All Articles</strong>
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
          <Text
            // fontWeight="bold"
            fontSize="sm"
            mb={1}
            textAlign={"right"}
            align={"right"}
          >
            Total Record: {allArticles?.length}
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
                    <Th border="1px solid #ccc">Update</Th>
                    <Th border="1px solid #ccc">Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currentRecords?.map((article, index) => (
                    <Tr key={article?._id}>
                      {/* <Td border="1px solid #ccc">
                        <Checkbox />
                      </Td> */}
                      <Td border="1px solid #ccc">{startIdx + index + 1}</Td>
                      <Td border="1px solid #ccc">
                        <Image
                          src={article?.articleImage}
                          alt="Article"
                          width="150px"
                          height="80px"
                        />
                      </Td>

                      <Td border="1px solid #ccc">
                        <ChakraLink
                          as={RouterLink}
                          to={`/article/${article?.slug}`} // navigate to single article page
                          color="blue.500"
                          _hover={{ textDecoration: "underline" }}
                        >
                          {article?.title.slice(0, 100)}
                        </ChakraLink>
                      </Td>

                      <Td border="1px solid #ccc">
                        {new Date(article.postedOn).toLocaleDateString()}
                      </Td>
                      <Td border="1px solid #ccc">
                        <ChakraLink
                          as={RouterLink}
                          to={`/update-article/${article?.slug}`} // navigate to single article page
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
                        <IconButton
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          size="sm"
                          aria-label="Delete"
                          onClick={() =>
                            handleDelete(article?.slug, article.postedOn)
                          }
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

export default ManageAllArticles;
