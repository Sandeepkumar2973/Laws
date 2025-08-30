import React, { useContext } from "react";
import { AuthContext } from "../contextApi/AuthContext";
import {
  Box,
  Flex,
  Button,
  Spacer,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import LogoutButton from "../../routes/LogoutButton";
const pulseAnimation = keyframes`
  0%   { transform: scale(1);   background-color: #07e233ff; }
  50%  { transform: scale(1.3); background-color: #fa9107f8; }
  100% { transform: scale(1);   background-color: #120be2ff; }
`;

const DashHeader = () => {
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser, "currentUser");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <>
      {currentUser?.data?.userData?.role === "user" ? (
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="blue"
            onClick={onOpen}
            // rightIcon={<ChevronDownIcon />}
          >
            Dashboard
          </MenuButton>
          {/* <MenuList>
            <MenuItem as={RouterLink} to="/user-auth-dashboard">
              Profile
            </MenuItem>
            <MenuItem as={RouterLink} to="/user-dashboard/settings">
              My Application
            </MenuItem>
            <MenuItem onClick={onOpen}>More Options</MenuItem>
            <MenuItem>
              <LogoutButton />
            </MenuItem>
          </MenuList> */}
        </Menu>
      ) : currentUser?.user?.role === "mootUser" ? (
        <Button
          as={RouterLink}
          to="/moot-user-dashboard"
          mx={2}
          colorScheme="purple"
        >
          Dashboard
        </Button>
      ) : (
        <ChakraLink
          as={RouterLink}
          to="/moot-user-signup"
          textDecoration="none"
          textAlign="center"
          color="white"
          fontWeight="bold"
          borderRadius="full"
          padding={2}
          px={6}
          display="inline-block"
          animation={`${pulseAnimation} 2s ease-in-out infinite`}
          _hover={{
            textDecoration: "none",
            transform: "scale(1.08)",
            boxShadow: "0 0 20px rgba(206, 67, 238, 0.49)",
            bg: "#20ebebffff",
            _before: {
              left: "100%",
            },
          }}
        >
          Moot Court Signup
        </ChakraLink>
      )}

      {/* Side Drawer */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>More Options</DrawerHeader>
          <DrawerBody display="flex" flexDirection="column" gap={3}>
            <Button as={RouterLink} to="/user-auth-dashboard" onClick={onClose}>
              My Profile
            </Button>
            <Button as={RouterLink} to="/user-applied-jobs" onClick={onClose}>
              My Application
            </Button>
            <Button as={RouterLink} to="/user-dashboard/help" onClick={onClose}>
              Help & Support
            </Button>
            <LogoutButton />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DashHeader;
