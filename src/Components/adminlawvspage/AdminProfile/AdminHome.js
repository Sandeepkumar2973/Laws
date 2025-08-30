import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Icon,
  Spinner,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaBriefcase, FaBell, FaUsers } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { PieChart, Pie, Cell, Legend } from "recharts";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar";
import * as mod from "../../../url";

const SIDEBAR_WIDTH = "250px";

const AdminHome = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const boxBg = useColorModeValue("white", "gray.800");
  const AdminjobInfo = localStorage.getItem("lawvsadmininfo");
  const parsedUserInfo = JSON.parse(AdminjobInfo);
  const adminId = parsedUserInfo?.data?.id;
  const token = parsedUserInfo?.token;
  const COLORS = ["#3182CE", "#38A169", "#DD6B20", "#E53E3E"];
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [jobsRes, applicationsRes, usersRes, notifRes, chartRes] =
          await Promise.all([
            axios.get(`${mod.api_url}/api/v1/job/job-count/${adminId}`),
            axios.get(
              `${mod.api_url}/api/v1/admin/application-count/${adminId}`
            ),
            axios.get(
              `${mod.api_url}/api/v1/admin/applicant-user-count/${adminId}`
            ),
            axios.get(
              `${mod.api_url}/api/v1/notification/notification-count/${adminId}`
            ),
            axios.get(
              `${mod.api_url}/api/v1/admin/applicant-bydate-count/${adminId}`
            ),
          ]);

        setDashboardData({
          jobCount: jobsRes.data.count,
          applicationCount: applicationsRes.data.count,
          userCount: usersRes.data.count,
          notificationCount: notifRes.data.count,
          applicationsByDate: chartRes.data.data || [],
        });
        // console.log("Chart Data Response:", chartRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    {
      label: "Total Jobs",
      value: dashboardData?.jobCount || 0,
      icon: FaBriefcase,
      bg: "linear(to-r, blue.400, purple.400)",
    },
    {
      label: "Applications",
      value: dashboardData?.applicationCount || 0,
      icon: MdAssignment,
      bg: "linear(to-r, cyan.400, green.300)",
    },
    {
      label: "Users",
      value: dashboardData?.userCount || 0,
      icon: FaUsers,
      bg: "linear(to-r, orange.300, red.300)",
    },
    {
      label: "Notifications",
      value: dashboardData?.notificationCount || 0,
      icon: FaBell,
      bg: "linear(to-r, blue.300, blue.600)",
    },
  ];
  return (
    <>
      <Navbar />
      <Sidebar />
      <Box mt="100px" ml={{ base: 0, md: SIDEBAR_WIDTH }} p={6}>
        <Heading
          fontSize="2xl"
          mb={1}
          size="md"
          backgroundColor="yellow.300"
          p={3}
          borderRadius="50px"
        >
          ADMIN DASHBOARD
        </Heading>
        <Text color="gray.500" mb={8}>
          Overview and Statistics
        </Text>

        {loading ? (
          <Flex justify="center" align="center" minH="200px">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <>
            {/* Stats Grid */}
            <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6} mb={10}>
              {stats.map((stat, i) => (
                <Box
                  key={i}
                  bgGradient={stat.bg}
                  color="white"
                  p={6}
                  borderRadius="lg"
                  boxShadow="lg"
                >
                  <Flex justify="space-between" align="center">
                    <Flex direction="column">
                      <Icon as={stat.icon} boxSize={8} mb={2} />
                      <Text fontSize="md" fontWeight="bold">
                        {stat.label}
                      </Text>
                    </Flex>
                    <Text fontSize="3xl" fontWeight="bold">
                      {stat.value}
                    </Text>
                  </Flex>
                </Box>
              ))}
            </SimpleGrid>
            {/* Applications Chart */}
            {dashboardData?.applicationsByDate?.length > 0 ? (
              <Box borderRadius="lg" p={6} shadow="md">
                <Heading fontSize="lg" mb={4}>
                  Applications Over Time
                </Heading>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dashboardData?.applicationsByDate}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3182ce" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            ) : (
              <Text>No application data available.</Text>
            )}
            <Box bg={boxBg} borderRadius="lg" p={6} shadow="md" mt={8}>
              <Heading fontSize="lg" mb={4}>
                Team Distribution
              </Heading>
              <Flex
                direction={{ base: "column", md: "row" }}
                align="center"
                justify="space-between"
              >
                {/* Pie Chart Left */}
                <Box flex="1" minW="260px">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={stats}
                        dataKey="value"
                        nameKey="label"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={false} // Hide label on slice
                      >
                        {stats.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip
                        formatter={(value, name) => [`${value}%`, name]}
                        cursor={{ fill: "rgba(128, 10, 183, 0.92)" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                {/* Details Right */}
                <VStack
                  flex="1"
                  align="start"
                  spacing={3}
                  mt={{ base: 6, md: 0 }}
                  ml={{ base: 0, md: 8 }}
                >
                  {stats.map((item, idx) => (
                    <Flex key={idx} align="center">
                      <Box
                        w={3}
                        h={3}
                        bg={COLORS[idx % COLORS.length]}
                        borderRadius="full"
                        mr={2}
                      />
                      <Text fontWeight="medium">{item.label}:</Text>
                      <Text ml={2}>{item.value}%</Text>
                    </Flex>
                  ))}
                </VStack>
              </Flex>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default AdminHome;
