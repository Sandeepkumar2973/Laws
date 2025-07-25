// Footer.js
import React from "react";
import {
  Box,
  Flex,
  Text,
  Link,
  VStack,
  HStack,
  IconButton,
  Image,
  Circle,
  Icon,
} from "@chakra-ui/react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import logo from "./../Assets/logo/logo.png"; // Adjust the path as necessary
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebookF, url: "https://www.facebook.com/lawvslegalservices" },
    { icon: FaLinkedinIn, url: "https://www.linkedin.com/company/lawvs.com/" },
    { icon: FaInstagram, url: "https://www.instagram.com/law_vs/" },
    {
      icon: FaYoutube,
      url: "https://www.youtube.com/channel/UCznIzuaDRopc1wbfisboIVw",
    },
    { icon: FaTwitter, url: "https://x.com/LawvsF" },
  ];
  return (
    <Box bg="black" color="white" py={10} px={5}>
      <Flex
        direction={{ base: "column", md: "row" }}
        maxW="1200px"
        mx="auto"
        justify="space-between"
        gap={10}
      >
        {/* Logo + Social Icons */}
        <VStack align="flex-start" spacing={5}>
          <ChakraLink as={RouterLink} to="/">
            <Image
              src={logo}
              alt="Logo"
              height="70px"
              width="200px"
              color="white"
            />
          </ChakraLink>
          <Text>SATISFYING ALL LEGAL NEEDS</Text>
          <HStack spacing={3}>
            {socialLinks.map((social, idx) => (
              <Link
                href={social.url}
                isExternal // adds target="_blank" rel="noopener noreferrer"
                key={idx}
                _hover={{ textDecoration: "none" }}
              >
                <Circle
                  size="32px"
                  bg="#D29B3F"
                  borderRadius="full"
                  color="black"
                  _hover={{ bg: "gray.700", color: "white" }}
                >
                  <Icon as={social.icon} color="white" boxSize={4} />
                </Circle>
              </Link>
            ))}
          </HStack>
        </VStack>

        {/* Pages */}
        <VStack align="flex-start" spacing={3}>
          <Text fontWeight="bold" borderBottom="2px solid gold">
            Pages
          </Text>
          <Link href="#">Home</Link>
          <Link href="#">About Us</Link>
          <Link href="#">Articles</Link>
          <Link href="#">Events</Link>
          <Link href="#">Contact</Link>
          <Link href="#">Privacy and Security</Link>
          <Link href="#">Terms and Conditions</Link>
        </VStack>

        {/* Other Pages */}
        <VStack align="flex-start" spacing={3}>
          <Text fontWeight="bold" borderBottom="2px solid gold">
            Other Pages
          </Text>
          <Link href="#">Legal law jobs</Link>
          <Link href="#">Legal law programs</Link>
          <Link href="#">Law Internship</Link>
          <Link href="#">Posting</Link>
        </VStack>

        {/* Quick Contact */}
        <VStack align="flex-start" spacing={3}>
          <Text fontWeight="bold" borderBottom="2px solid gold">
            Quick Contact
          </Text>
          <HStack align="flex-start">
            <MdLocationOn size="20" />
            <Text align={"left"}>
              Office No.101, <br />
              Himland House, Commercial Complex,<br/> Karampura,
              <br />
              Delhi-110015, India
            </Text>
          </HStack>
          <HStack>
            <MdPhone size="20" />
            <Text>8171974067</Text>
          </HStack>
          <HStack>
            <MdEmail size="20" />
            <Text>info@lawvs.com</Text>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Footer;
