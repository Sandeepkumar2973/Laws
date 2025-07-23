// src/components/Header.js
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  Button,
  HStack,
  Link,
  Image,
  VStack,
  Circle,
  useBreakpointValue,
  Collapse,
  IconButton,
} from "@chakra-ui/react";
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

import logo from './../Assets/logo/logo.png'; // Adjust the path as necessary
// ─── TopHeader ─────────────────────────────────────────────
const TopHeader = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
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
          <Text fontSize="" mt='10px'>8171974067</Text>
        </HStack>
        <HStack spacing={2}>
          <Icon as={FaEnvelope} boxSize={4} />
          <Text fontSize="" mt='10px'>info@lawvs.com</Text>
        </HStack>
      </HStack>

      {/* Buttons */}
      <HStack spacing={3}>
        <Button
          size="sm"
          bg="#D29B3F"
          _hover={{ bg: "#c68a2f" }}
          color="white"
          borderRadius="full"
          px={4}
        >
          Job/Internship Seeker
        </Button>
        <Button
          size="sm"
          bg="#D29B3F"
          _hover={{ bg: "#c68a2f" }}
          color="white"
          borderRadius="full"
          px={4}
        >
          Job/Internship Posting
        </Button>
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
        {/* Logo and Tagline */}
       <HStack spacing={0} m={0} p={0}>
          <Image
            src={logo}
            alt="Logo"
            height="70px"       // Keep original height
            width="200px"       // Increase width
            objectFit="contain"
            m={0}
            p={0}
          />
        </HStack>
        {/* Navigation Links or Menu Button */}
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
          >
            <Link href="#">Search Jobs ▾</Link>
            <Link href="#">Legal Drafts</Link>
            <Link href="#">Top Stories</Link>
            <Link href="#">Library</Link>
            <Link href="#">Opportunity</Link>
            <Link href="#">Exams preparation</Link>
            <Link href="#">Q & A</Link>
            <Link href="#">Contact Us</Link>
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
        >
          <Link href="#">Search Jobs ▾</Link>
          <Link href="#">Legal Drafts</Link>
          <Link href="#">Top Stories</Link>
          <Link href="#">Library</Link>
          <Link href="#">Opportunity</Link>
          <Link href="#">Exams preparation</Link>
          <Link href="#">Q & A</Link>
          <Link href="#">Contact Us</Link>
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
