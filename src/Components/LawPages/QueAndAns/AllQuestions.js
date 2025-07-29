import React from "react";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";
import {
  Box,
  Container,
  Heading,
  Input,
  Button,
  VStack,
  Text,
  Divider,
} from "@chakra-ui/react";

const questions = [
  {
    id: 1,
    question:
      "In light of increasing custodial deaths, should India enact a standalone law against torture as recommended by the Law Commission?",
    postedBy: "Aanchal Jha",
    answer: `
Yes. India urgently needs a standalone anti-torture law to fulfill its constitutional obligations, comply with international treaties, and address the alarming rate of custodial violence that persists despite judicial guidelines.

Law Commission of India (273rd Report, 2017)
Recommendation: Enact a new law – Prevention of Torture Bill, 2017.
The proposed law:
- Clearly defines torture.
- Makes state officials criminally liable.
- Provides compensation to victims.
- Enables India to ratify the UNCAT.

"The absence of legislation is the chief reason India has not ratified UNCAT. This impacts India's international image and credibility in human rights diplomacy." – Law Commission

Why Existing Laws Are Insufficient
- Generic IPC provisions: Do not reflect the systemic nature of custodial violence.
- No deterrent mechanism: Low conviction rates; fear of reprisal silences victims.
- Complicity and cover-up: Police often shield each other; magisterial inquiries are delayed or biased.
- No victim-centric compensation system: Currently at the discretion of courts or NHRC.
    `,
  },
  {
    id: 1,
    question:
      "In light of increasing custodial deaths, should India enact a standalone law against torture as recommended by the Law Commission?",
    postedBy: "Aanchal Jha",
    answer: `
Yes. India urgently needs a standalone anti-torture law to fulfill its constitutional obligations, comply with international treaties, and address the alarming rate of custodial violence that persists despite judicial guidelines.

Law Commission of India (273rd Report, 2017)
Recommendation: Enact a new law – Prevention of Torture Bill, 2017.
The proposed law:
- Clearly defines torture.
- Makes state officials criminally liable.
- Provides compensation to victims.
- Enables India to ratify the UNCAT.

"The absence of legislation is the chief reason India has not ratified UNCAT. This impacts India's international image and credibility in human rights diplomacy." – Law Commission

Why Existing Laws Are Insufficient
- Generic IPC provisions: Do not reflect the systemic nature of custodial violence.
- No deterrent mechanism: Low conviction rates; fear of reprisal silences victims.
- Complicity and cover-up: Police often shield each other; magisterial inquiries are delayed or biased.
- No victim-centric compensation system: Currently at the discretion of courts or NHRC.
    `,
  },
];
export const QAndA = () => {
  return (
    <>
      <Header />
      <Box
        bgGradient="linear(to-r, gray.50, gray.100)"
        py={{ base: 12, md: 20 }}
        textAlign="center"
      >
        <Heading as="h1" size="2xl" mb={2}>
          Questions and Answers
        </Heading>
        <Text fontSize="2xl" color="orange.600" fontWeight="bold">
           Ready for Your Exams
        </Text>

       
      </Box>
      <Container maxW="4xl" py={10}>
        <Heading size="lg" mb={4}>
          All Questions
        </Heading>

        <Box mb={6} display="flex">
          <Input placeholder="Search questions..." mr={2} />
          <Button bg="goldenrod" color="white">
            Search
          </Button>
        </Box>

        <VStack align="stretch" spacing={6} alignItems="stretch">
          {questions.map((q) => (
            <Box
              key={q.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              bg="white"
              boxShadow="sm"
              _hover={{ boxShadow: "md" }}
              borderLeft="4px solid goldenrod"
            >
              <Text fontWeight="bold" mb={2} align={"left"} color="#762d00">
                {q.question}
              </Text>
              <Text fontSize="sm" color="gray.600" mb={2} align={"left"}>
                Posted by {q.postedBy}
              </Text>
              <Heading
                as="h4"
                size="sm"
                mb={2}
                color="goldenrod"
                align={"left"}
              >
                Answers
              </Heading>
              <Box
                borderLeft="2px solid #762d00"
                borderWidth="3px"
                borderRadius="md"
                pl={4}
                bg="gray.50"
                whiteSpace="pre-line"
                align={"left"}
                fontFamily={"Apple-system, BlinkMacSystemFont,  Roboto, Arial, 'Noto Sans', sans-serif"}
              >
                {q.answer}
              </Box>
              <Divider my={2} />
              <Text fontSize="sm" color="gray.500">
                Please login to submit an answer.
              </Text>
            </Box>
          ))}
        </VStack>
      </Container>
      <Footer />
    </>
  );
};
