// src/components/Interviews.jsx

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

const interviews = [
  {
    id: 1,
    name: "Mehul Bhatnagar",
    subtitle: "Unlocking MUN Master",
    embedUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID1",
  },
  {
    id: 2,
    name: "Tajwinder Singh",
    subtitle: "Tajwinder Singh, a r",
    embedUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID2",
  },
  {
    id: 3,
    name: "Introducing Avadhesh",
    subtitle: "Introducing Avadhesh",
    embedUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID3",
  },
];

const Interviews = () => {
  return (
    <Container maxW="7xl" py={10}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h2" size="xl" color="goldenrod">
          Interviews
        </Heading>
        <Link color="goldenrod" fontWeight="bold">
          View All
        </Link>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {interviews.map((interview) => (
          <VStack
            key={interview.id}
            spacing={4}
            borderRadius="md"
            overflow="hidden"
            textAlign="center"
          >
            <AspectRatio w="100%" ratio={16 / 9}>
              <iframe
                title={interview.name}
                src={interview.embedUrl}
                allowFullScreen
              />
            </AspectRatio>
            <Box>
              <Heading as="h3" size="md" color="goldenrod">
                {interview.name}
              </Heading>
              <Text color="gray.600">{interview.subtitle}</Text>
            </Box>
          </VStack>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Interviews;
