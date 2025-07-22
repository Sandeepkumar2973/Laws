// src/components/Header.js
import React, { useState, useEffect } from "react";
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

const TopHeader = () => {
  return (
    <Box bg="#2E3338" color="white" px={{ base: 4, md: 8 }} py={2}>
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
            <Text fontSize="sm">8171974067</Text>
          </HStack>
          <HStack spacing={2}>
            <Icon as={FaEnvelope} boxSize={4} />
            <Text fontSize="sm">info@lawvs.com</Text>
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
  );
};

const MainHeader = ({ isMobileNavOpen, toggleMobileNav }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box bg="white" px={{ base: 4, md: 8 }} py={4} boxShadow="sm">
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        wrap="wrap"
      >
        {/* Logo and Tagline */}
        <HStack spacing={4}>
          <Image src="/logo.png" alt="Logo" boxSize="60px" objectFit="contain" />
          <VStack align="start" spacing={0}>
            <Text fontSize="2xl" fontWeight="bold" color="#2E3338">
              LAW<span style={{ color: "#D29B3F" }}>VS</span>™
            </Text>
            <Text fontSize="xs" color="gray.600">
              SATISFYING ALL <span style={{ color: "#D29B3F", fontWeight: 600 }}>LEGAL</span> NEEDS
            </Text>
          </VStack>
        </HStack>

        {/* Hamburger Icon on Mobile */}
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

      {/* Collapsible Mobile Nav */}
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

const Header = () => {
  const [showTopHeader, setShowTopHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowTopHeader(false);
      } else {
        setShowTopHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <Box position="sticky" top="0" zIndex="999" bg="white" boxShadow="md">
      {showTopHeader && <TopHeader />}
      <MainHeader
        isMobileNavOpen={isMobileNavOpen}
        toggleMobileNav={toggleMobileNav}
      />
    </Box>
  );
};

export default Header;
