import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Text,
  VStack,
  Input,
  Button,
  HStack,
  Avatar,
  Divider,
  Flex,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import * as mod from "../../url";
import Home from "../Sidebar"; // Sidebar
import Navbar from "../Navbar/Navbar";

const Message = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const toast = useToast();

  const AdminjobInfo = sessionStorage.getItem("AdminjobInfo");
  const parsedUserInfo = JSON.parse(AdminjobInfo);
  const currentUserId = parsedUserInfo?.data?.admin?.id;
  const token = parsedUserInfo?.data?.token;

  useEffect(() => {
    // Get all users the admin can chat with
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${mod.api_url}/api/v1/user/get-all-users`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setUsers(data?.users || []);
      } catch (err) {
        toast({
          title: "Failed to load users",
          status: "error",
          duration: 3000,
        });
      }
    };
    fetchUsers();
  }, []);

  const fetchMessages = async (userId) => {
    setSelectedUser(userId);
    try {
      const { data } = await axios.get(`${mod.api_url}/api/v1/chat/get-messages/${userId}`, {
        headers: { Authorization: `${token}` },
      });
      setMessages(data?.messages || []);
    } catch (err) {
      toast({
        title: "Failed to load messages",
        status: "error",
        duration: 3000,
      });
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      from: currentUserId,
      to: selectedUser,
      text: inputMessage,
    };

    try {
      await axios.post(`${mod.api_url}/api/v1/chat/send-message`, newMessage, {
        headers: { Authorization: `${token}` },
      });

      setMessages((prev) => [...prev, { ...newMessage, createdAt: new Date() }]);
      setInputMessage("");
    } catch (err) {
      toast({
        title: "Failed to send message",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Navbar />
      <Box ml={{ base: 0, md: "0px" }} mt="100px" height="calc(100vh - 70px)">
        <Flex height="100%" borderWidth="1px" borderRadius="md" overflow="hidden">
          {/* Left Panel - Users */}
          <Box width={{ base: "30%", md: "25%" }} borderRight="1px solid #ccc" p={4} overflowY="auto">
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Users
            </Text>
            <VStack align="stretch" spacing={3}>
              {users.map((user) => (
                <Box
                  key={user._id}
                  p={3}
                  borderRadius="md"
                  bg={selectedUser === user._id ? "blue.100" : "gray.100"}
                  _hover={{ bg: "gray.200", cursor: "pointer" }}
                  onClick={() => fetchMessages(user._id)}
                >
                  <HStack>
                    <Avatar size="sm" name={user.name} />
                    <Text>{user.name}</Text>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Right Panel - Chat Window */}
          <Flex flex="1" direction="column" p={4} justify="space-between" bg="gray.50">
            <Box flex="1" overflowY="auto" pr={2}>
              <VStack spacing={4} align="stretch">
                {messages.map((msg, idx) => (
                  <Box
                    key={idx}
                    alignSelf={msg.from === currentUserId ? "flex-end" : "flex-start"}
                    bg={msg.from === currentUserId ? "blue.300" : "gray.300"}
                    color="white"
                    px={4}
                    py={2}
                    borderRadius="lg"
                    maxWidth="70%"
                  >
                    <Text>{msg.text}</Text>
                    <Text fontSize="xs" mt={1} textAlign="right">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Box>

            {/* Message Input */}
            {selectedUser && (
              <HStack mt={4}>
                <Input
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button colorScheme="blue" onClick={sendMessage}>
                  Send
                </Button>
              </HStack>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Message;
