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
  Image,
  Container,
} from "@chakra-ui/react";
import { PhoneIcon, EmailIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import Header from "../../../Navbar/Header";
import Footer from "../../../Navbar/Footer";
import FaqTeam from "../../../Assets/mootcourt/FAQs.pdf";
import { FaImage } from "react-icons/fa6";

export const AskQueForTeam = () => {
  return (
    <>
      {/* <Header /> */}
      {/* <Box
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
            Frequently Asked Questions For Teams
          </Heading>

          <Box
            bg={useColorModeValue("white", "gray.800")}
            p={6}
            borderRadius="2xl"
            boxShadow="lg"
            w="100%"
          >
            <Stack spacing={5}>
              <Heading
                bgGradient="linear(to-r, teal.500, blue.500)"
                bgClip="text"
              >
                Table of Contents
              </Heading>
              <Text fontSize="lg">
                <strong>A. INTRODUCTION</strong>
              </Text>

              <Text>
                1. What is the LAWVSMCC?
                <br />
                2. What purpose does this competition serve? <br />
                3. What is the format of the competition? <br />
                4. Where does the competition takes place?
                <br />
                5. Can I participate offline?
                <br />
                6. When does the competition take place?
                <br />
              </Text>
              <Text fontSize={"lg"}>
                {" "}
                <strong>B. PARTICIPATION AND ELIGIBILITY</strong>
              </Text>
              <Text>
                7. Which universities are eligible to take part in the
                competition?
                <br />
                8. My university gave consent to register, but has now decided
                to rescind it. What now?
                <br />
                9. Can I participate as an individual?
                <br />
                10.Can I participate if I have graduated already/will graduate
                by the start of or during the competition?
                <br />
                11.What is considered an “actively enrolled student”?
                <br />
                12.Can I participate if I am a student on academic leave?
                <br />
                13.Can I participate if I am an exchange student?
                <br />
                14.How many people can participate in a team?
                <br />
                15.Can team members come from different universities as long as
                they represent one (1) university?
                <br />
                16.How will I know if my team needs to participate in a
                qualifying round?
                <br />
                17.How many teams will be participating?
                <br />
              </Text>

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
      </Box> */}
      <Container
        // bgGradient="linear(to-r, teal.100, blue.50)"
        minW={"100%"}
        minH={"100%"}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          w={{ base: "100%", md: "80%", lg: "100%" }}
          h={{ base: "80vh", md: "90vh", lg: "700px" }}
        >
          <object
            data={FaqTeam}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              PDF could not be displayed. You can{" "}
              <Link href={FaqTeam} isExternal color="blue.500">
                download the PDF <ExternalLinkIcon mx="2px" />
              </Link>
              .
            </p>
          </object>
        </Box>
      </Container>
      {/* <Footer /> */}
    </>
  );
};
