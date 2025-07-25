import React from "react";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";
import {
  Box,
  Heading,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Stack,
} from "@chakra-ui/react";
import DraftsGrid from "./DraftsGrid";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
export const LegalDraft = () => {
  return (
    <>
      <Header />
      <Box>
        {/* Top Banner Section */}
        <Box
          bgGradient="linear(to-r, gray.50, gray.100)"
          py={{ base: 12, md: 20 }}
          textAlign="center"
        >
          <Heading as="h1" size="2xl" mb={2}>
            Legal Drafts
          </Heading>
          <Text fontSize="2xl" color="orange.600" fontWeight="bold">
            Read Legal Drafts
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
              <BreadcrumbLink to="#">Drafts</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>

        {/* Content Section */}
        <Container maxW="6xl" py={16}>
          <Stack spacing={6}>
            <Heading as="h2" size="lg">
              What is legal drafting? Why is legal drafting important? How to
              draft legal documents?
            </Heading>
            <Text align="left" fontSize="lg" color="gray.700" lineHeight="tall">
              Legal drafting is the meticulous art of composing legal documents,
              encompassing contracts, agreements, wills, deeds, and pleadings,
              with precision, clarity, and adherence to legal accuracy. It
              involves a deep understanding of relevant laws, regulations, and
              legal principles, coupled with the ability to convey intricate
              legal concepts in straightforward language.
            </Text>
          </Stack>
        </Container>
      </Box>
      <DraftsGrid />
      <Text textAlign="left" fontSize="lg" color="gray.600" mt={8} padding={8}>
        WExecuting a well-crafted legal document demands adherence to
        conventions and guidelines. These include employing precise language,
        avoiding ambiguity, using appropriate legal terminology, and organizing
        the document logically for ease of comprehension. Tailoring language and
        style based on the intended audience—whether legal professionals,
        judges, or laypersons—is crucial. <br /><br /> The primary objective of legal
        drafting is to transparently convey legal rights, obligations, and terms
        to facilitate understanding by both legal experts and individuals
        involved in the matter.<br /><br /> Key considerations in legal drafting encompass
        clarity and precision, consistency in terminology, utilization of plain
        language where possible, understanding the document's purpose,
        familiarity with the relevant legal framework, logical organization,
        proper formatting, specificity, incorporation of boilerplate clauses
        when necessary, customization to specific circumstances, and a thorough
        revision and review process to ensure accuracy and adherence to ethical
        standards.<br /><br /> While legal drafting is typically entrusted to legal
        professionals such as lawyers or paralegals due to its complexity,
        individuals can acquire foundational skills through courses, workshops,
        or consulting legal drafting guides. Mastering legal drafting is a
        dynamic process, emphasizing continuous learning and attention to
        evolving legal principles and standards.
      </Text>
      <Footer />
    </>
  );
};
