import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Text, VStack, Spinner } from "@chakra-ui/react";

export default function QnAPage() {
  const [mainQuestion, setMainQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Example API — replace with your backend endpoint
        const res = await fetch("/api/qna");
        const data = await res.json();

        setMainQuestion(data.mainQuestion);
        setAnswers(data.answers);
        setRelatedQuestions(data.relatedQuestions);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching QnA data:", err);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex p={6} gap={6} align="start">
      {/* Left Column - Main Q&A */}
      <Box flex="3">
        <Heading mb={4}>{mainQuestion?.title}</Heading>
        <Text fontSize="sm" color="gray.500" mb={4}>
          {mainQuestion?.tags?.join(" • ")}
        </Text>

        <VStack align="stretch" spacing={6}>
          {answers.map((ans, i) => (
            <Box key={i} p={4} borderWidth="1px" rounded="lg">
              <Text fontWeight="bold" mb={2}>
                {ans.author}
              </Text>
              <Text>{ans.text}</Text>
            </Box>
          ))}
        </VStack>
      </Box>

      {/* Right Column - Related Questions */}
      <Box flex="1" borderLeft="1px solid #ddd" pl={4}>
        <Heading size="md" mb={3}>
          Related questions
        </Heading>
        <VStack align="start" spacing={3}>
          {relatedQuestions.map((q, i) => (
            <Text
              key={i}
              color="blue.500"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
            >
              {q}
            </Text>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
}
