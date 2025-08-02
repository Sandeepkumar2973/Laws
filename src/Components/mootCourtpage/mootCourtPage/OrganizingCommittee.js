import React from "react";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";
import { Box, Container, Image } from "@chakra-ui/react";
import orgcommittee from "../../Assets/mootcourt/orgcommittee.jpg";
export const OrganizingCommittee = () => {
  return (
    <>
      {/* <Header /> */}
      <Box
        w="100%" // Full width
        minH={{ base: "auto", md: "70vh" }} // Auto height on mobile, 70vh on desktop
        bg="gray.100"
        display="flex"
        justifyContent="center"
        alignItems="center"
        // p={4}
      >
        <Image
          src={orgcommittee}
          alt="Organizing Committee"
          objectFit="contain"
          w={{ base: "100%", md: "100%" }} // Full width on mobile, 80% on desktop
          maxH="100%"
        />
      </Box>

      {/* <Footer /> */}
    </>
  );
};
