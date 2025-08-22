import {
  Box,
  Text,
  Heading,
  Divider,
  Avatar,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../Sidebar";
import Navbar from "../../Navbar/Navbar";
// import axiosInstance from "../../utils/axiosInstance";
import * as mod from "../../../url";

const SIDEBAR_WIDTH = "250px";

const Profile = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const AdminjobInfo = localStorage.getItem("lawvsadmininfo");
  const parsedUserInfo = JSON.parse(AdminjobInfo);
  const adminId = parsedUserInfo?.data?.id;
  const token = parsedUserInfo?.token;

  useEffect(() => {
    const fetchAdmin = async () => {
      // const token = parsedUserInfo?.data?.token;
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

  // if (loading) {
  //   return (
  //     <Center mt={10}>
  //       <Spinner size="lg" />
  //     </Center>
  //   );
  // }

  if (error || !adminData) {
    return (
      <Center mt={10}>
        <Text color="red.500">{error || "No admin data found."}</Text>
      </Center>
    );
  }

  const { email, fullName, status, role, companyName } = adminData;

  return (
    <>
      <Navbar />
      <Sidebar />

      <Box
        mt="100px"
        ml={{ base: 0, md: SIDEBAR_WIDTH }}
        p={4}
        maxW="container.md"
      >
        <Center w="100%">
          <Box
          // bgGradient="linear(to-r, gray.500, blue.100)"
          // borderRadius="2xl"
          // boxShadow="xl"
          // p={6}
          // // w={{ base: "90%", md: "70%", lg: "50%" }}
          // color="white"
          >
            <Flex direction="column" align="center" mb={6}>
              <Avatar
                size="2xl"
                name={fullName}
                src="https://bit.ly/broken-link"
                mb={4}
                border="4px solid white"
              />
              <Heading size="lg">{fullName || "Admin Profile"}</Heading>
              <Text fontSize="md" opacity={0.8}>
                {role || "Admin"}
              </Text>
            </Flex>

            <Divider borderColor="whiteAlpha.600" mb={4} />

            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th color="whiteAlpha.800">Field</Th>
                  <Th color="whiteAlpha.800">Details</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr _hover={{ bg: "whiteAlpha.200" }}>
                  <Td>Company Name</Td>
                  <Td fontWeight="bold">{companyName}</Td>
                </Tr>
                <Tr _hover={{ bg: "whiteAlpha.200" }}>
                  <Td>Email</Td>
                  <Td fontWeight="bold">{email}</Td>
                </Tr>
                <Tr _hover={{ bg: "whiteAlpha.200" }}>
                  <Td>Mobile</Td>
                  <Td fontWeight="bold">{"N/A"}</Td>
                </Tr>
                <Tr _hover={{ bg: "whiteAlpha.200" }}>
                  <Td>Role</Td>
                  <Td fontWeight="bold">{role || "Admin"}</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default Profile;
