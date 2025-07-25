// src/components/Header.js
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  Button,
  HStack,
  Image,
  VStack,
  Circle,
  useBreakpointValue,
  Collapse,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import logo from "../Assets/logo/logo.png";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
// ─── JobsMenu ──────────────────────────────────────────────
const JobsMenu = () => (
  <Menu>
    <MenuButton
      as={Button}
      rightIcon={<ChevronDownIcon />}
      variant="ghost"
      _hover={{ bg: "gray.100" }}
      _expanded={{ bg: "gray.200" }}
    >
      Search Jobs
    </MenuButton>
    <MenuList>
      <MenuItem as="a" to="#">
        Jobs By Practice Area
      </MenuItem>
      <MenuItem as="a" to="#">
        Jobs By Location
      </MenuItem>
      <MenuItem as="a" to="#">
        Jobs By Qualification
      </MenuItem>
      <MenuItem as="a" to="#">
        Browse All Jobs
      </MenuItem>
    </MenuList>
  </Menu>
);

// ─── TopHeader ─────────────────────────────────────────────
const TopHeader = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    {...props} // ✅ Pass props to avoid Chakra warnings
    bg="#2E3338"
    color="white"
    px={{ base: 4, md: 8 }}
    py={2}
  >
    <Flex
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="space-between"
      gap={2}
    >
      {/* Contact Info */}
      <HStack spacing={6}>
        <HStack spacing={2}>
          <Icon as={FaPhone} boxSize={4} />
          <Text mt="10px">8171974067</Text>
        </HStack>
        <HStack spacing={2}>
          <Icon as={FaEnvelope} boxSize={4} />
          <Text mt="10px">info@lawvs.com</Text>
        </HStack>
      </HStack>

      {/* Buttons */}
      <HStack spacing={3}>
        <ChakraLink
          as={RouterLink}
          to="/user-auth-login"
          textDecoration="none"
          _hover={{ textDecoration: "none" }}
          size="sm"
          bg="#D29B3F"          
          color="white"
          borderRadius="full"
          padding={2}
          px={6}
        >
          Job/Internship Seeker
        </ChakraLink>
        <ChakraLink
          as={RouterLink}
          to="/admin-auth-login"
          textDecoration="none"
          _hover={{ textDecoration: "none" }}
          size="sm"
          bg="#D29B3F"          
          color="white"
          borderRadius="full"
          padding={2}
          px={6}
        >
          Job/Internship Post
        </ChakraLink>
      </HStack>

      {/* Social Icons */}
      <HStack spacing={3}>
        {[FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube, FaTwitter].map(
          (IconType, idx) => (
            <Circle size="32px" bg="#D29B3F" key={idx}>
              <Icon as={IconType} color="white" boxSize={4} />
            </Circle>
          )
        )}
      </HStack>
    </Flex>
  </Box>
));

// ─── MainHeader ────────────────────────────────────────────
const MainHeader = ({ isMobileNavOpen, toggleMobileNav }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      bg="white"
      px={{ base: 4, md: 8 }}
      py={4}
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="999"
    >
      <Flex align="center" justify="space-between" wrap="wrap">
        {/* Logo */}
        <HStack spacing={0} m={0} p={0}>
          <ChakraLink as={RouterLink} to="/">
            <Image
              src={logo}
              alt="Logo"
              height="70px"
              width="200px"
              objectFit="contain"
              m={0}
              p={0}
            />
          </ChakraLink>
        </HStack>

        {/* Navigation */}
        {isMobile ? (
          <IconButton
            icon={isMobileNavOpen ? <FaTimes /> : <FaBars />}
            onClick={toggleMobileNav}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        ) : (
          <HStack
            spacing={6}
            fontSize="sm"
            fontWeight="medium"
            color="gray.700"
            as="nav"
          >
            <JobsMenu />
            <ChakraLink
              as={RouterLink}
              to="/legal-draft"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              Legal Drafts
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/top-stories"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              Top Stories
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/library"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              Library
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/opportunity"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              Opportunity
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/exam-preparation"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              Exams Preparation
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/q-and-a"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              Q & A
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/contact"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              Contact Us
            </ChakraLink>
          </HStack>
        )}
      </Flex>

      {/* Mobile Dropdown Menu */}
      <Collapse in={isMobileNavOpen} animateOpacity>
        <VStack
          mt={4}
          spacing={4}
          fontSize="sm"
          fontWeight="medium"
          color="gray.700"
          align="start"
          textDecoration="none"
        >
          <JobsMenu />
          <ChakraLink to="#">Legal Drafts</ChakraLink>
          <ChakraLink to="#">Top Stories</ChakraLink>
          <ChakraLink to="#">Library</ChakraLink>
          <ChakraLink to="#">Opportunity</ChakraLink>
          <ChakraLink to="#">Exams Preparation</ChakraLink>
          <ChakraLink to="#">Q & A</ChakraLink>
          <ChakraLink to="#">Contact Us</ChakraLink>
        </VStack>
      </Collapse>
    </Box>
  );
};

// ─── Header Wrapper ────────────────────────────────────────
const Header = () => {
  const [showTopHeader, setShowTopHeader] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const prevScrollY = useRef(0);

  const toggleMobileNav = () => setIsMobileNavOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > prevScrollY.current && currentY > 100) {
        setShowTopHeader(false);
      } else {
        setShowTopHeader(true);
      }

      prevScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Box
        transform={showTopHeader ? "translateY(0)" : "translateY(-100%)"}
        transition="transform 0.3s ease"
      >
        <TopHeader />
      </Box>

      <MainHeader
        isMobileNavOpen={isMobileNavOpen}
        toggleMobileNav={toggleMobileNav}
      />
    </>
  );
};

export default Header;
