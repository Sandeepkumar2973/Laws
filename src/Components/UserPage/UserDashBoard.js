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
} from "@chakra-ui/react";
import Header from "../Navbar/Header";
import { Education } from "./UserDtailsPage/Education";
import { Experience } from "./UserDtailsPage/Experience";
import { Skills } from "./UserDtailsPage/Skills";
import { useRef } from "react";
import { useState } from "react";
import { CvUpload } from "./UserDtailsPage/CvUpload";
import ProfileAvatar from "./UserDtailsPage/ProfileAvatar";
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
      >
        {/* Profile Header */}
        <Flex align="left" justify="space-between">
          
          <ProfileAvatar/>
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
      </Box>
    </>
  );
};

export default UserDashBoard;
