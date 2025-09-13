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
import { FiSearch, FiBell, FiMoon, FiLogOut, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../Assets/logo/logo.png";
import axios from "axios";
import { FiMessageCircle } from "react-icons/fi";
import * as mod from "../../url";
import LogoutButton from "../../routes/LogoutButton";

const Navbar = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [messageCount, setmessageCount] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.200", "gray.300");
  const textColor = useColorModeValue("gray.800", "white");

  const AdminjobInfo = localStorage.getItem("lawvsadmininfo");
  const parsedUserInfo = JSON.parse(AdminjobInfo);
  const adminId = parsedUserInfo?.data?.id;
  const token = parsedUserInfo?.token;

  useEffect(() => {
    if (adminId && token) {
      fetchNotificationCount();
    }
  }, [adminId, token]);

  const fetchNotificationCount = async () => {
    try {
      const res = await axios.get(
        `${mod.api_url}/api/v1/notification/admin/${adminId}`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      const allNotifications = res.data?.data || [];
      const unread = allNotifications.filter((n) => !n.isRead).length;
      setNotificationCount(unread);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    }
  };

  return (
    <Box>
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
          <Link to="/admin-dashboard">
            <img
              src={logo}
              alt="logo"
              style={{ width: "150px", margin: 0, padding: 0 }}
            />
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
          {/* <Box position="relative">
          <Link to="/message">
            <IconButton
              icon={<FiMessageCircle boxSize={6} />} 
              variant="ghost"
              aria-label="Messages"
              size="lg" 
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
        </Box> */}

          <Box position="relative">
            <Link to="/admin-notifications">
              <IconButton
                icon={<FiBell />}
                variant="ghost"
                aria-label="Notifications"
                size="lg"
              />
              {notificationCount > 0 && (
                <Badge
                  borderRadius="full"
                  position="absolute"
                  top="0"
                  right="0"
                  fontSize="0.9rem"
                  px={1}
                  color="white"
                  bgColor="red"
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
                // src="https://randomuser.me/api/portraits/men/32.jpg"
              />
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FiUser />} as={Link} to="/admin-profile">
                My Profile
              </MenuItem>
              <MenuItem>
                <LogoutButton />
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
