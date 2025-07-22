import React, { useEffect, useState } from "react";
import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  Text,
  useColorMode,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import {
  FiSearch,
  FiBell,
  FiMoon,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../Assets/logo/198cd4a6-9bef-4b76-89b2-03c80467d2ba.png";
import axios from "axios";
import { FiMessageCircle } from "react-icons/fi";
import * as mod from "../../url";

const SIDEBAR_WIDTH = "250px";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [messageCount, setmessageCount] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  const adminInfo = JSON.parse(sessionStorage.getItem("AdminjobInfo"));
  const adminId = adminInfo?.data?.admin?.id;
  const token = adminInfo?.data?.token;

  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem("AdminjobInfo") !== null);
    fetchNotificationCount();
  }, []);

  const fetchNotificationCount = async () => {
    try {
      const res = await axios.get(
        `${mod.api_url}/api/v1/notification/admin/${adminId}`,
        {
          headers: { Authorization: token },
        }
      );
      const allNotifications = res.data?.data || [];
      const unread = allNotifications.filter(n => !n.isRead).length;
      setNotificationCount(unread);
    } catch (err) {
      console.error("Failed to fetch notifications");
    }
  };

  const logoutHandler = () => {
    sessionStorage.removeItem("AdminjobInfo");
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      px={4}
      py={2}
      bg={bgColor}
      color={textColor}
      shadow="sm"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      width="100%"
    >
      <Flex align="center" gap={3}>
        <Link to="/">
          <img src={logo} alt="logo" style={{ width: "150px", margin: 0, padding: 0 }} />
        </Link>
        {/* <Text fontWeight="bold" fontSize="xl">LOGO</Text> */}
      </Flex>

      {/* <InputGroup maxW="400px" display={{ base: "none", md: "flex" }}>
        <InputLeftElement pointerEvents="none">
          <FiSearch color="gray.400" />
        </InputLeftElement>
        <Input placeholder="Search..." />
      </InputGroup> */}

      <Flex align="center" gap={4}>
        <IconButton
          icon={<FiMoon />}
          variant="ghost"
          onClick={toggleColorMode}
          aria-label="Toggle Theme"
        />
        <Box position="relative">
          <Link to="/message">
            <IconButton
              icon={<FiMessageCircle boxSize={6} />}  // Increase icon size here (default is 4)
              variant="ghost"
              aria-label="Messages"
              size="lg"         // Optional: change button padding/size
            />
            {messageCount > 0 && (
              <Badge
                colorScheme="green"
                borderRadius="full"
                position="absolute"
                top="0"
                right="0"
                fontSize="0.6rem"
                px={1}
              >
                {messageCount}
              </Badge>
            )}
          </Link>
        </Box>


        <Box position="relative">
          <Link to="/admin-notifications">
            <IconButton
              icon={<FiBell />}
              variant="ghost"
              aria-label="Notifications"
            />
            {notificationCount > 0 && (
              <Badge
                colorScheme="red"
                borderRadius="full"
                position="absolute"
                top="0"
                right="0"
                fontSize="0.6rem"
                px={1}
              >
                {notificationCount}
              </Badge>
            )}
          </Link>
        </Box>

        <Menu>
          <MenuButton>
            <Avatar
              size="sm"
              name="Admin"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<FiUser />} as={Link} to="/admin-profile">
              My Profile
            </MenuItem>
            {isLoggedIn ? (
              <MenuItem icon={<FiLogOut />} onClick={logoutHandler}>
                Logout
              </MenuItem>
            ) : (
              <MenuItem as={Link} to="/login">
                Login
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Navbar;
