import {
  Box,
  Image,
  Text,
  Heading,
  VStack,
  HStack,
  Container,
  useToast,
  Link as ChakraLink,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";
import axios from "axios";
import * as mod from "../../../url";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import ShareSidebar from "../../../utils/ShareSidebar";

export default function SingleNews() {
  const [news, setNews] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { slug } = useParams();
  // Fetch news by slug
  const getNewsBySlug = async (slug) => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/news/news_get/${slug}`
      );

      if (!data) {
        toast({
          title: "Story not found",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setNews(null);
        return;
      }
      setNews(data.News || null);
    } catch (error) {
      toast({
        title: "Error fetching  single news.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Fetch latest articles (excluding current one)
  const getLatestNews = async () => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/news/get_latest_news`
      );
      const filtered = data?.filter((s) => s.slug !== slug).slice(0, 5);
      setLatestNews(filtered);
    } catch (error) {
      console.error("Error fetching latest articles:", error);
    }
  };

  useEffect(() => {
    if (!slug) return; // prevent API call without slug
    setLoading(true);
    getNewsBySlug(slug).then(() => setLoading(false));
    getLatestNews();
  }, [slug]);

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!news) {
    return <Text textAlign="center">Story not found</Text>;
  }

  return (
    <>
      <Header />
      <Container maxW="7xl" py={{ base: 6, md: 10 }}>
        <HStack
          align="start"
          spacing={{ base: 0, md: 8 }}
          flexDir={{ base: "column", md: "row" }}
        >
          {/* Left Side - Story Details */}
          <Box flex="70%" p={{ base: 2, md: 6 }}>
            <Heading
              fontSize={{ base: "xl", md: "2xl" }}
              mb={4}
              color="gray.800"
              lineHeight="short"
              textAlign="left"
            >
              {news?.title}
            </Heading>

            <Image
              src={news?.NewsImage}
              alt={news?.title}
              mb={6}
              w="100%"
              maxH="400px"
              // objectFit="cover"
              borderRadius="xl"
              boxShadow="md"
              transition="all 0.4s ease"
              _hover={{ transform: "scale(1.02)", boxShadow: "xl" }}
            />

            <Text color="gray.500" mb={6} fontSize={{ base: "sm", md: "md" }}>
              {news?.authorName} • {news?.postedOn?.split("T")[0]}
            </Text>

            {/* Full Content (HTML) */}
            <Box
              sx={{
                ".ql-editor ": {
                  lineHeight: "1.8 !important",
                  color: "#2d3748", // gray.800
                  textAlign: "justify",
                  fontFamily: "serif",
                },
                // ".ql-editor p": { marginBottom: "1em" },
                ".ql-editor p": {
                  marginTop: "1 !important",
                  marginBottom: "0 !important", // sirf niche space
                  fontSize: "16px !important",
                  fontFamily: "serif",
                },
                ".ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4,.ql-editor h5, .ql-editor b":
                  {
                    marginTop: "1px !important",
                    marginBottom: "0 !important",
                    fontSize: "20px !important",
                    fontFamily: "serif",
                  },
                ".ql-editor img": {
                  maxWidth: "400px", // responsive
                  minWidth: "500px", // responsive
                  height: "300px",
                  borderRadius: "12px", // rounded corners
                  margin: "16px 0", // top-bottom space
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // soft shadow
                  objectFit: "cover",
                  alignItems: "center",
                },
              }}
            >
              <ReactQuill
                value={news?.description}
                readOnly
                theme="bubble"
                style={{
                  minHeight: "300px",
                  textAlign: "justify",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  margin: 0,
                }}
              />
            </Box>
          </Box>

          {/* Right Side - Latest Stories */}
          <Box
            flex="30%"
            position="sticky"
            top="100px"
            align="start"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="xl"
            p={1}
            maxW={{ base: "100%", md: "400px" }}
            minH="600px"
            bg="white"
            boxShadow="md"
            transition="all 0.3s ease"
            _hover={{ boxShadow: "xl", transform: "translateY(-4px)" }}
          >
            <Heading
              size="md"
              mb={5}
              textAlign="center"
              backgroundColor="yellow.500"
              py={3}
              borderRadius="md"
              fontWeight="semibold"
              letterSpacing="wide"
            >
              Latest news
            </Heading>

            <VStack align="start" spacing={5}>
              {latestNews?.map((ns) => (
                <HStack
                  key={ns?.slug}
                  spacing={4}
                  align="center"
                  w="100%"
                  p={2}
                  borderRadius="lg"
                  transition="all 0.3s ease"
                  _hover={{ bg: "gray.50", transform: "translateX(6px)" }}
                >
                  <Flex>
                    {" "}
                    <Image
                      src={ns?.NewsImage}
                      alt={ns?.title}
                      height="80px"
                      width="120px"
                      objectFit="cover"
                      borderRadius="md"
                      boxShadow="sm"
                      transition="all 0.3s ease"
                      _hover={{ boxShadow: "md" }}
                    />
                    <ChakraLink
                      as={Link}
                      to={`/news/${ns?.slug}`}
                      fontWeight="semibold"
                      fontSize={{ base: "sm", md: "md" }}
                      color="gray.700"
                      noOfLines={2}
                      transition="color 0.2s"
                      _hover={{ color: "teal.600" }}
                      marginLeft={3}
                    >
                      {ns?.title}
                    </ChakraLink>
                  </Flex>
                </HStack>
              ))}
            </VStack>
          </Box>
          <ShareSidebar url={window.location.href} title={news.title} />
        </HStack>
      </Container>
      <Footer />
    </>
  );
}
