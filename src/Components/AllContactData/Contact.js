import React, { useState, useEffect } from "react";
import * as mod from "./../../url";
import axios from "axios";
import { Box, Text, Heading } from "@chakra-ui/react";
import Home from "../Sidebar";

const Contact = () => {
  const [contacts, setContacts] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${mod.api_url}/api/contact/get_contacts`
      );
      setContacts(response.data.contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Home />
      <Box maxW="container.md" mx="auto" p={4}>
        <Heading as="h3" mb={4}>
          Contact
        </Heading>
        {contacts && contacts.length > 0 ? (
          contacts.map((contact, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              mb={4}
              boxShadow="md"
            >
              <Heading as="h4" size="md" mb={2}>
                {contact?.name || "N/A"}
              </Heading>
              <Text fontSize="sm" color="gray.600" mb={1}>
                Email: {contact?.email || "N/A"}
              </Text>
              <Text fontSize="sm" color="gray.600" mb={1}>
                Mobile: {contact?.mobile || "N/A"}
              </Text>
              <Text fontSize="sm" color="gray.600" mb={1}>
                Description: {contact?.dec || "No description"}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Receive Date: {contact?.createdAt?.slice(0, 10) || "Unknown"}
              </Text>
            </Box>
          ))
        ) : (
          <Text fontSize="sm" color="gray.500">
            No contacts found.
          </Text>
        )}
      </Box>
    </>
  );
};

export default Contact;
