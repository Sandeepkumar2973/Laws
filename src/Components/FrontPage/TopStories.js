// TopStories.js
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

const stories = [
  {
    title: "Supreme Court Issues Notice to Madhya Pradesh Government Over Delay in 27% OBC R...",
    description: "Supreme Court seeks explanation from the Madhya Pradesh government for not implementing the promised...",
    img: "https://source.unsplash.com/random/400x300?court",
  },
  {
    title: "JAL Promoters File SLP Over Noida Land Cancellatio...",
    description: "",
    img: "https://source.unsplash.com/random/400x300?law",
  },
  {
    title: "India Blocks UN Investigator in Air India Crash Pr...",
    description: "",
    img: "https://source.unsplash.com/random/400x300?airplane",
  },
  {
    title: "Supreme Court Issues 2025 Guidelines on Retention ...",
    description: "",
    img: "https://source.unsplash.com/random/400x300?judge",
  },
  {
    title: "Telangana High Court: Only Courts Can Grant ‘Khu...",
    description: "",
    img: "https://source.unsplash.com/random/400x300?telangana",
  },
  {
    title: "Chief Justice Sanjiv Gavai Initiates Judicial Refo...",
    description: "",
    img: "https://source.unsplash.com/random/400x300?justice",
  },
  {
    title: "Supreme Court: Mere Recovery of Weapon with Victim...",
    description: "",
    img: "https://source.unsplash.com/random/400x300?supreme",
  },
];

const TopStories = () => {
  return (
    <Box maxW="1200px" mx="auto" px={5} py={10}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" color="goldenrod">
          Top Stories
        </Heading>
        <Link href="#" color="goldenrod" fontWeight="bold">
          View All
        </Link>
      </Flex>

      {/* Stories Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {stories.map((story, index) => (
          <Flex key={index} align="flex-start" gap={4} borderBottom="1px solid #ddd" pb={4}>
            <Image
              src={story.img}
              alt={story.title}
              boxSize="100px"
              objectFit="cover"
              borderRadius="md"
            />
            <VStack align="flex-start" spacing={1}>
              <Text fontWeight="bold">{story.title}</Text>
              {story.description && (
                <Text fontSize="sm" color="gray.600">
                  {story.description}
                </Text>
              )}
            </VStack>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TopStories;
