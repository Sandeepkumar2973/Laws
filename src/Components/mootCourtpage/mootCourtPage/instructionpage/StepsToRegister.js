// src/pages/StepsToRegister.jsx

import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Stack,
  Highlight,
  Link,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { PhoneIcon, EmailIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import Header from "../../../Navbar/Header";
import Footer from "../../../Navbar/Footer";

const StepsToRegister = () => {
  return (
    <>
      <Header />
      <Box
        bgGradient="linear(to-r, teal.100, blue.50)"
        py={10}
        px={{ base: 4, md: 12 }}
        minH="100vh"
      >
        <VStack spacing={10} maxW="6xl" mx="auto" textAlign="left">
          <Heading
            size="xl"
            bgGradient="linear(to-r, teal.500, blue.500)"
            bgClip="text"
          >
            Registration Procedure – Step-by-Step Guide
          </Heading>

          <Box
            bg={useColorModeValue("white", "gray.800")}
            p={6}
            borderRadius="2xl"
            boxShadow="lg"
            w="100%"
          >
            <Stack spacing={5}>
              <Text fontSize="lg">
                <strong>
                  Q: How do I register in the 1st LAWVS NATIONAL VIRTUAL MOOT
                  COURT COMPETITION, 2025?
                </strong>
              </Text>

              <Text>
                Register your team via our online form:{" "}
                <Link href="https://www.lawvs.com" color="teal.600" isExternal>
                  www.lawvs.com <ExternalLinkIcon mx="2px" />
                </Link>
                <br />
                Registration period: <strong>31 July to 15 August 2025</strong>
              </Text>

              <Text>
                <strong> Required Details:</strong>
                <br />
                Name of University/Institution/College
                <br />
                Name, Email, and Phone number of the Contact Person
                <br /> (Optional) Team Members’ details at this stage
              </Text>

              <Text>
                <strong> Need more time?</strong>
                <br />
                Contact us at:
                <br />
                {/* <PhoneIcon mr={2} /> */}
                <Link href="tel:+918171974067" color="teal.600">
                  8171974067
                </Link>
                <br />
                {/* <EmailIcon mr={2} /> */}
                <Link href="mailto:mootcourt@lawvs.com" color="teal.600">
                  mootcourt@lawvs.com
                </Link>
              </Text>

              <Text>
                The Organizing Committee will send you a confirmation for the
                preliminary round after registration.
              </Text>

              <Text>
                <strong> Deadline:</strong> Submit all team member details by{" "}
                <strong>15th August 2025</strong> via the online form..
              </Text>

              <Text>
                <strong> Required Team Member Details:</strong><br/>
                You will need to submit the following details: Names, emails,
                phone numbers of all team members.
              </Text>

              <Text color="red.600" fontWeight="semibold">
                Note: All teams who register are considered participants and
                must comply with all Rules and Deadlines.
              </Text>

              <Button
                colorScheme="teal"
                size="lg"
                as="a"
                href="https://www.lawvs.com"
                target="_blank"
                mt={4}
                alignSelf={{ base: "center", md: "flex-start" }}
              >
                Register Now
              </Button>

              <Text fontSize="md">
                Have questions about the competition? Check out our{" "}
                <Link
                  href="https://www.lawvs.com/faq"
                  color="blue.500"
                  isExternal
                >
                  FAQ for Teams <ExternalLinkIcon mx="2px" />
                </Link>
              </Text>
            </Stack>
          </Box>
        </VStack>
      </Box>
      <Footer />
    </>
  );
};

export default StepsToRegister;
