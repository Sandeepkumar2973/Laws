import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Badge,
  Progress,
  VStack,
  HStack,
  IconButton,
  Link,
  List,
  ListItem,
  ListIcon,
  Divider,
  useToast,
  Button,
} from "@chakra-ui/react";
import {
  FaLinkedin,
  FaTwitter,
  FaCheckCircle,
  FaUser,
  FaTrophy,
  FaTasks,
} from "react-icons/fa";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import LogoutButton from "../../routes/LogoutButton";
import Header from "../Navbar/Header";
import Footer from "../Navbar/Footer";

const DashboardPage = () => {
  const [mootUser, setMootUser] = useState(null);
  const toast = useToast();

  const userInfo = JSON.parse(localStorage.getItem("MootUserInfo"));
  const token = userInfo?.token;
  const userId = userInfo?.user.id;

  const getMootUserById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/MootUser/get_mootuser_profile/${userId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.data.user) {
        setMootUser(response.data.user);
      } else {
        toast({
          title: "Error",
          description: "User not found",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      toast({
        title: "Error fetching profile",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getMootUserById();
  }, []);
  const downloadCertificate = (certificateUrl) => {
    if (!certificateUrl) {
      toast({
        title: "No certificate available",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const link = document.createElement("a");
    link.href = certificateUrl;
    link.download = "certificate.pdf"; // You can customize the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Header />
      <Flex direction={{ base: "column", md: "row" }} minH="100vh" bg="gray.50">
        {/* Sidebar */}
        <Box
          w={{ base: "100%", md: "30%" }}
          p={6}
          bg="white"
          borderBottomWidth={{ base: "1px", md: "0" }}
          borderRightWidth={{ md: "1px" }}
        >
          <Flex direction="column" align="center">
            <Avatar
              size="2xl"
              name={mootUser?.institution || "Moot User"}
              mb={4}
            />
            <Text fontSize="xl" fontWeight="bold">
              {mootUser?.institution || "Moot User"}
            </Text>
            <Text><Text fontWeight="bold">MootCourt ID: </Text>{mootUser?.MootCourtId}</Text>
            <Text><Text fontWeight="bold">Email: </Text>{mootUser?.email}</Text>
            <Text><Text fontWeight="bold">Mobile: </Text>{mootUser?.mobile}</Text>

            <ChakraLink
              as={RouterLink}
              to="/moot-user-profile-update"
              mt={4}
              bg="blue.500"
              color="white"
              px={4}
              py={2}
              borderRadius="md"
            >
              Edit Profile
            </ChakraLink>

            <LogoutButton />
          </Flex>
        </Box>

        {/* Right Content */}
        <Box w={{ base: "100%", md: "70%" }} p={6}>
          {/* Team Members List */}
          <Box
            mb={6}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            backgroundColor={"gray.50"}
          >
            <Text
              fontSize="2xl"
              fontWeight="bold"
              mb={4}
              backgroundColor={"blue.100"}
              p={2}
              borderRadius="md"
            >
              Team Members
            </Text>

            {mootUser?.teamMembers?.length > 0 ? (
              mootUser.teamMembers.map((member, index) => (
                <Box
                  key={index}
                  mb={6}
                  borderWidth="1px"
                  borderRadius="md"
                  p={4}
                >
                  <Text fontSize="lg" fontWeight="bold" mb={2} color="blue.600">
                    {member?.role?.toUpperCase()}
                  </Text>
                  <Box
                    as="table"
                    width="100%"
                    borderWidth="1px"
                    borderRadius="md"
                  >
                    <tbody align="left">
                      <tr>
                        <td style={{ fontWeight: "bold", padding: "4px 8px" }}>
                          Name
                        </td>
                        <td style={{ padding: "4px 8px" }}>{member?.name}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: "4px 8px" }}>
                          Gender
                        </td>
                        <td style={{ padding: "4px 8px" }}>{member?.gender}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: "4px 8px" }}>
                          University
                        </td>
                        <td style={{ padding: "4px 8px" }}>
                          {member?.university}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: "4px 8px" }}>
                          Course
                        </td>
                        <td style={{ padding: "4px 8px" }}>{member?.course}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: "4px 8px" }}>
                          Year
                        </td>
                        <td style={{ padding: "4px 8px" }}>{member?.year}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: "4px 8px" }}>
                          Contact
                        </td>
                        <td style={{ padding: "4px 8px" }}>
                          {member?.contact}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold", padding: "4px 8px" }}>
                          College ID
                        </td>
                        <td style={{ padding: "4px 8px" }}>
                          {member?.collegeId}
                        </td>
                      </tr>
                      <tr align="center">
                        {/* <td style={{ fontWeight: "bold", padding: "4px 8px" }}>
                        Download Certificate
                      </td> */}
                        <td
                          style={{
                            fontWeight: "bold",
                            padding: "4px 8px",
                          }}
                        >
                          <Button
                            onClick={() =>
                              downloadCertificate(member?.certificate)
                            }
                            style={{ backgroundColor: "green", color: "white" }}
                          >
                            Download Certificate
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </Box>
                </Box>
              ))
            ) : (
              <Text>No team members added</Text>
            )}
          </Box>

          <Divider mb={6} />

          {/* Participation List */}
          <Box mb={6}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Participation & History
            </Text>
            <List spacing={3}>
              {mootUser?.participations?.length > 0 ? (
                mootUser.participations.map((item, index) => (
                  <ListItem key={index}>
                    <ListIcon as={FaTrophy} color="orange.400" />
                    {item.competitionName} — {item.role}, {item.position}, Year:{" "}
                    {item.year}
                  </ListItem>
                ))
              ) : (
                <Text>No participation records yet</Text>
              )}
            </List>
            <Text mt={4} fontWeight="bold">
              Total points: {mootUser?.totalPoints || 0}
            </Text>
          </Box>

          <Divider mb={6} />

          {/* Badges List */}
          <Box mb={6}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Badges & Achievements
            </Text>
            <HStack spacing={2} flexWrap="wrap">
              {mootUser?.badges?.length > 0 ? (
                mootUser.badges.map((badge, index) => (
                  <Badge
                    key={index}
                    colorScheme="yellow"
                    px={3}
                    py={1}
                    borderRadius="md"
                  >
                    {badge}
                  </Badge>
                ))
              ) : (
                <Text>No badges yet</Text>
              )}
            </HStack>
            <Progress value={70} colorScheme="blue" size="sm" mt={4} />
          </Box>

          <Divider mb={6} />

          {/* Skills List */}
          <Box mb={6}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Skills & Expertise
            </Text>
            <List spacing={3}>
              {mootUser?.skills?.length > 0 ? (
                mootUser.skills.map((skill, index) => (
                  <ListItem key={index}>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    {skill}
                  </ListItem>
                ))
              ) : (
                <Text>No skills added yet</Text>
              )}
            </List>
            <Text mt={4} fontWeight="bold">
              Other Expertise:
            </Text>
            <Text>{mootUser?.extraSkill || "No other skills added"}</Text>
          </Box>

          <Divider mb={6} />

          {/* Social Links */}
          <Box>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Social Links
            </Text>
            <HStack spacing={4} flexWrap="wrap">
              {mootUser?.linkedin && (
                <Link href={mootUser.linkedin} isExternal>
                  <IconButton icon={<FaLinkedin />} aria-label="LinkedIn" />
                </Link>
              )}
              {mootUser?.twitter && (
                <Link href={mootUser.twitter} isExternal>
                  <IconButton icon={<FaTwitter />} aria-label="Twitter" />
                </Link>
              )}
            </HStack>
          </Box>
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default DashboardPage;
