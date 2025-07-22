// InternshipBanner.js
import React from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Image,
  Button,
  Link,
} from "@chakra-ui/react";
import { FaRegHandPointer } from "react-icons/fa";

const InternshipBanner = () => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      maxW="1200px"
      mx="auto"
      bg="white"
      overflow="hidden"
      borderRadius="md"
      boxShadow="md"
    >
      {/* Left Image */}
      <Box flex="1" minH="300px">
        <Image
          src="https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg"
          alt="Student working"
          objectFit="cover"
          w="100%"
          h="100%"
        />
      </Box>

      {/* Right Content */}
      <Box flex="1" bg="#1c2341" color="white" p={8} position="relative">
        <VStack align="flex-start" spacing={5}>
          <Image
            src="https://lawvs.com/wp-content/uploads/2024/05/lawvs-logo.png"
            alt="Lawvs Logo"
            h="40px"
          />
          <Text fontSize="2xl" fontWeight="bold">
            INTERNSHIP
          </Text>
          <Text fontSize="lg">Mode : Online & Offline</Text>
          <Text>
            SIGN UP TO <Text as="span" color="#d4af37" fontWeight="bold">LAWVS INTERNSHIP!</Text>
          </Text>
          <VStack align="flex-start" spacing={2} fontSize="md">
            <Text>• Develop professional skills & experience</Text>
            <Text>• Network with other like-minded interns</Text>
            <Text>• Find top jobs & internships.</Text>
          </VStack>

          <Button
            bg="#b3863b"
            color="white"
            rightIcon={<FaRegHandPointer />}
            _hover={{ bg: "#8d6b2b" }}
          >
            Register Now
          </Button>

          <Box>
            <Image
              src="https://api.qrserver.com/v1/create-qr-code/?data=https://forms.gle/&size=100x100"
              alt="QR Code"
              borderRadius="md"
              mb={2}
            />
            <Text>Register by Filling Google form</Text>
            <Link href="mailto:info@lawvs.com" color="#d4af37">
              info@lawvs.com
            </Link>
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
};

export default InternshipBanner;
