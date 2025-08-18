// TopArticles.js
import React from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Link,
  Image,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";

const articles = [
  {
    title:
      "Space Law and India’s Private Sector Boom: Time for a New Regulatory Code?",
    description:
      "India's private space sector is expanding rapidly with startups entering rocket and satellite development.",
    img: "https://lawvs.com/media/admin/blogs/1753444301_1cd1e7d3498f3f701354.png",
  },
  {
    title: "Data Localization Laws in India: National Security...",
    img: "https://lawvs.com/media/admin/blogs/1753444301_1cd1e7d3498f3f701354.png",
  },
  {
    title: "Navigating Copyright Challenges in the Age of Inte...",
    img: "https://lawvs.com/media/admin/blogs/1753444301_1cd1e7d3498f3f701354.png",
  },
  {
    title: "Transparency Under Scrutiny in Maharashtra",
    img: "https://lawvs.com/media/admin/blogs/1753444301_1cd1e7d3498f3f701354.png",
  },
  {
    title: "The Evolution of Bail Jurisprudence in India: From...",
    img: "https://lawvs.com/media/admin/blogs/1753444301_1cd1e7d3498f3f701354.png",
  },
  {
    title: "Live Streaming of Court Proceedings: A Step Towar...",
    img: "https://swarajyamag.com/infrastructure/in-live-streaming-proceedings-of-constitutional-bench-next-week-supreme-court-is-following-footsteps-of-six-high-courts",
  },
  {
    title: "Decoding the DNA Bill: Privacy vs. Crime Control i...",
    img: "https://lawvs.com/media/admin/blogs/1750854082_3572f95f65fb64fb123d.png",
  },
];

const TopArticles = () => {
  return (
    <Box maxW="1200px" mx="auto" px={5} py={10}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" color="goldenrod">
          Top Articles
        </Heading>
        <Link href="#" color="goldenrod" fontWeight="bold">
          View All
        </Link>
      </Flex>

      {/* First Article */}
      <Flex mb={8} direction={{ base: "column", md: "row" }} gap={4}>
        <Image
          src={articles[0].img}
          alt={articles[0].title}
          borderRadius="md"
          w={{ base: "100%", md: "300px" }}
          h="200px"
          objectFit="cover"
        />
        <VStack align="flex-start" spacing={2}>
          <Text fontWeight="bold">{articles[0].title}</Text>
          <Text fontSize="sm" color="gray.600">
            {articles[0].description}
          </Text>
        </VStack>
      </Flex>

      {/* Other Articles */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {articles.slice(1).map((article, index) => (
          <Flex key={index} gap={4} align="flex-start">
            <Image
              src={article.img}
              alt={article.title}
              boxSize="80px"
              objectFit="cover"
              borderRadius="md"
              flexShrink="0"
            />
            <Text fontWeight="medium">{article.title}</Text>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TopArticles;
