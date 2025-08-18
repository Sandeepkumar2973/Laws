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
  Link,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  FaPhone,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";

import logo from "../Assets/logo/logo.png";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import DashHeader from "./Headerdashoard";

// Social media links
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

// dashboard

// ─── JobsMenu ──────────────────────────────────────────────
const JobsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Menu isOpen={isOpen}>
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
          <MenuItem>Jobs By Practice Area</MenuItem>
          <MenuItem>Jobs By Location</MenuItem>
          <MenuItem>Jobs By Qualification</MenuItem>
          <MenuItem>Browse All Jobs</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

const MootCourtMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  // Dynamically adjust submenu position based on screen size
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => {
        setIsMenuOpen(false);
        setIsSubmenuOpen(false);
      }}
    >
      <Menu isOpen={isMenuOpen}>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          variant="ghost"
          _hover={{ bg: "gray.100" }}
          _expanded={{ bg: "gray.200" }}
        >
          Moot Court
        </MenuButton>

        <MenuList>
          {/* Submenu */}
          <Box
            position="relative"
            onMouseEnter={() => setIsSubmenuOpen(true)}
            onMouseLeave={() => setIsSubmenuOpen(false)}
          >
            <MenuItem>
              INSTRUCTIONS FOR PARTICIPANTS
              <ChevronRightIcon ml="auto" />
            </MenuItem>

            {isSubmenuOpen && (
              <MenuList
                position="absolute"
                top={isMobile ? "100%" : "90%"}
                left={isMobile ? "30%" : "80%"}
                mt={isMobile ? "0" : "-1"}
                zIndex="popover"
                w="max-content"
              >
                <MenuItem>
                  <ChakraLink as={RouterLink} to={"/moot-user-signup"}>
                    REGISTRATION FORM
                  </ChakraLink>
                </MenuItem>
                <MenuItem>
                  <ChakraLink as={RouterLink} to={"/rulesAnd_regulation"}>
                    RULES AND REGULATIONS OF COMPETITION
                  </ChakraLink>
                </MenuItem>
                {/* <MenuItem>
                  <ChakraLink as={RouterLink} to={"/moot_proposition"}>
                    MOOT PROPOSITION
                  </ChakraLink>
                </MenuItem> */}
                <MenuItem>
                  <ChakraLink as={RouterLink} to={"/steps_to_register"}>
                    STEPS TO REGISTER
                  </ChakraLink>
                </MenuItem>
                <MenuItem>
                  <ChakraLink as={RouterLink} to={"/ask_que_for_team"}>
                    FAQ FOR TEAM
                  </ChakraLink>
                </MenuItem>
                <MenuItem>
                  <ChakraLink as={RouterLink} to={"/moot_map"}>
                    MOOT MAP
                  </ChakraLink>
                </MenuItem>
              </MenuList>
            )}
          </Box>
          <MenuItem>
            <ChakraLink as={RouterLink} to={"/brochure_&_praposition"}>
              {" "}
              BROCHURE{" "}
            </ChakraLink>
          </MenuItem>

          <MenuItem>
            <ChakraLink as={RouterLink} to={"/organiging_committee"}>
              ORGANIZING COMMITTEE
            </ChakraLink>
          </MenuItem>

          <MenuItem>
            <ChakraLink as={RouterLink} to={"/information_for_Judges"}>
              INFORMATION FOR JUDGES
            </ChakraLink>
          </MenuItem>
          <MenuItem>
            <ChakraLink as={RouterLink} to={"/askque_for_judges"}>
              FAQ FOR JUDGES
            </ChakraLink>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

// export default MootCourtMenu;

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
          <Link
            href="https://wa.me/8171974067"
            isExternal
            mt="10px"
            _hover={{ textDecoration: "underline" }}
          >
            <Icon as={FaWhatsapp} boxSize={6} m={2} color={"green.500"} />
            8171974067
          </Link>
        </HStack>

        <HStack spacing={2}>
          <Link
            href="mailto:info@lawvs.com"
            mt="10px"
            _hover={{ textDecoration: "underline" }}
          >
            <Icon as={FaEnvelope} boxSize={4} m={2} />
            info@lawvs.com
          </Link>
        </HStack>
      </HStack>

      {/* Buttons */}
      <HStack spacing={3}>
        {/* <ChakraLink
          as={RouterLink}
          to="/moot-user-signup"
          textDecoration="none"
          _hover={{ textDecoration: "none" }}
          size="sm"
          bg="#D29B3F"
          color="white"
          borderRadius="full"
          padding={2}
          px={6}
        >
          Moot Court Participation
        </ChakraLink> */}
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
            <MootCourtMenu />
            {/* <JobsMenu /> */}
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
              to="/videos-news"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              Videos&News
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/top-stories"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              {/* Top Stories */}
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/library"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              {/* Library */}
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/opportunity"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              {/* Opportunity */}
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/exam-preparation"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              {/* Exams Preparation */}
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/q-and-a"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              {/* Q & A */}
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/contact"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              {/* Contact Us */}
            </ChakraLink>
            <DashHeader />
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
          <MootCourtMenu />
          {/* <JobsMenu /> */}
          <ChakraLink as={RouterLink} to="/legal-draft" marginLeft={3}>
            Legal Drafts
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/videos-news" marginLeft={3}>
            Videos&News
          </ChakraLink>
          {/* <ChakraLink as={RouterLink} to="/top-stories" marginLeft={3}>
            Top Stories
          </ChakraLink> */}

          {/* <ChakraLink as={RouterLink} to="/library" marginLeft={3}>
            Library
          </ChakraLink> */}
          {/* <ChakraLink as={RouterLink} to="/opportunity" marginLeft={3}>
            Opportunity
          </ChakraLink> */}
          {/* <ChakraLink as={RouterLink} to="/exam-preparation" marginLeft={3}>
            Exams Preparation
          </ChakraLink> */}
          {/* <ChakraLink as={RouterLink} to="/q-and-a" marginLeft={3}>
            Q & A
          </ChakraLink> */}
          {/* <ChakraLink as={RouterLink} to="/contact" marginLeft={3}>
            Contact Us
          </ChakraLink> */}
          <DashHeader />
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
