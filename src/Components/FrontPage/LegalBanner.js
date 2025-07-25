import { Box, Heading, Input, Button, Flex, Icon } from "@chakra-ui/react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const LegalBanner = () => {
  return (
    <Box
      w="100%"
      h={{ base: "80vh", md: "90vh" }}
      bgImage="url('https://plus.unsplash.com/premium_photo-1661769577787-9811af17f98d?q=80&w=1953&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      bgSize="cover"
      bgPosition="center"
      display="flex"
      alignItems="center"
      px={{ base: 4, md: 16 }}
    >
      <Flex justifyContent="flex-end" pr={{ base: 4, md: 12 }}>
        <Box maxW="lg" color="white">
          <Heading
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="bold"
            mb={6}
            lineHeight="1.2"
            mt={6}
          >
            legal portal to <br /> satisfy all legal <br /> needs!
          </Heading>

          <Flex
            bg="white"
            borderRadius="full"
            overflow="hidden"
            maxW="lg"
            w="full"
            alignItems="center"
            mt={"148px"}
          >
            <Flex alignItems="center" px={4}>
              <Icon as={FaSearch} color="goldenrod" boxSize={5} />
            </Flex>

            <Input
              placeholder="Search for legal services..."
              border="none"
              flex={1}
              _focus={{ outline: "none" }}
            />

            <Flex alignItems="center" px={4} borderLeft="1px solid #ddd">
              <Icon as={FaMapMarkerAlt} color="goldenrod" boxSize={5} />
            </Flex>

            <Button
              bg="goldenrod"
              color="white"
              borderRadius="none"
              px={8}
              py={6}
              _hover={{ bg: "gold" }}
            >
              Search
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default LegalBanner;
