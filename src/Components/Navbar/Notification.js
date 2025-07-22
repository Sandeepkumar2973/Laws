import React, { useEffect, useState } from "react";
import {
    Box,
    Heading,
    Text,
    Container,
    VStack,
    Spinner,
    Badge,
    Flex,
    Button,
    IconButton,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar";
import * as mod from "../../url";

const SIDEBAR_WIDTH = "250px";

const AdminNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    const adminInfo = JSON.parse(sessionStorage.getItem("AdminjobInfo"));
    const adminId = adminInfo?.data?.admin?.id;
    const token = adminInfo?.data?.token;

    const fetchNotifications = async () => {
        try {
            const res = await axios.get(
                `${mod.api_url}/api/v1/notification/admin/${adminId}`,
                {
                    headers: { Authorization: token },
                }
            );
            setNotifications(res.data.data);
        } catch (err) {
            toast({
                title: "Failed to load notifications",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (notifId) => {
        try {
            await axios.patch(
                `${mod.api_url}/api/v1/notification/mark-read/${notifId}`,
                {},
                { headers: { Authorization: token } }
            );
            fetchNotifications();
        } catch (error) {
            toast({
                title: "Failed to mark as read",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const deleteNotification = async (notifId) => {
        try {
            await axios.delete(
                `${mod.api_url}/api/v1/notification/${notifId}`,
                {
                    headers: { Authorization: token },
                }
            );
            fetchNotifications();
        } catch (error) {
            toast({
                title: "Failed to delete notification",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        if (adminId && token) fetchNotifications();
    }, []);

    return (
        <>
            <Navbar />
            <Sidebar />
            <Box mt="70px" ml={{ base: 0, md: SIDEBAR_WIDTH }} p={6}>
                <Container maxW="container.md">
                    <Heading mb={6}>Admin Notifications</Heading>

                    {loading ? (
                        <Spinner size="lg" />
                    ) : notifications.length === 0 ? (
                        <Text>No notifications found.</Text>
                    ) : (
                        <VStack align="stretch" spacing={4}>
                            {notifications.map((notif) => (
                                <Box
                                    key={notif._id}
                                    p={4}
                                    shadow="md"
                                    borderWidth={1}
                                    borderRadius="md"
                                    bg={notif.isRead ? "gray.100" : "blue.50"}
                                >
                                    <Flex justify="space-between" align="center">
                                        <Box>
                                            <Text fontWeight="medium">{notif.message}</Text>
                                            <Text fontSize="sm" color="gray.500">
                                                {new Date(notif.createdAt).toLocaleString()}
                                            </Text>
                                        </Box>
                                        <Flex gap={2}>
                                            {!notif.isRead && (
                                                <IconButton
                                                    icon={<CheckIcon />}
                                                    size="sm"
                                                    colorScheme="green"
                                                    onClick={() => markAsRead(notif._id)}
                                                    title="Mark as Read"
                                                    aria-label="Mark Read"
                                                />
                                            )}
                                            <IconButton
                                                icon={<DeleteIcon />}
                                                size="sm"
                                                colorScheme="red"
                                                onClick={() => deleteNotification(notif._id)}
                                                title="Delete"
                                                aria-label="Delete Notification"
                                            />
                                        </Flex>
                                    </Flex>
                                </Box>
                            ))}
                        </VStack>
                    )}
                </Container>
            </Box>
        </>
    );
};

export default AdminNotifications;
