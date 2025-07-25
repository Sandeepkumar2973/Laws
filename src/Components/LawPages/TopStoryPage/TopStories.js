import React from "react";
import Header from "./../../Navbar/Header";
import Footer from "./../../Navbar/Footer";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import AllStories from "./AllStories";
export const TopStories = () => {
  return (
    <>
      <Header />
      <Box
        bgGradient="linear(to-r, gray.50, gray.100)"
        py={{ base: 12, md: 20 }}
        textAlign="center"
      >
        <Heading as="h1" size="2xl" mb={2}>
         Top Stories
        </Heading>
        <Text fontSize="2xl" color="orange.600" fontWeight="bold">
          Top Stories Content Goes Here
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
            <BreadcrumbLink to="#">stories</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <AllStories />
      <Footer />
    </>
  );
};
