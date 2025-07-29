// src/components/LawDecoded.jsx

import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
  AspectRatio,
} from "@chakra-ui/react";

const videos = [
  {
    id: 1,
    title: "Atul Subhash Case",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID1",
  },
  {
    id: 2,
    title: "Trademark Registration",
    subtitle: "Trademark Registrati",
    embedUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID2",
  },
  {
    id: 3,
    title: "Legal Career Hub",
    subtitle: "LAWVS India's first",
    embedUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID3",
  },
  {
    id: 4,
    title: "LAWVS India's first Portal",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID4",
  },
];

const LawDecoded = () => {
  return (
    <Container maxW="7xl" py={10}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h2" size="xl" color="goldenrod">
          Law Decoded
        </Heading>
        <Link color="goldenrod" fontWeight="bold">
          View All
        </Link>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {videos.map((video) => (
          <VStack
            key={video.id}
            spacing={4}
            align="center"
            borderRadius="md"
            overflow="hidden"
          >
            <AspectRatio w="100%" ratio={16 / 9}>
              <iframe
                title={video.title}
                src={video.embedUrl}
                allowFullScreen
              />
            </AspectRatio>
            <Box textAlign="center">
              <Heading as="h3" size="md" color="goldenrod">
                {video.title}
              </Heading>
              {video.subtitle && (
                <Text color="gray.600">{video.subtitle}</Text>
              )}
            </Box>
          </VStack>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default LawDecoded;
