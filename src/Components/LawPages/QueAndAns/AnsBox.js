import { useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

export default function AnswerBox({ answers }) {
  const limit = 150;

  //   console.log(answers, "jdjdj");
  // Ensure answers is always an array
  const safeAnswers = Array.isArray(answers)
    ? answers
    : typeof answers === "string"
    ? [{ text: answers }]
    : [];

  // State array for expanded answers
  const [expanded, setExpanded] = useState(
    Array(safeAnswers.length).fill(false)
  );

  const toggleExpand = (index) => {
    setExpanded((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };
  //   console.log(safeAnswers, "safeAnswers");
  return (
    <VStack align="stretch" spacing={3}>
      {safeAnswers.length > 0 ? (
        safeAnswers.map((ans, index) => {
          const answerText = ans?.text || "";
          const displayText = expanded[index]
            ? answerText
            : answerText.slice(0, limit) +
              (answerText.length > limit ? "..." : "");

          return (
            <Box
              key={index}
              borderLeft="2px solid #762d00"
              borderWidth="3px"
              borderRadius="md"
              pl={4}
              bg="gray.50"
              whiteSpace="pre-line"
              textAlign="justify"
              margin="2px"
            >
              {displayText || "No answer"}
              {answerText.length > limit && (
                <Text
                  as="span"
                  color="blue.500"
                  cursor="pointer"
                  fontWeight="bold"
                  ml={2}
                  onClick={() => toggleExpand(index)}
                >
                  {expanded[index] ? "Read Less..." : "Read More..."}
                </Text>
              )}
            </Box>
          );
        })
      ) : (
        <Text color="gray.500">No answers yet</Text>
      )}
    </VStack>
  );
}
