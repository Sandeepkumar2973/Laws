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

export default function SingleBlogPage() {
  const [blog, setStory] = useState(null);
  const [latestStories, setLatestStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { slug } = useParams();
  // Fetch blog by slug
  const getStoryBySlug = async (slug) => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/blogs/get_single/${slug}`
      );
      if (!data.blog) {
        toast({
          title: "Story not found",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setStory(null);
        return;
      }
      setStory(data.blog);
    } catch (error) {
      toast({
        title: "Error fetching  single blog.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Fetch latest stories (excluding current one)
  const getLatestStories = async () => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/blogs/get_latest_blogs`
      );
      const filtered = data.blogs.filter((s) => s.slug !== slug).slice(0, 5);
      setLatestStories(filtered);
    } catch (error) {
      console.error("Error fetching latest stories:", error);
    }
  };

  useEffect(() => {
    if (!slug) return; // prevent API call without slug
    setLoading(true);
    getStoryBySlug(slug).then(() => setLoading(false));
    getLatestStories();
  }, [slug]);

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!blog) {
    return <Text textAlign="center">Story not found</Text>;
  }

  return (
    <>
      <Header />
      <Container maxW="7xl" py={8}>
        <HStack
          align="start"
          spacing={8}
          flexDir={{ base: "column", md: "row" }}
        >
          {/* Left Side - Story Details */}
          <Box flex="70%" align="start" p={4} m={4}>
            <Heading mb={2} fontSize={{ base: "xl", md: "2xl" }}>
              {blog?.title}
            </Heading>
            <Text color="red.500" mb={1} fontSize={{ base: "sm", md: "md" }}>
              {blog?.authorName}
            </Text>
            <Text color="gray.500" mb={1} fontSize={{ base: "sm", md: "md" }}>
              {blog?.postedOn && new Date(blog?.postedOn).toLocaleString()}
            </Text>
            <Image
              src={blog?.blogImage}
              alt={blog?.title}
              mb={4}
              w="100%"
              maxH="450px"
              objectFit="cover"
              borderRadius="xl"
              boxShadow="md"
              transition="all 0.4s ease"
              _hover={{ transform: "scale(1.02)", boxShadow: "xl" }}
            />

            {/* Full Content (HTML) */}
            <Box
              sx={{
                ".ql-editor ": {
                  lineHeight: "1.8 !important",
                  color: "#2d3748", // gray.800
                  textAlign: "justify",
                  fontFamily: "serif",
                  fontSize: "20px !important",
                },
                // ".ql-editor p": { marginBottom: "1em" },
                ".ql-editor p": {
                  marginTop: "1 !important",
                  marginBottom: "0 !important", // sirf niche space
                  fontSize: "20px !important",
                  fontFamily: "serif",
                  lineHeight: "1.7",
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
                ".ql-editor, .ql-editor *": {
                  fontSize: "20px !important",
                  // fontWeight: "normal !important",
                  lineHeight: "1.7 !important",
                  // color: "#4a5568 !important",
                  textAlign: "justify !important",
                  margin: "0 !important",
                  padding: "0 !important",
                  fontFamily: "serif !important",
                },
              }}
            >
              <ReactQuill
                value={blog?.description}
                readOnly
                theme="bubble"
                style={{
                  minHeight: "300px",
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
            minH="90vh"
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
              Latest Articles
            </Heading>

            <VStack align="start" spacing={5}>
              {latestStories.map((s) => (
                <HStack
                  key={s.slug}
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
                      src={s.blogImage}
                      alt={s.title}
                      height="80px"
                      width="120px"
                      borderRadius="md"
                      boxShadow="sm"
                      transition="all 0.3s ease"
                      _hover={{ boxShadow: "md" }}
                      // marginRight={3}
                    />
                    <ChakraLink
                      as={Link}
                      marginLeft={3}
                      to={`/single-blog/${s.slug}`}
                      fontWeight="semibold"
                      fontSize={{ base: "sm", md: "md" }}
                      color="gray.700"
                      noOfLines={2}
                      transition="color 0.2s"
                      _hover={{ color: "teal.600" }}
                    >
                      {s.title}
                    </ChakraLink>
                  </Flex>
                </HStack>
              ))}
            </VStack>
          </Box>
          <ShareSidebar url={window.location.href} title={blog?.title} />
        </HStack>
      </Container>
      <Footer />
    </>
  );
}
