import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Icon,
  VStack,
  Container,
} from "@chakra-ui/react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Suryansh Dixit",
    university: "Ganesh Lal Aggarwal University",
    image: "/images/suryansh.png",
    description:
      "Suryansh Dixit is a dedicated law student at Ganesh Lal Aggarwal University, Mathura. Where he laid a solid foundation for his legal career. Suryansh's commitment to legal education is evident through his roles as President of the MUN Club and JURIS.",
  },
 
];

function TestimonialCard({ testimonial }) {
  return (
    <Flex
      bg="white"
      p={{ base: 6, md: 8 }}
      borderRadius="lg"
      boxShadow="md"
      direction={{ base: "column", md: "row" }}
      align="center"
      gap={8}
      mb={8}
    >
      <Box flexShrink={0} w={{ base: "100%", md: "40%" }}>
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          borderRadius="md"
          w="100%"
          h="100%"
          objectFit="cover"
        />
      </Box>

      <Box w={{ base: "100%", md: "60%" }}>
        <Icon as={FaQuoteLeft} color="goldenrod" boxSize={8} mb={4} />
        <Heading size="md" mb={2}>
          {testimonial.name}
        </Heading>
        <Text fontWeight="semibold" mb={2} color="gray.600">
          {testimonial.university}
        </Text>
        <Text color="gray.700">{testimonial.description}</Text>
      </Box>
    </Flex>
  );
}

export default function TestimonialPage() {
  return (
    <Container maxW="5xl" py={12}>
      <Heading mb={12} textAlign="center" color="goldenrod">
        Join the Revolution
      </Heading>

      <VStack spacing={8} align="stretch">
        {testimonials.map((t, idx) => (
          <TestimonialCard key={idx} testimonial={t} />
        ))}
      </VStack>
    </Container>
  );
}
