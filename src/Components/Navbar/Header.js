// src/components/Header.js
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
} from "@chakra-ui/react";
import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

// Top Header Component
const TopHeader = () => {
  return (
    <Box bg="#2E3338" color="white" px={{ base: 4, md: 8 }} py={2}>
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap={2}
      >
        {/* Phone and Email */}
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

        {/* Social Media Icons */}
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

// Main Header Component
const MainHeader = () => {
  return (
    <Box bg="white" px={{ base: 4, md: 8 }} py={4} boxShadow="sm">
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
      >
        {/* Logo and Tagline */}
        <HStack spacing={4} mb={{ base: 4, md: 0 }}>
          <Image
            src="/logo.png" // Adjust this path to your actual logo
            alt="Logo"
            boxSize="60px"
            objectFit="contain"
          />
          <VStack align="start" spacing={0}>
            <Text fontSize="2xl" fontWeight="bold" color="#2E3338">
              LAW<span style={{ color: "#D29B3F" }}>VS</span>™
            </Text>
            <Text fontSize="xs" color="gray.600">
              SATISFYING ALL{" "}
              <span style={{ color: "#D29B3F", fontWeight: 600 }}>LEGAL</span>{" "}
              NEEDS
            </Text>
          </VStack>
        </HStack>

        {/* Navigation Links */}
        <HStack
          spacing={6}
          fontSize="sm"
          fontWeight="medium"
          color="gray.700"
          wrap="wrap"
          justify="center"
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
      </Flex>
    </Box>
  );
};

// Combined Header with Sticky Behavior
const Header = () => {
  return (
    <Box
      position="sticky"
      top="0"
      zIndex="999"
      bg="white"
      boxShadow="md"
    >
      <TopHeader />
      <MainHeader />
    </Box>
  );
};

export default Header;
