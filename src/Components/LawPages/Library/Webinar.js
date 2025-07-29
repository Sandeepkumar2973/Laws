// src/components/Webinar.jsx

import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

const webinars = [
  {
    id: 1,
    title: "Explore the transform",
    subtitle: "Explore the transform",
    image: "https://via.placeholder.com/600x400?text=Webinar+1",
  },
  {
    id: 2,
    title: "Legal Career Hub",
    subtitle: "LAWVS India's first",
    image: "https://via.placeholder.com/600x400?text=Webinar+2",
  },
  {
    id: 3,
    title: "Legal Job Prospects",
    subtitle: "Discover the Perfect",
    image: "https://via.placeholder.com/600x400?text=Webinar+3",
  },
];

const Webinar = () => {
  return (
    <Container maxW="7xl" py={10}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h2" size="xl" color="goldenrod">
          Webinar
        </Heading>
        <Link color="goldenrod" fontWeight="bold">
          View All
        </Link>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {webinars.map((webinar) => (
          <VStack
            key={webinar.id}
            spacing={4}
            borderRadius="md"
            overflow="hidden"
            textAlign="center"
          >
            <Box>
              <Image src={webinar.image} alt={webinar.title} w="100%" />
            </Box>
            <Box>
              <Heading as="h3" size="md" color="goldenrod">
                {webinar.title}
              </Heading>
              <Text color="gray.600">{webinar.subtitle}</Text>
            </Box>
          </VStack>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Webinar;
