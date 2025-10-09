import {
  Box,
  Image,
  Text,
  SimpleGrid,
  Container,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as mod from "../../../url";
import ReactQuill from "react-quill";
import truncate from "html-truncate"; //  install: npm install html-truncate

export default function LatestArticles() {
  const [articles, setArticles] = useState([]);
  const toast = useToast();

  const getActiveArticles = async () => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/article/get_latest_articles`
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
      setArticles(data);
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

  return (
    <Container maxW="7xl" py={8}>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }} // ✅ responsive breakpoints
        spacing={{ base: 5, md: 8 }} // ✅ smaller spacing on mobile
      >
        {articles.map((news) => (
          <Box
            key={news?.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            transition="all 0.3s"
            _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
            as={Link}
            to={`/article/${news?.slug}`}
          >
            {/* Blog Image */}
            <Image
              src={news?.NewsImage}
              alt={news?.title}
              w="100%"
              h={{ base: "150px", md: "200px" }} // ✅ smaller height on mobile
              objectFit="cover"
            />

            {/* Blog Content */}
            <Box p={{ base: 3, md: 4 }}>
              {" "}
              {/* ✅ smaller padding on mobile */}
              <Text
                align="left"
                fontSize={{ base: "md", md: "xl" }} // ✅ smaller text on mobile
                fontWeight="bold"
                mb={2}
                noOfLines={2}
              >
                {news?.title}
              </Text>
              <Text
                align="left"
                fontSize={{ base: "xs", md: "sm" }}
                color="gray.500"
                mb={3}
              >
                {news?.author} • {news?.postedOn?.split("T")[0]}
              </Text>
              {/* Blog Description Preview */}
              <Box
                align="left"
                fontSize={{ base: "sm", md: "md" }}
                color="gray.700"
              >
                <ReactQuill
                  value={truncate(news?.description || "", 100)}
                  readOnly
                  theme="bubble"
                  style={{
                    minHeight: "80px", // ✅ shorter preview on mobile
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    margin: 0,
                  }}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
