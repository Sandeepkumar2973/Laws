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

import inforforjudge from "../../Assets/mootcourt/inforforjudge.pdf";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";

const InformationOfJudges = () => {
  return (
    <>
      {/* <Header /> */}

      <Container
        // bgGradient="linear(to-r, teal.100, blue.50)"
        maxW="100%"
        // py={4}
        // px={2}
        m={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box
          w={{ base: "100%", md: "80%", lg: "100%" }}
          h={{ base: "80vh", md: "90vh", lg: "700px" }}
          // my={4}
          boxShadow="md"
          borderRadius="md"
          overflow="hidden"
          bg="white"
        >
          <object
            data={inforforjudge}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p style={{ padding: "1rem", textAlign: "center" }}>
              PDF could not be displayed. You can{" "}
              <Link href={inforforjudge} isExternal color="blue.500">
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

export default InformationOfJudges;
