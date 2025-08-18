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
    title:
      "Supreme Court Issues Notice to Madhya Pradesh Government Over Delay in 27% OBC R...",
    description:
      "Supreme Court seeks explanation from the Madhya Pradesh government for not implementing the promised...",
    img: "https://newsarenaindia.com/_next/image?url=https%3A%2F%2Fimages.newsarenaindia.com%2F%2Fsc-of-indiajpg_1750933306166.jpg&w=828&q=75",
  },
  {
    title: "JAL Promoters File SLP Over Noida Land Cancellatio...",
    description: "",
    img: "https://lawvs.com/media/admin/news/1751040203_9971aebbfbb87636cb8c.jpeg",
  },
  {
    title: "India Blocks UN Investigator in Air India Crash Pr...",
    description: "",
    img: "https://cdn.bdnews24.com/bdnews24/media/english/imgAll/2025June/air-india-crash-270625-01-1750997857.jpg",
  },
  {
    title: "Supreme Court Issues 2025 Guidelines on Retention ...",
    description: "",
    img: "https://newsarenaindia.com/_next/image?url=https%3A%2F%2Fimages.newsarenaindia.com%2F%2Fsc-of-indiajpg_1750933306166.jpg&w=828&q=75",
  },
  {
    title: "Telangana High Court: Only Courts Can Grant ‘Khu...",
    description: "",
    img: "https://media.newindianexpress.com/TNIE%2Fimport%2F2023%2F10%2F11%2Foriginal%2FTelanganaHighCourt.jpg?w=1024&auto=format%2Ccompress&fit=max",
  },
  {
    title: "Chief Justice Sanjiv Gavai Initiates Judicial Refo...",
    description: "",
    img: "https://media.assettype.com/sentinelassam-english%2F2025-04-17%2Fm4vcqnkw%2FJustice-B.R.-Gavai?rect=0%2C0%2C1200%2C675&w=1024&auto=format%2Ccompress&fit=max",
  },
  {
    title: "Supreme Court: Mere Recovery of Weapon with Victim...",
    description: "",
    img: "https://lawtrend.in/wp-content/uploads/2024/07/Supreme-Court-birds-cloud-sky-1068x601.jpg",
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
          <Flex
            key={index}
            align="flex-start"
            gap={4}
            borderBottom="1px solid #ddd"
            pb={4}
          >
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
