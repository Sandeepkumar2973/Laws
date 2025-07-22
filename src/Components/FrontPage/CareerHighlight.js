// CareerHighlight.js
import React from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaBriefcase, FaFileAlt, FaGraduationCap } from "react-icons/fa";

const CareerHighlight = () => {
  return (
    <Box bg="white" py={10} textAlign="center">
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="center"
        align="center"
        bg="#f0f8ff"
        borderRadius="lg"
        px={6}
        py={8}
        gap={{ base: 6, md: 20 }}
        maxW="6xl"
        mx="auto"
      >
        <Flex align="center" gap={2}>
          <Icon as={FaBriefcase} color="goldenrod" boxSize={6} />
          <Text fontSize="lg" fontWeight="bold">
            Jobs in 1000+
          </Text>
          <Text color="gray.600">Top Law Firms</Text>
        </Flex>

        <Flex align="center" gap={2}>
          <Icon as={FaFileAlt} color="goldenrod" boxSize={6} />
          <Text fontSize="lg" fontWeight="bold">
            100+
          </Text>
          <Text color="gray.600">Legal Drafts</Text>
        </Flex>

        <Flex align="center" gap={2}>
          <Icon as={FaGraduationCap} color="goldenrod" boxSize={6} />
          <Text fontSize="lg" fontWeight="bold">
            100+
          </Text>
          <Text color="gray.600">Mock Exam For Preparation</Text>
        </Flex>
      </Flex>

      <Button
        mt={6}
        colorScheme="red"
        bg="red"
        color="white"
        px={10}
        py={6}
        fontWeight="bold"
        fontSize="lg"
        _hover={{ bg: "darkred" }}
        boxShadow="md"
      >
        CAREER WITH US :
      </Button>
    </Box>
  );
};

export default CareerHighlight;
