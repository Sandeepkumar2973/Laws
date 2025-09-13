// src/components/MobileFooterNav.js
import React, { useContext } from "react";
import {
  Box,
  HStack,
  VStack,
  Text,
  IconButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FaHome, FaBookOpen, FaComments, FaUser } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contextApi/AuthContext";
import MobileFooterProfile from "./MobileFooterProfile";
import FloatingMenu from "./FloatingMenu";
import LoginModal from "./LoginModal"; // 👈 naya component import

const MobileFooterNav = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Profile drawer ke liye
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Guest login modal ke liye
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();

  const handleProfileClick = () => {
    if (currentUser?.data?.userData?.role === "user") {
      onOpen(); // user logged in → profile drawer open
    } else if (currentUser?.user?.role === "mootUser") {
      navigate("/moot-user-dashboard"); // moot user → dashboard
    } else {
      onLoginOpen(); // guest → open login modal
    }
  };
  return (
    <>
      <Box
        display={{ base: "block", md: "none" }}
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        bg="white"
        boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
        zIndex="1000"
      >
        <HStack
          justify="space-around"
          align="center"
          py={2}
          position="relative"
          backgroundColor="#bd902ff5"
          color="white"
        >
          {/* Home */}
          <VStack spacing={0}>
            <RouterLink to="/">
              <IconButton
                aria-label="Home"
                icon={<FaHome />}
                variant="ghost"
                color="white"
                style={{ fontSize: "30px" }}
              />
            </RouterLink>
            <Text fontSize="xs">Home</Text>
          </VStack>

          {/* Jobs */}
          <VStack spacing={0} mr="20%">
            <RouterLink to="/get-all-jobs">
              <IconButton
                aria-label="Jobs"
                icon={<FaBookOpen />}
                variant="ghost"
                color="white"
                style={{ fontSize: "30px" }}
              />
            </RouterLink>
            <Text fontSize="xs">Jobs</Text>
          </VStack>

          <FloatingMenu />

          {/* Q&A */}
          <VStack spacing={0}>
            <RouterLink to="/q-and-a">
              <IconButton
                aria-label="Q&A"
                icon={<FaComments style={{ fontSize: "30px" }} />}
                variant="ghost"
                color="white"
              />
            </RouterLink>
            <Text fontSize="xs">Q & A</Text>
          </VStack>

          {/* Profile / Login */}
          <VStack spacing={0} onClick={handleProfileClick} cursor="pointer">
            <IconButton
              aria-label="Profile"
              icon={<FaUser />}
              variant="ghost"
              color="white"
              style={{ fontSize: "30px" }}
            />
            <Text fontSize="xs">
              {currentUser ? (
                "Profile"
              ) : (
                <>
                  <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
                  login
                </>
              )}
            </Text>
          </VStack>
        </HStack>
      </Box>

      {/* Profile Drawer (only for user role) */}
      {currentUser?.data?.userData?.role === "user" && (
        <MobileFooterProfile isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
};

export default MobileFooterNav;
