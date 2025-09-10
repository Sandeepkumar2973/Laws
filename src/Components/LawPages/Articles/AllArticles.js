import {
  Box,
  Image,
  Text,
  SimpleGrid,
  Container,
  useToast,
  Input,
  Flex,
  Button,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as mod from "../../../url";
import ReactQuill from "react-quill";
import truncate from "html-truncate";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";

export default function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 8; // ✅ change as needed
  const toast = useToast();
  const navigate = useNavigate();
  const getActiveArticles = async () => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/article/get_active_articles`
      );
      if (data?.length === 0) {
        toast({
          title: "No stories found",
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
      setArticles(data?.Articles || []);
      setFilteredArticles(data?.Articles || []); // initialize
    } catch (error) {
      toast({
        title: "Error fetching stories",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    getActiveArticles();
  }, []);

  // ✅ Filter when search query changes
  useEffect(() => {
    const results = articles.filter((article) =>
      article?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArticles(results);
    setCurrentPage(1); // reset to first page when searching
  }, [searchQuery, articles]);

  // ✅ Pagination logic
  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const handleCreateArticle = () => {
    if (!JSON.parse(localStorage.getItem("lawvsuserinfo"))) {
      toast({
        title: "Please log in to create an article",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    navigate("/create-article"); // Redirect to create article page
  };
  return (
    <>
      <Header />
      <Container maxW="7xl" py={8}>
        <Box
          bgGradient="linear(to-r, gray.50, gray.100)"
          py={{ base: 5, md: 10 }}
          textAlign="center"
          mb={3}
        >
          <Heading as="h1" size="2xl" mb={2}>
            Top Articles
          </Heading>
          <Text fontSize="2xl" color="orange.600" fontWeight="bold">
            Top Articles Content Goes Here
          </Text>
        </Box>
        {/* 🔍 Search Bar */}
        <Flex mb={6} justify="center" align="center" gap={4} wrap="wrap">
          <Input
            placeholder="Search articles by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            maxW="50%"
            bg="white"
          />
          <Button
            onClick={handleCreateArticle}
            backgroundColor="green"
            color={"white"}
          >
            Create Article
          </Button>
        </Flex>

        {/* 📰 Articles Grid */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8}>
          {currentArticles.map((article) => (
            <Box
              key={article?.id}
              as={Link}
              to={`/article/${article?.slug}`}
              borderWidth="1px"
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="md"
              bg="white"
              transition="all 0.4s ease-in-out"
              _hover={{
                transform: "translateY(-8px) scale(1.03)",
                boxShadow: "xl",
                borderColor: "transparent",
                bgGradient: "linear(to-br, teal.50, pink.50)",
              }}
            >
              {/* Blog Image */}
              <Image
                src={article?.articleImage}
                alt={article?.title}
                w="100%"
                h="220px"
                objectFit="cover"
                transition="all 0.3s"
                _hover={{ filter: "brightness(1.1) saturate(1.2)" }}
              />

              {/* Blog Content */}
              <Box p={5}>
                <Text
                  align="left"
                  fontSize="sm"
                  color="gray.600"
                  mb={3}
                  backgroundColor="red.200"
                  px={3}
                  py={1}
                  borderRadius="full"
                  display="inline-block"
                >
                  {article?.authorName} • {article?.postedOn?.split("T")[0]}
                </Text>

                <Text
                  align="left"
                  fontSize="lg"
                  fontWeight="extrabold"
                  mb={2}
                  noOfLines={2}
                  color="gray.800"
                  _groupHover={{ color: "teal.600" }}
                >
                  {article?.title?.toUpperCase()}
                </Text>

                {/* Blog Description Preview */}
                <Box
                  sx={{
                    ".ql-editor": {
                      fontSize: "15px !important",
                      lineHeight: "1.7",
                      color: "#4a5568",
                      textAlign: "justify",
                    },
                    ".ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6":
                      {
                        fontSize: "15px !important",
                        fontWeight: "normal",
                        lineHeight: "1.7",
                      },
                    ".ql-container.ql-bubble": {
                      border: "none",
                      padding: 0,
                      margin: 0,
                      background: "transparent",
                      minHeight: "80px",
                      lineHeight: "1.7",
                    },
                  }}
                >
                  <ReactQuill
                    value={truncate(article?.description || "", 100)}
                    readOnly
                    theme="bubble"
                    modules={{ toolbar: false }}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        {/* 📄 Pagination */}
        <Flex justify="center" mt={8} gap={2} wrap="wrap">
          <Button
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            isDisabled={currentPage === 1}
          >
            Prev
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              size="sm"
              onClick={() => setCurrentPage(i + 1)}
              variant={currentPage === i + 1 ? "solid" : "outline"}
              colorScheme="blue"
            >
              {i + 1}
            </Button>
          ))}
          <Button
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Flex>
      </Container>
      <Footer />
    </>
  );
}
