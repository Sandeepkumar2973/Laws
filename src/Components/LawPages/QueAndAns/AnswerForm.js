import { useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

export default function AnswerBox({ answers = [] }) {
  const limit = 150;
  const [expanded, setExpanded] = useState(Array(answers.length).fill(false));

  const toggleExpand = (index) => {
    setExpanded((prev) => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  if (answers.length === 0) {
    return <Text color="gray.500">No answers yet</Text>;
  }

  return (
    <VStack align="stretch" spacing={3}>
      {answers.map((ans, idx) => {
        const text = ans.text || "";
        const isExpanded = expanded[idx];
        const displayText =
          isExpanded || text.length <= limit
            ? text
            : text.slice(0, limit) + "...";

        return (
          <Box
            key={ans._id || idx}
            borderLeft="2px solid #762d00"
            borderWidth="3px"
            borderRadius="md"
            pl={4}
            bg="gray.50"
            whiteSpace="pre-line"
            textAlign="justify"
            margin="2px"
          >
            {displayText}
            {text.length > limit && (
              <Text
                as="span"
                color="blue.500"
                cursor="pointer"
                fontWeight="bold"
                ml={2}
                onClick={() => toggleExpand(idx)}
              >
                {isExpanded ? "Read Less" : "Read More"}
              </Text>
            )}
            <Text fontSize="xs" color="gray.600" mt={1}>
              — {ans.postedBy?.role || "user"}
            </Text>
          </Box>
        );
      })}
    </VStack>
  );
}
