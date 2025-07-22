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
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar";
import * as mod from "../../url";

const adminInfo = sessionStorage.getItem("AdminjobInfo");
const parsedInfo = JSON.parse(adminInfo);
const adminId = parsedInfo?.data?.admin?.id;
const token = parsedInfo?.data?.token;

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
                    <Flex justify="space-between" align="center" flexWrap="wrap" mb={6}>
                        <Heading size="lg">User Profile</Heading>
                        <Avatar
                            size="xl"
                            name={user.fullName}
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.fullName}`}
                        />
                    </Flex>

                    <Box borderWidth={1} borderRadius="lg" p={6} shadow="md">
                        <VStack align="start" spacing={4}>
                            <Text><strong>Full Name:</strong> {user.fullName}</Text>
                            <Text><strong>Email:</strong> {user.email}</Text>
                            <Text><strong>Phone:</strong> {user.phone}</Text>
                            <Text><strong>Role:</strong> {user.role}</Text>

                            <HStack>
                                <Text><strong>Profile Completed:</strong></Text>
                                <Badge colorScheme={user.profileCompleted ? "green" : "red"}>
                                    {user.profileCompleted ? "Yes" : "No"}
                                </Badge>
                            </HStack>

                            <HStack>
                                <Text><strong>Verified:</strong></Text>
                                <Badge colorScheme={user.isVerified ? "green" : "red"}>
                                    {user.isVerified ? "Yes" : "No"}
                                </Badge>
                            </HStack>

                            <Text>
                                <strong>Preferred Locations:</strong>{" "}
                                {user.preferredLocations?.join(", ") || "N/A"}
                            </Text>

                            {/* Resume */}
                            <Divider />
                            <Text fontWeight="bold">Resume:</Text>
                            {user.resumeUrl ? (
                                <Link href={user.resumeUrl} isExternal>
                                    <Button colorScheme="blue" size="sm">Download Resume</Button>
                                </Link>
                            ) : (
                                <Text>No resume uploaded</Text>
                            )}

                            {/* Skills */}
                            <Divider />
                            <Text fontWeight="bold">Skills:</Text>
                            {user.skills && user.skills.length > 0 ? (
                                user.skills.map((skill, idx) => (
                                    <Badge
                                        key={idx}
                                        colorScheme="purple"
                                        mr={2}
                                        px={3}
                                        py={1}
                                        borderRadius="md"
                                    >
                                        {skill.skill} ({skill.proficiency})
                                    </Badge>
                                ))
                            ) : (
                                <Text>No skills added</Text>
                            )}

                            {/* Education Table */}
                            <Divider />
                            <Text fontWeight="bold" fontSize="lg">Education:</Text>
                            {user.education && user.education.length > 0 ? (
                                <Box w="100%" overflowX="auto">
                                    <Table size="sm" variant="striped" colorScheme="gray">
                                        <Thead>
                                            <Tr>
                                                <Th>Degree</Th>
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
                            <Text fontWeight="bold" fontSize="lg">Experience:</Text>
                            {user.experience && user.experience.length > 0 ? (
                                <Box w="100%" overflowX="auto">
                                    <Table size="sm" variant="striped" colorScheme="gray">
                                        <Thead>
                                            <Tr>
                                                <Th>Designation</Th>
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
                        </VStack>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default UserDetailPage;
