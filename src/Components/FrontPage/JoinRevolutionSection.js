// JoinRevolutionSection.js
import React from "react";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import StudentCard from "./StudentCard";

const JoinRevolutionSection = () => {
  const students = [
    {
      name: "Suryansh Dixit",
      university: "Ganeshi Lal Aggarwal University",
      description:
        "Suryansh Dixit is a dedicated law student at Ganeshi Lal Aggarwal University, Mathura. Where he laid a solid foundation for his legal career...",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      name: "Madhav Goswami",
      university: "GLA University",
      description:
        "Meet Madhav Goswami – a trailblazer in the legal arena, renowned for his numerous accolades and triumphs in moot court competitions...",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      name: "Mehul Bhatnagar",
      university: "Delhi University",
      description:
        "Dive deep into the world of Model United Nations with Mehul Bhatnagar, a distinguished debater and veteran of nearly 40 MUNs...",
      imageUrl: "https://via.placeholder.com/100",
    },
  ];

  return (
    <Box bg="#f0f8ff" py={12} px={6}>
      <Heading as="h2" size="xl" mb={8} color="goldenrod">
        Join the revolution
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mt={2}>
        {students.map((student, index) => (
          <StudentCard key={index} {...student} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default JoinRevolutionSection;
