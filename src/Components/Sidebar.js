import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  IconButton,
  Text,
  Icon,
  Badge,
  Collapse,
  useDisclosure,
  VStack, // ✅ Add this
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import axios from "axios";

import {
  FaUserShield,
  FaTasks,
  FaUsers,
  FaPlus,
  FaFileAlt,
  FaEnvelope,
  FaChevronDown,
  FaChevronRight,
  FaChartBar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiMessageCircle } from "react-icons/fi";
import * as mod from "./../url";

const SIDEBAR_WIDTH = "250px";
const Sidebar = () => {
  const [selectedSection, setSelectedSection] = useState("dashboard");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const authDisclosure = useDisclosure();
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const AdminjobInfo = sessionStorage.getItem("AdminjobInfo");
  const parsedUserInfo = JSON.parse(AdminjobInfo);

  const adminId = parsedUserInfo?.data?.admin?.id;
  useEffect(() => {
    const fetchAdmin = async () => {
      const token = parsedUserInfo?.data?.token;
      try {
        const res = await axios.get(
          `${mod.api_url}/api/v1/admin/get-admin-byid/${adminId}`,
          {
            headers: {
              Authorization: ` ${token}`,
            },
          }
        );
        setAdminData(res.data.data);
      } catch (err) {
        console.error("API Error:", err.response || err.message);
        setError("Failed to fetch admin data");
      } finally {
        setLoading(false);
      }
    };

    if (adminId) {
      fetchAdmin();
    } else {
      setLoading(false);
      setError("Admin ID not found in session.");
    }
  }, [adminId]);

  // console.log(adminData.fullName, 'adminData')
  return (
    <>
      {/* Hamburger Icon - Mobile */}
      <IconButton
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        display={{ base: "block", md: "none" }}
        onClick={onOpen}
        position="fixed"
        top="25px"
        left="10px"
        zIndex="1500"
        bg="white"
        border="1px solid lightgray"
        _hover={{ bg: "gray.100" }}
      />

      {/* Sidebar - Desktop */}
      <Box
        width={SIDEBAR_WIDTH}
        bg="#1f2a40"
        color="white"
        display={{ base: "none", md: "block" }}
        position="fixed"
        top="0"
        left="0"
        height="100vh"
        overflowY="auto"
        p={4}
        pt="70px" // same as navbar height
        zIndex="999"
      >
        <Text fontSize="2xl" fontWeight="bold" mb={6} mt="70px">
          {adminData?.fullName}
        </Text>

        <SidebarItem icon={FaChartBar} label="Dashboard" to="/" badge="" badgeColor="green" />
        {/* <Text fontSize="xs" color="gray.400" mt={6} mb={2}>
          MENU
        </Text> */}
        <SidebarItem icon={FaTasks} label="Manage Job" to="/manage-job" />
        <SidebarItem icon={FaFileAlt} label="All Application" to="/all-application" />
        <SidebarItem icon={FaPlus} label="Create Job" to="/create-job" />
        <SidebarItem icon={FiMessageCircle} label="Message" to="/message" />
        {/* <SidebarItem icon={FaPlus} label="Create Live Class" to="/live-class" /> */}
        {/* <SidebarItem icon={FaEnvelope} label="Contact Data" to="/contact" /> */}

        {/* <Text fontSize="xs" color="gray.400" mt={6} mb={2}>
          CUSTOM
        </Text> */}

        {/* <SidebarItem
          icon={FaUserShield}
          label="Authentication"
          collapsible
          disclosure={authDisclosure}
        />
        <Collapse in={authDisclosure.isOpen}>
          <Box pl={8} pb={2}>
            <Text fontSize="xs" color="gray.400">Login</Text>
            <Text fontSize="xs" color="gray.400">Register</Text>
          </Box>
        </Collapse> */}
      </Box>

      {/* Drawer - Mobile */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={4}>
              <Link to="/admin-profile" onClick={onClose}>
                <Button width="100%" colorScheme="blue">Dashboard</Button>
              </Link>
              <Link to="/manage-job" onClick={onClose}>
                <Button width="100%" colorScheme="blue">Manage Job</Button>
              </Link>
              <Link to="/all-application" onClick={onClose}>
                <Button width="100%" colorScheme="blue">All Applications</Button>
              </Link>
              <Link to="/create-job" onClick={onClose}>
                <Button width="100%" colorScheme="blue">Create Job</Button>
              </Link>
              <Link to="/message" onClick={onClose}>
                <Button width="100%" colorScheme="blue">Message</Button>
              </Link>
              <Link to="/live-class" onClick={onClose}>
                {/* <Button width="100%" colorScheme="blue">Create Live Class</Button> */}
              </Link>
              <Link to="/contact" onClick={onClose}>
                {/* <Button width="100%" colorScheme="blue">Contact Data</Button> */}
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const SidebarItem = ({
  icon,
  label,
  to,
  badge,
  badgeColor = "red",
  collapsible = false,
  disclosure,
  hidden,
}) => {
  if (hidden) return null;

  return (
    <Flex
      as={to ? Link : "div"}
      to={to}
      align="center"
      justify="space-between"
      p={2}
      borderRadius="md"
      _hover={{ bg: "gray.700" }}
      cursor="pointer"
      onClick={collapsible ? disclosure.onToggle : undefined}
    >
      <Flex align="center" gap={3}>
        <Icon as={icon} boxSize={4} />
        <Text fontSize="sm">{label}</Text>
      </Flex>
      {badge && (
        <Badge colorScheme={badgeColor} fontSize="0.6em">
          {badge}
        </Badge>
      )}
      {collapsible && (
        <Icon
          as={disclosure.isOpen ? FaChevronDown : FaChevronRight}
          boxSize={3}
        />
      )}
    </Flex>
  );
};

export default Sidebar;
