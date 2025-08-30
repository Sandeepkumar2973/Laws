import { Box, Heading, Input, Button, Flex, Icon } from "@chakra-ui/react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const LegalBanner = () => {
  return (
    <Box
      w="100%"
      h={{ base: "50vh", md: "60vh" }}
      bgImage="url('https://lawvs.com/public/lawvs/assets/images/law-banner.png')"
      bgSize="cover"
      bgPosition="center"
      display="flex"
      alignItems="center"
      px={{ base: 4, md: 16 }}
    >
      <Flex justifyContent="flex-end" pr={{ base: 4, md: 12 }}>
        <Box maxW="lg" color="white">
          <Heading
            as="h1"
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
            mt={"120px"}
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
