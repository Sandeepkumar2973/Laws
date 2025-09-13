import {
  Box,
  Heading,
  Text,
  Avatar,
  Button,
  Flex,
  Stack,
  Divider,
  Tag,
  HStack,
  Icon,
} from "@chakra-ui/react";
import Header from "../Navbar/Header";
import { Education } from "./UserDtailsPage/Education";
import { Experience } from "./UserDtailsPage/Experience";
import { Skills } from "./UserDtailsPage/Skills";
import { useRef } from "react";
import { useState } from "react";
import { CvUpload } from "./UserDtailsPage/CvUpload";
import ProfileAvatar from "./UserDtailsPage/ProfileAvatar";
import { FaSignOutAlt } from "react-icons/fa";
import LogoutButton from "../../routes/LogoutButton";
const data = JSON.parse(localStorage.getItem("lawvsuserinfo"));
const token = data?.data?.token;
const userId = data?.data?.userData?.id;
const userDetails = data?.data?.userData;
const UserDashBoard = () => {
  const [user, setUser] = useState("");
  const fileInputRef = useRef();
  return (
    <>
      <Header />
      <Box
        // maxW="1200px"
        mx="auto"
        mt={8}
        p={6}
        boxShadow="md"
        borderRadius="md"
        pb={{ base: "70px", md: "0" }}
      >
        {/* Profile Header */}
        <Flex align="left" justify="space-between">
          <ProfileAvatar />
          {/* <Button
            colorScheme="teal"
            // onClick={() => onUpdate("profile", user?._id)}
          >
            Edit Profile
          </Button> */}
          <Box textAlign="right">
            <Heading size="md">{userDetails?.fullName.toUpperCase()}</Heading>
            <Text color="gray.500">{userDetails?.email}</Text>
            <Text>{userDetails?.phone}</Text>
            <Text>{user?.currentLocation}</Text>
          </Box>
        </Flex>

        <Divider my={6} />

        {/* Education Section */}
        <Education />

        <Divider my={6} />

        {/* Experience Section */}

        <Experience />
        <Divider my={6} />

        {/* Skills Section */}

        <Skills />
        <Divider my={6} />

        {/* Resume */}
        <CvUpload />
        <Divider my={4} />

        {/* Logout Section */}
        <Box px={3} pb={4}>
          <HStack
            spacing={3}
            // w="full"
            px={3}
            py={2}
            borderRadius="md"
            bg="red.50"
            // _hover={{ bg: "red.100" }}
            cursor="pointer"
            //   onClick={onClose}
          >
            <Icon as={FaSignOutAlt} boxSize={4} color="red.500" />
            <LogoutButton />
          </HStack>
        </Box>
      </Box>
    </>
  );
};

export default UserDashBoard;
