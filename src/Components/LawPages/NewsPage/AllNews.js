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

export default function AllNews() {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNews, setFilteredNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 8; // ✅ change as needed
  const toast = useToast();
  const navigate = useNavigate();
  const getActiveNews = async () => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/news/news_active`
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
      setNews(data || []);
      setFilteredNews(data || []); // initialize
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
    getActiveNews();
  }, []);

  // ✅ Filter when search query changes
  useEffect(() => {
    const results = news.filter((news) =>
      news?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNews(results);
    setCurrentPage(1); // reset to first page when searching
  }, [searchQuery, news]);

  // ✅ Pagination logic
  const indexOfLast = currentPage * newsPerPage;
  const indexOfFirst = indexOfLast - newsPerPage;
  const currentArticles = filteredNews.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const handleCreateNews = () => {
    if (!JSON.parse(localStorage.getItem("lawvsuserinfo"))) {
      toast({
        title: "Please log in to create an news",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    navigate("/create-news"); // Redirect to create news page
  };
  return (
    <>
      <Header />
      <Container maxW="7xl">
        <Box
          bgGradient="linear(to-r, gray.50, gray.100)"
          py={{ base: 5, md: 10 }}
          textAlign="center"
          mb={3}
        >
          <Heading as="h1" size="2xl" mb={2}>
            Top News
          </Heading>
          <Text fontSize="2xl" color="orange.600" fontWeight="bold">
            Top News Content Goes Here
          </Text>
        </Box>
        {/* 🔍 Search Bar */}
        <Flex mb={6} justify="center" align="center" gap={4} wrap="wrap">
          <Input
            placeholder="Search news by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            maxW="50%"
            bg="white"
          />
          {/* <Button
            onClick={handleCreateNews}
            backgroundColor="green"
            color={"white"}
          >
            Create News
          </Button> */}
        </Flex>

        {/* 📰 News Grid */}
        <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3 }} spacing={8}>
          {currentArticles.map((news) => (
            <Box
              key={news?.id}
              as={Link}
              to={`/news/${news?.slug}`}
              // borderWidth="1px"
              // borderRadius="2xl"
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
                src={news?.NewsImage}
                alt={news?.title}
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
                  fontWeight="extrabold"
                  mb={2}
                  noOfLines={2}
                  color="gray.800"
                  _groupHover={{ color: "teal.600" }}
                >
                  {news?.title}
                </Text>
                <Text align="left" fontSize="sm" color="red.600">
                  {news?.authorName} •{" "}
                  {news?.postedOn && new Date(news.postedOn).toLocaleString()}
                </Text>

                {/* Blog Description Preview */}
                <Box
                  sx={{
                    ".ql-editor, .ql-editor *": {
                      fontSize: "13px !important",
                      fontWeight: "normal !important",
                      lineHeight: "1.7 !important",
                      color: "#4a5568 !important",
                      textAlign: "justify !important",
                      margin: "0 !important",
                      padding: "0 !important",
                    },
                    ".ql-container.ql-bubble": {
                      border: "none",
                      padding: 0,
                      margin: 0,
                      background: "transparent",
                      minHeight: "80px",
                    },
                  }}
                >
                  <ReactQuill
                    value={truncate(news?.description || "", 100)}
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
