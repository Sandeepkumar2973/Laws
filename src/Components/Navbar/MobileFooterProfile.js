// src/components/MobileFooterProfile.js
import React from "react";
import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Text,
  HStack,
  Divider,
  Icon,
} from "@chakra-ui/react";
import {
  FaUser,
  FaBriefcase,
  FaNewspaper,
  FaBlog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaBookOpen,
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import LogoutButton from "../../routes/LogoutButton";

const MobileFooterProfile = ({ isOpen, onClose }) => {
  const NavItem = ({ to, children, icon }) => (
    <HStack
      as={RouterLink}
      to={to}
      onClick={onClose}
      spacing={3}
      w="full"
      px={3}
      py={2}
      borderRadius="md"
      _hover={{ bg: "gray.100", color: "teal.600" }}
      cursor="pointer"
    >
      <Icon as={icon} boxSize={4} color="gray.600" />
      <Text fontSize="md" color="gray.700">
        {children}
      </Text>
    </HStack>
  );

  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent borderLeftRadius="2xl" overflow="hidden">
        <DrawerCloseButton />

        {/* Header with background */}
        <DrawerHeader
          bg="teal.500"
          color="white"
          fontWeight="bold"
          fontSize="lg"
          py={6}
        >
          My Account
        </DrawerHeader>

        <DrawerBody px={0}>
          <VStack align="stretch" spacing={1} mt={4}>
            <NavItem to="/user-auth-dashboard" icon={FaUser}>
              My Profile
            </NavItem>
            <NavItem to="/user-applied-jobs" icon={FaBriefcase}>
              My Applications
            </NavItem>
            <NavItem to="/manage-articles" icon={FaBookOpen}>
              Manage Articles
            </NavItem>
            <NavItem to="/manage-blogs" icon={FaBlog}>
              Manage Blogs
            </NavItem>
            <NavItem to="/manage-news" icon={FaNewspaper}>
              Manage News
            </NavItem>
            <NavItem to="/user-help&suport" icon={FaQuestionCircle}>
              Help & Support
            </NavItem>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFooterProfile;
