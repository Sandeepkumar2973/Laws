import React from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Icon,
  Input,
  Textarea,
  Button,
  Heading,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import Footer from "../Navbar/Footer";
import Header from "../Navbar/Header";
import MapPage from "./Map";

const ContactUs = () => {
  const contacts = [
    {
      address:
        "Delhi office: Office No.105, Himland House, Commercial Complex Karampura, Delhi - 110015",
      phone: "+91 81719 74067",
      email: "hr@lawvs.com",
    },
    {
      address:
        "AT 8, Marina View, Level 42, Asia Square Tower 1, Suite No: 42030, Singapore",
      phone: "+91 81719 74067",
      email: "hr@lawvs.com",
    },
    {
      address: "6263, Ali Chamber, Nagindas Master Road Fort, Mumbai - 400023",
      phone: "+91 (22) 22641653",
      email: "hr@lawvs.com",
    },
  ];
  return (
    <>
      <Header />
      <Flex
        direction={{ base: "column", md: "row" }}
        px={{ base: 4, md: 16 }}
        py={12}
        gap={10}
        minH="80vh"
        bg="gray.50"
      >
        {/* Left Column - Contact Details */}
        <Box flex={1} align="left">
          <Text fontWeight="bold" color="purple.600" mb={2}>
            CONTACT DETAIL
          </Text>
          <Heading size="lg" mb={4}>
            Get in touch
          </Heading>
          <Text mb={8} color="gray.600">
            Rutrum nascetur mollis felis himenaeos torquent proin magnis
            malesuada montes egestas at.
          </Text>

          <VStack align="start" spacing={6}>
            <HStack align="start" spacing={4}>
              <Box bg="yellow.500" p={3} borderRadius="full">
                <Icon as={FaMapMarkerAlt} color="white" boxSize={5} />
              </Box>
              <Box>
                <Text fontWeight="bold">Corporate Office</Text>
                <Text>
                  Office No.105, Himland House, Commercial Complex, Karampura,
                  Delhi-110015, India
                </Text>
              </Box>
            </HStack>

            <HStack align="start" spacing={4}>
              <Box bg="yellow.500" p={3} borderRadius="full">
                <Icon as={FaMapMarkerAlt} color="white" boxSize={5} />
              </Box>
              <Box>
                <Text fontWeight="bold">Branch Office</Text>
                <Text>
                  Office No.105, Himland House, Commercial Complex, Karampura,
                  Delhi-110015, India
                </Text>
              </Box>
            </HStack>

            <HStack align="start" spacing={4}>
              <Box bg="yellow.500" p={3} borderRadius="full">
                <Icon as={FaPhone} color="white" boxSize={5} />
              </Box>
              <Box>
                <Text fontWeight="bold">Phone</Text>
                <Text>
                  <b>Between 10.00am - 8.00pm (IST)</b>
                </Text>
                <Text>+8171974067</Text>
                <Text>+8171974067</Text>
              </Box>
            </HStack>

            <HStack align="start" spacing={4}>
              <Box bg="yellow.500" p={3} borderRadius="full">
                <Icon as={FaEnvelope} color="white" boxSize={5} />
              </Box>
              <Box>
                <Text fontWeight="bold">Email</Text>
                <Text>info@lawvs.com</Text>
              </Box>
            </HStack>
          </VStack>
        </Box>

        {/* Right Column - Contact Form */}
        <Box
          flex={1}
          bg="white"
          p={{ base: 6, md: 10 }}
          borderRadius="md"
          boxShadow="md"
        >
          <Heading size="lg" mb={6}>
            Do You Have Any Queries?
          </Heading>
          <form>
            <Flex direction={{ base: "column", md: "row" }} gap={4} mb={4}>
              <FormControl>
                <FormLabel>Your Name:</FormLabel>
                <Input placeholder="Your Name" />
              </FormControl>
              <FormControl>
                <FormLabel>Phone:</FormLabel>
                <Input placeholder="Phone Number" />
              </FormControl>
            </Flex>
            <FormControl mb={4}>
              <FormLabel>Email Address:</FormLabel>
              <Input placeholder="Your Email" />
            </FormControl>
            <FormControl mb={6}>
              <FormLabel>Message:</FormLabel>
              <Textarea placeholder="Your Message" rows={5} />
            </FormControl>
            <Button
              bg="yellow.500"
              color="white"
              w="full"
              _hover={{ bg: "yellow.600" }}
            >
              Submit Query
            </Button>
          </form>
        </Box>
      </Flex>
      {/* Map section Pages */}
      <MapPage />
      <Box px={{ base: 4, md: 4 }} py={12}>
        <Flex wrap="wrap" justify="center" gap={4}>
          {contacts.map((contact, idx) => (
            <Box
              key={idx}
              bg="white"
              p={6}
              maxW="sm"
              textAlign="center"
              borderRadius="xl"
              boxShadow="sm"
              borderBottom="3px solid #D29B3F"
              _hover={{ boxShadow: "md" }}
            >
              <Text mb={1}>{contact.address}</Text>
              <VStack spacing={1} mb={2}>
                <Heading size="md" color="#D29B3F">
                  Hours
                </Heading>
                <Text>Monday - Friday</Text>
                <Text>9am - 6pm</Text>
              </VStack>
              <VStack spacing={1}>
                <Heading size="md" color="#D29B3F">
                  Contacts
                </Heading>
                <Text>{contact.phone}</Text>
                <Text>{contact.email}</Text>
              </VStack>
            </Box>
          ))}
        </Flex>
      </Box>
      <Footer />
    </>
  );
};
export default ContactUs;
