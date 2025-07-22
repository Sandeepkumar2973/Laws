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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar/Navbar";
// import axiosInstance from "../../utils/axiosInstance";
import * as mod from "../../url";

const SIDEBAR_WIDTH = "250px";

const Profile = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const AdminjobInfo = sessionStorage.getItem("AdminjobInfo");
  const parsedUserInfo = JSON.parse(AdminjobInfo);
  const adminId = parsedUserInfo?.data?.admin?.id;

  useEffect(() => {
    const fetchAdmin = async () => {
      const token = parsedUserInfo?.data?.token;
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
        <Heading as="h2" size="lg" mb={4}>
          Admin Profile
        </Heading>
        <Divider />

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td bg="green.500" color="white">
                Profile
              </Td>
              <Td bg="blue.500" color="white">
                <Center>
                  <Avatar src="https://bit.ly/broken-link" />
                </Center>
              </Td>
            </Tr>
            <Tr>
              <Td bg="blue.500" color="white">Company Name</Td>
              <Td bg="green.500" color="white">{companyName}</Td>
            </Tr>
            <Tr>
              <Td bg="blue.500" color="white">Email</Td>
              <Td bg="green.500" color="white">{email}</Td>
            </Tr>
            <Tr>
              <Td bg="blue.500" color="white">Admin Name</Td>
              <Td bg="green.500" color="white">{fullName}</Td>
            </Tr>
            <Tr>
              <Td bg="blue.500" color="white">Mobile</Td>
              <Td bg="green.500" color="white">{"N/A"}</Td>
            </Tr>
            <Tr>
              <Td bg="blue.500" color="white">Role</Td>
              <Td bg="green.500" color="white">{role || "admin"}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default Profile;
