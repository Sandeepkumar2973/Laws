import React from "react";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";
import { Link as RouterLink } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link as ChakraLink,
  Heading,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
const exams = [
  {
    id: 1,
    title: "Uttarakhand Judicial Services Exam (UKPCS J)",
    image: "https://via.placeholder.com/400x200?text=UKPCS+J",
  },
  {
    id: 2,
    title: "West Bengal Judicial Services Exam (WBPCSJ)",
    image: "https://via.placeholder.com/400x200?text=WBPCSJ",
  },
  {
    id: 3,
    title: "Haryana Civil Services Exam (HCS J)",
    image: "https://via.placeholder.com/400x200?text=HCS+J",
  },
  {
    id: 4,
    title: "Bihar Judicial Services Exam (BJSE)",
    image: "https://via.placeholder.com/400x200?text=BJSE",
  },
  {
    id: 5,
    title: "MP Judicial Service Exam (MPPCS-J)",
    image: "https://via.placeholder.com/400x200?text=MPPCS+J",
  },
  {
    id: 6,
    title: "Punjab Civil Services Exam (Judicial) (PCS-J)",
    image: "https://via.placeholder.com/400x200?text=PCS+J",
  },
];
export const ExamPreparation = () => {
  return (
    <>
      <Header />
      <Box
        bgGradient="linear(to-r, gray.50, gray.100)"
        py={{ base: 12, md: 20 }}
        textAlign="center"
      >
        <Heading as="h1" size="2xl" mb={2}>
          Exam Preparation
        </Heading>
        <Text fontSize="2xl" color="orange.600" fontWeight="bold">
          Get Ready for Your Exams
        </Text>

        <Breadcrumb
          separator="/"
          fontWeight="medium"
          color="gray.600"
          justifyContent="center"
          mt={4}
        >
          <BreadcrumbItem>
            {/* <BreadcrumbLink to="/">Home</BreadcrumbLink> */}
            <ChakraLink as={RouterLink} to="/">
              home
            </ChakraLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink to="#"></BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Box p={6} textAlign="left">
        <Text fontSize="x" color="gray.700" fontFamily={"'Arial', sans-serif"}>
          Embarking on a journey into the field of law demands not just a
          passion for justice but also a meticulous approach to the various law
          entrance exams in India. Aspiring legal professionals navigate through
          a plethora of options, with exams like CLAT, AILET, LSAT India, SLAT,
          and DU LLB Entrance Exam paving the way to esteemed law institutions.
          In this dynamic landscape, effective law exam preparation becomes the
          compass guiding candidates toward success.
        </Text>
      </Box>
      <Container maxW="7xl" py={10}>
        <Heading as="h2" size="xl" color="goldenrod" mb={8}>
          Judicial Services Exams
        </Heading>

        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={8}
        >
          {exams.map((exam) => (
            <Box
              key={exam.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="sm"
              p={4}
            >
              <Image
                src={exam.image}
                alt={exam.title}
                w="100%"
                h="200px"
                objectFit="cover"
              />

              <Text mt={4} fontWeight="bold">
                {exam.title}
              </Text>

              <Flex mt={4} justifyContent="space-between">
                <Button colorScheme="yellow" bg="goldenrod" color="white">
                  Read More
                </Button>
                <Button colorScheme="yellow" bg="goldenrod" color="white">
                  Mock Test
                </Button>
              </Flex>
            </Box>
          ))}
        </Grid>
        <Box mt={10} textAlign="left">
          <Text
            fontSize="l"
            color="gray.600"
            fontFamily={"'Arial', sans-serif"}
          >
            Let's delve into the key features, courses offered, and exam
            patterns of these top law entrance exams, unravelling the essential
            elements that shape the future of legal enthusiasts.
          </Text>
        </Box>
        <Box mt={10} textAlign="left">
          <Heading
            fontSize="xl"
            color="gray.600"
            fontFamily={"'Arial', sans-serif"}
          >
            Top Law Entrance Exams in India 2024
          </Heading>
          <Text
            fontSize="l"
            color="gray.600"
            fontFamily={"'Arial', sans-serif"}
            textAlign="left"
          >
            Several prominent law entrance exams in India pave the way for
            aspirants to pursue a legal education. Among these, the Common Law
            Admission Test (CLAT), All India Law Entrance Test (AILET), Law
            School Admission Test India (LSAT India), Symbiosis Law Admission
            Test (SLAT), and the Delhi University LLB Entrance Exam stand out.
            These exams offer entry to various undergraduate and postgraduate
            law courses, each having distinct features and exam patterns.
          </Text>
        </Box>
        <Heading
          fontSize="xl"
          color="gray.600"
          fontFamily={"'Arial', sans-serif"}
          textAlign="left"
        >
          CLAT Exam
        </Heading>
        <Text
          fontSize="l"
          color="gray.600"
          fontFamily={"'Arial', sans-serif"}
          textAlign="left"
        >
          Conducted by the consortium of National Law Universities (NLUs), CLAT
          is a national-level exam for admission to 5-year integrated LLB and
          one-year LLM courses across 24 participating NLUs. Additionally,
          private law schools also accept CLAT scores for their programs. The
          exam, with a duration of two hours, covers subjects like English,
          Current Affairs, Quantitative Techniques, Legal Reasoning, and Logical
          Reasoning.
        </Text>
        <Heading
          fontSize="xl"
          color="gray.600"
          fontFamily={"'Arial', sans-serif"}
          textAlign="left"
          mt={6}
        >
          AILET Exam
        </Heading>
        <Text
          fontSize="l"
          color="gray.600"
          fontFamily={"'Arial', sans-serif"}
          textAlign="left"
        >
          The All India Law Entrance Test (AILET) is conducted by the National
          Law University (NLU) Delhi for admission to its undergraduate and
          postgraduate law programs. AILET is known for its unique exam pattern,
          which includes sections on English, General Knowledge, Legal Aptitude,
          Reasoning, and Mathematics. The exam is highly competitive, and
          candidates must stay updated on current legal developments and general
          awareness.
        </Text>
        <Heading
          fontSize="xl"
          color="gray.600"
          fontFamily={"'Arial', sans-serif"}
          textAlign="left"
          mt={6}
        >
          LSAT India Exam
        </Heading>
        <Text
          fontSize="l"
          color="gray.600"
          fontFamily={"'Arial', sans-serif"}
          textAlign="left"
        >
          The Law School Admission Test (LSAT) India is a standardized test for
          admission to various law schools in India. It evaluates candidates on
          their reading comprehension, logical reasoning, and critical thinking
          skills. LSAT India is conducted by the Law School Admission Council
          (LSAC) and is accepted by several prominent law colleges across the
          country.
        </Text>
        <Heading
          fontSize="xl"
          color="gray.600"
          fontFamily={"'Arial', sans-serif"}
          textAlign="left"
          mt={6}
        >
          LSAT India Exam
        </Heading>
        <Text
          fontSize="l"
          color="gray.600"
          fontFamily={"'Arial', sans-serif"}
          textAlign="left"
        >
          The Law School Admission Test (LSAT) India is a standardized test for
          admission to various law schools in India. It evaluates candidates on
          their reading comprehension, logical reasoning, and critical thinking
          skills. LSAT India is conducted by the Law School Admission Council
          (LSAC) and is accepted by several prominent law colleges across the
          country.
        </Text>
        <Heading
          fontSize="xl"
          color="gray.600"
          fontFamily={"'Arial', sans-serif"}
          textAlign="left"
          mt={6}
        >
          MH CET Law Exam
        </Heading>
        <Text
          fontSize="l"
          color="gray.600"
          fontFamily={"'Arial', sans-serif"}
          textAlign="left"
        >
          Conducted at the state level by CET Cell Maharashtra, MH CET Law is
          for admission to five-year integrated LLB and three-year LLB courses.
          The computer-based test assesses candidates in English, Logical
          Reasoning, General Knowledge, Mathematical Aptitude, and Legal
          Aptitude.
          <br />
          In the realm of legal education, the journey begins with meticulous
          law exam preparation, a crucial phase that sets the tone for a
          promising career in law. As we navigate through the details of CLAT,
          AILET, LSAT India, SLAT, and DU LLB Entrance Exam, it becomes evident
          that each exam is a gateway to diverse opportunities in the legal
          domain.
          <br />
          From the analytical challenges of LSAT India to the comprehensive
          testing of legal reasoning in CLAT, these exams demand a strategic and
          dedicated approach. Embracing effective law exam preparation not only
          opens doors to prestigious institutions but also equips candidates
          with the skills needed to thrive in the dynamic world of law. As you
          embark on this journey, remember that the foundation of a successful
          legal career lies in the careful and thorough preparation for the
          entrance exams that pave the way to a fulfilling future in law.
        </Text>
      </Container>
      <Footer />
    </>
  );
};
