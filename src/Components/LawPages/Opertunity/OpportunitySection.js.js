// src/components/OpportunitySection.jsx

import React from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaWhatsapp,
  FaLinkedin,
  FaCalendarAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
const opportunities = [
  {
    id: 1,
    title:
      "POSITION of YOUNG PROFESSIONALS (GIS/ LEGAL/ ENERGY CROPS) IN MIN...",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Ministry_of_Rural_Development.svg/1200px-Ministry_of_Rural_Development.svg.png",
    date: "27-Jul-25",
  },
  {
    id: 2,
    title:
      "ALG India Law Offices: August Internship, Paid, New Delhi, Apply ...",
    image: "https://via.placeholder.com/400x200?text=Opportunity+Image",
    date: "28-Feb-25",
  },
  {
    id: 3,
    title:
      "Paid Internship opportunity at Dubey Law Associate [STIPEND RS.70...",
    image: "https://via.placeholder.com/400x200?text=Opportunity+Image",
    date: "27-Feb-25",
  },
  {
    id: 1,
    title:
      "POSITION of YOUNG PROFESSIONALS (GIS/ LEGAL/ ENERGY CROPS) IN MIN...",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Ministry_of_Rural_Development.svg/1200px-Ministry_of_Rural_Development.svg.png",
    date: "27-Jul-25",
  },
  {
    id: 2,
    title:
      "ALG India Law Offices: August Internship, Paid, New Delhi, Apply ...",
    image: "https://via.placeholder.com/400x200?text=Opportunity+Image",
    date: "28-Feb-25",
  },
  {
    id: 3,
    title:
      "Paid Internship opportunity at Dubey Law Associate [STIPEND RS.70...",
    image: "https://via.placeholder.com/400x200?text=Opportunity+Image",
    date: "27-Feb-25",
  },
];

const OpportunitySection = () => {
  return (
    <>
      <Header />
      <Box
        bgGradient="linear(to-r, gray.50, gray.100)"
        py={{ base: 12, md: 20 }}
        textAlign="center"
      >
        <Heading as="h1" size="2xl" mb={2}>
          Opportunities
        </Heading>
        <Text fontSize="2xl" color="orange.600" fontWeight="bold">
          Explore Various Opportunities
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
            <BreadcrumbLink to="#">Opportunities</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Container maxW="7xl" py={10}>
        <Flex justify="space-between" align="center" mb={8}>
          <Heading as="h2" size="xl" color="goldenrod">
            Opportunity
          </Heading>
          <Link color="goldenrod" fontWeight="bold">
            View All
          </Link>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {opportunities.map((opportunity) => (
            <Box
              key={opportunity.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="sm"
            >
              <Image
                src={opportunity.image}
                alt={opportunity.title}
                w="100%"
                h="200px"
                objectFit="cover"
              />

              <Box p={5}>
                <Text fontWeight="bold" noOfLines={2} mb={3}>
                  {opportunity.title}
                </Text>

                <Flex align="center" mb={2} color="goldenrod">
                  <FaCalendarAlt />
                  <Text ml={2} m={2}>
                    {opportunity.date}
                  </Text>
                </Flex>

                <Flex gap={2} mb={4} align="center" justify="center">
                  <Text fontWeight="bold" m={2} color="gray.600" gap={2} p={1}>
                    Share on:
                  </Text>
                  <IconButton
                    color="facebook.500"
                    icon={<FaFacebook />}
                    aria-label="Facebook"
                  />
                  <IconButton
                    color="twitter.500"
                    icon={<FaXTwitter />}
                    aria-label="X"
                  />
                  <IconButton
                    color="whatsapp.500"
                    icon={<FaWhatsapp />}
                    aria-label="WhatsApp"
                  />
                  <IconButton
                    color="linkedin.500"
                    icon={<FaLinkedin />}
                    aria-label="LinkedIn"
                  />
                </Flex>

                <Button
                  w="100%"
                  colorScheme="yellow"
                  bg="goldenrod"
                  color="white"
                >
                  Register Now
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
      <Footer />
    </>
  );
};

export default OpportunitySection;
