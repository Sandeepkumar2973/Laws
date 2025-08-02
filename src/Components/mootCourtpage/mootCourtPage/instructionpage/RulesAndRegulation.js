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
import RulesAndRegulationImage from "../../../Assets/mootcourt/rulesAndRegulation.pdf";

const RulesAndRegulation = () => {
  return (
    <>
      {/* <Header /> */}
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
            data={RulesAndRegulationImage}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              PDF could not be displayed. You can{" "}
              <Link href={RulesAndRegulationImage} isExternal color="blue.500">
                download the PDF <ExternalLinkIcon mx="2px" />
              </Link>
              .
            </p>
          </object>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default RulesAndRegulation;
