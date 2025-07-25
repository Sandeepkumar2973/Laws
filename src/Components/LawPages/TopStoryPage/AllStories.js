

import { Box, Image, Text, SimpleGrid, Container } from "@chakra-ui/react";

const stories = [
  {
    id: 1,
    title: "Supreme Court Issues Notice to Madhya Pradesh Govt",
    author: "Garima Rajput",
    date: "28-Jun-25",
    description: "Supreme Court seeks explanation from the Madhya Pradesh government for not implementing the promised...",
    image: "/images/blog1.jpg",
  },
  {
    id: 2,
    title: "Chief Justice Sanjiv Gavai Initiates Judicial Reforms",
    author: "Garima Rajput",
    date: "27-Jun-25",
    description: "Chief Justice Sanjiv Gavai has launched a series of reforms aimed at increasing transparency and...",
    image: "/images/blog2.jpg",
  },
  {
    id: 1,
    title: "Supreme Court Issues Notice to Madhya Pradesh Govt",
    author: "Garima Rajput",
    date: "28-Jun-25",
    description: "Supreme Court seeks explanation from the Madhya Pradesh government for not implementing the promised...",
    image: "/images/blog1.jpg",
  },
  {
    id: 2,
    title: "Chief Justice Sanjiv Gavai Initiates Judicial Reforms",
    author: "Garima Rajput",
    date: "27-Jun-25",
    description: "Chief Justice Sanjiv Gavai has launched a series of reforms aimed at increasing transparency and...",
    image: "/images/blog2.jpg",
  },
  {
    id: 1,
    title: "Supreme Court Issues Notice to Madhya Pradesh Govt",
    author: "Garima Rajput",
    date: "28-Jun-25",
    description: "Supreme Court seeks explanation from the Madhya Pradesh government for not implementing the promised...",
    image: "/images/blog1.jpg",
  },
  {
    id: 2,
    title: "Chief Justice Sanjiv Gavai Initiates Judicial Reforms",
    author: "Garima Rajput",
    date: "27-Jun-25",
    description: "Chief Justice Sanjiv Gavai has launched a series of reforms aimed at increasing transparency and...",
    image: "/images/blog2.jpg",
  },
  {
    id: 1,
    title: "Supreme Court Issues Notice to Madhya Pradesh Govt",
    author: "Garima Rajput",
    date: "28-Jun-25",
    description: "Supreme Court seeks explanation from the Madhya Pradesh government for not implementing the promised...",
    image: "/images/blog1.jpg",
  },
  {
    id: 2,
    title: "Chief Justice Sanjiv Gavai Initiates Judicial Reforms",
    author: "Garima Rajput",
    date: "27-Jun-25",
    description: "Chief Justice Sanjiv Gavai has launched a series of reforms aimed at increasing transparency and...",
    image: "/images/blog2.jpg",
  },
  // Add more...
];

export default function AllStories() {
  return (
    <Container maxW="7xl" py={8}>
      <SimpleGrid columns={[1, 2, 3]} spacing={8}>
        {stories.map((story) => (
          <Box
            key={story.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            transition="all 0.3s"
            _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
            as="a"
            href={`/blogs/${story.id}`}
            p={4}
          >
            <Image src={story.image} alt={story.title} w="100%" h="200px" objectFit="cover" />

            <Box p={4} px={6} margin={2}> 
              <Text align={"left"} fontSize="xl" fontWeight="bold" mb={2} noOfLines={2}>
                {story.title}
              </Text>

              <Text align={"left"} fontSize="sm" color="gray.500" mb={2}>
                {story.author} • {story.date}
              </Text>

              <Text align={"left"} fontSize="md" color="gray.700" noOfLines={3}>
                {story.description}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
