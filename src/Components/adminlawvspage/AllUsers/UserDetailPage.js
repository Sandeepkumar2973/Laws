import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Container,
  Badge,
  VStack,
  HStack,
  Divider,
  Spinner,
  Button,
  Flex,
  Link,
  Avatar,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar";
import * as mod from "../../../url";

const AdminjobInfo = localStorage.getItem("lawvsadmininfo");
const parsedUserInfo = JSON.parse(AdminjobInfo);
const adminId = parsedUserInfo?.data?.id;
const token = parsedUserInfo?.token;

const SIDEBAR_WIDTH = "250px";

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(
        `${mod.api_url}/api/v1/user/get-user-byId/${id}`,

        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setUser(res.data.data);
    } catch (error) {
      console.error("Failed to fetch user:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  if (loading) {
    return (
      <Box mt="100px" ml={{ base: 0, md: SIDEBAR_WIDTH }}>
        <Center>
          <Spinner size="xl" />
        </Center>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box mt="100px" ml={{ base: 0, md: SIDEBAR_WIDTH }} p={6}>
        <Text>User not found.</Text>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <Box mt="100px" ml={{ base: 0, md: SIDEBAR_WIDTH }} p={6}>
        <Container maxW="container.lg">
          <Heading
            size="lg"
            backgroundColor="yellow.300"
            p={3}
            mb={6}
            borderRadius="md"
          >
            User Profile
          </Heading>

          <Flex
            justify="space-between"
            align="center"
            flexWrap="wrap"
            mb={6}
            // backgroundColor="yellow.100"
            p={6}
            borderRadius="md"
            boxShadow="md"
          >
            <Avatar
              size="xl"
              name={user.fullName}
              src={user.profilePicture}
              // src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.fullName}`}
            />
            {/* <Text fontWeight="bold">Resume:</Text> */}
            {user.resumeUrl ? (
              <Link href={user.resumeUrl} isExternal>
                <Button colorScheme="blue" size="sm">
                  Download Resume
                </Button>
              </Link>
            ) : (
              <Text>No resume uploaded</Text>
            )}
          </Flex>

          <Box borderWidth={1} borderRadius="lg" p={6} shadow="md">
            {/* <VStack align="start" spacing={4}> */}
            <Flex
              justify="space-between"
              align="center"
              flexWrap="wrap"
              mb={6}
              // backgroundColor="yellow.100"
              p={6}
              borderRadius="md"
              boxShadow="md"
            >
              <Box align="start" spacing={4}>
                <Text>
                  <strong>Full Name:</strong> {user.fullName}
                </Text>
                <Text>
                  <strong>Email:</strong> {user.email}
                </Text>
                <Text>
                  <strong>Phone:</strong> {user.phone}
                </Text>
              </Box>
              <Box>
                <HStack>
                  <Text>
                    <strong>Profile Completed:</strong>
                  </Text>
                  <Badge colorScheme={user.profileCompleted ? "green" : "red"}>
                    {user.profileCompleted ? "Yes" : "No"}
                  </Badge>
                </HStack>

                <HStack>
                  <Text>
                    <strong>Verified:</strong>
                  </Text>
                  <Badge colorScheme={user.isVerified ? "green" : "red"}>
                    {user.isVerified ? "Yes" : "No"}
                  </Badge>
                </HStack>

                <Text>
                  <strong>Preferred Locations:</strong>{" "}
                  {user.preferredLocations?.join(", ") || "N/A"}
                </Text>
              </Box>
            </Flex>

            {/* <Divider /> */}
            <Box borderRadius="md" boxShadow="md" p={4} mb={6}>
              <Text fontWeight="bold" p={2} borderRadius="md">
                SKILLS:
              </Text>
              {user.skills && user.skills.length > 0 ? (
                user.skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    // colorScheme="purple"
                    mr={2}
                    px={3}
                    py={1}
                    borderRadius="md"
                    m={1}
                    boxShadow="md"
                    p={4}
                    mb={6}
                  >
                    {skill.skill} ({skill.proficiency})
                  </Badge>
                ))
              ) : (
                <Text>No skills added</Text>
              )}
            </Box>

            {/* Education Table */}
            <Divider />
            <Text fontWeight="bold" fontSize="lg">
              Education:
            </Text>
            {user.education && user.education.length > 0 ? (
              <Box w="100%" overflowX="auto">
                <Table size="sm" variant="striped" colorScheme="gray">
                  <Thead>
                    <Tr backgroundColor="blue.200" borderRadius="md">
                      <Th p={3}>Degree</Th>
                      <Th>Type</Th>
                      <Th>Specialization</Th>
                      <Th>University</Th>
                      <Th>Year</Th>
                      <Th>Grade</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {user.education.map((edu, idx) => (
                      <Tr key={idx}>
                        <Td>{edu.degree}</Td>
                        <Td>{edu.degreeType}</Td>
                        <Td>{edu.specialization}</Td>
                        <Td>{edu.university}</Td>
                        <Td>
                          {edu.startYear} -{" "}
                          {edu.ongoing ? "Ongoing" : edu.endYear}
                        </Td>
                        <Td>{edu.grade}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            ) : (
              <Text>No education details</Text>
            )}

            {/* Experience Table */}
            <Divider />
            <Text fontWeight="bold" fontSize="lg">
              Experience:
            </Text>
            {user.experience && user.experience.length > 0 ? (
              <Box w="100%" overflowX="auto">
                <Table size="sm" variant="striped" colorScheme="gray">
                  <Thead>
                    <Tr backgroundColor="blue.200" borderRadius="md">
                      <Th p={3}>Designation</Th>
                      <Th>Company</Th>
                      <Th>Type</Th>
                      <Th>Location</Th>
                      <Th>Domain</Th>
                      <Th>CTC</Th>
                      <Th>Duration</Th>
                      <Th>Responsibilities</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {user.experience.map((exp, idx) => (
                      <Tr key={idx}>
                        <Td>{exp.designation}</Td>
                        <Td>{exp.companyName}</Td>
                        <Td>{exp.employmentType}</Td>
                        <Td>{exp.location}</Td>
                        <Td>{exp.domain}</Td>
                        <Td>₹{exp.ctc}</Td>
                        <Td>
                          {new Date(exp.startDate).toLocaleDateString()} -{" "}
                          {exp.currentlyWorking
                            ? "Present"
                            : new Date(exp.endDate).toLocaleDateString()}
                        </Td>
                        <Td>{exp.responsibilities}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            ) : (
              <Text>No experience added</Text>
            )}
            {/* </VStack> */}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default UserDetailPage;
