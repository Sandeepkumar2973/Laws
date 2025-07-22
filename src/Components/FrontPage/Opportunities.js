// Opportunities.js
import React from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Link,
  Image,
  Button,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";

const opportunities = [
  {
    title: "Job Posting: Law Researcher at Delhi Judicial Academy",
    date: "27-Feb-25",
    img: "https://via.placeholder.com/400x200?text=Opportunity+1",
  },
  {
    title:
      "Job Opportunity for the position of Chief General Manager (Legal)...",
    date: "27-Jan-25",
    img: "https://via.placeholder.com/400x200?text=Opportunity+2",
  },
  {
    title:
      "Legal Research Job Opportunity at Team LeaseRegTech Pvt.Ltd",
    date: "27-Feb-25",
    img: "https://via.placeholder.com/400x200?text=Opportunity+3",
  },
];

const Opportunities = () => {
  return (
    <Box maxW="1200px" mx="auto" px={5} py={10}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" color="goldenrod" textTransform="capitalize">
          Opportunity
        </Heading>
        <Link href="#" color="goldenrod" fontWeight="bold">
          View All
        </Link>
      </Flex>

      {/* Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {opportunities.map((opp, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            <Image src={opp.img} alt={opp.title} w="100%" h="200px" objectFit="cover" />

            <Box p={4} flex="1">
              <Text fontWeight="bold" mb={2}>
                {opp.title}
              </Text>

              <Flex align="center" mb={2} color="gray.600">
                <Icon as={FaCalendarAlt} mr={2} />
                <Text>{opp.date}</Text>
              </Flex>

              <Text mb={4} fontWeight="medium">
                Share on:
              </Text>
            </Box>

            <Button
              bg="goldenrod"
              color="white"
              rounded="none"
              w="100%"
              py={6}
              _hover={{ bg: "gold" }}
            >
              Register Now
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Opportunities;
