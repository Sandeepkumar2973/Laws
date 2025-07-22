import React from "react";
import {
  Box,
  Avatar,
  Heading,
  Text,
  Flex,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { FaGraduationCap } from "react-icons/fa";

const StudentCard = ({ name, university, description, imageUrl }) => {
  return (
    <Box
      bg="white"
      borderRadius="lg"
      border="1px solid #ddd"
      maxW="sm"
      w="100%"
      textAlign="left"
      overflow="visible"  // ✅ CARD overflow hidden mat rakho
      pos="relative"
      pt={16}             // ✅ Top padding thoda zyada takki content niche ho
      px={6}
      pb={6}
    >
      {/* Avatar */}
      <Flex
        pos="absolute"
        top={-12}           // ✅ Isko adjust karo — yeh negative hai toh bahar niklega
        left="50%"
        transform="translateX(-50%)"
      >
        <Avatar
          size="xl"
          src={imageUrl}
          border="4px solid white" // ✅ Border white takki card ke border se alag lage
        />
      </Flex>

      {/* Content */}
      <VStack align="flex-start" spacing={2}>
        <Heading as="h3" size="md">
          {name}
        </Heading>

        <Flex align="center" gap={2}>
          <Icon as={FaGraduationCap} color="goldenrod" />
          <Text color="gray.600">{university}</Text>
        </Flex>

        <Text color="gray.700" fontSize="sm" pt={2}>
          {description}
        </Text>
      </VStack>
    </Box>
  );
};

export default StudentCard;
