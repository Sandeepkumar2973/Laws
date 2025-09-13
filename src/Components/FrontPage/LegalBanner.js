import {
  Box,
  Heading,
  Input,
  Button,
  Flex,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const LegalBanner = () => {
  return (
    <Box
      w="100%"
      minH={{ base: "15vh", md: "40vh", lg: "60vh" }}
      bgImage="url('https://lawvs.com/public/lawvs/assets/images/law-banner.png')"
      bgRepeat="no-repeat"
      bgSize={{ base: "contain", md: "cover" }}
      bgPosition="center"
      bgColor="black"
      display="flex"
      alignItems="center"
      px={{ base: 4, md: 12, lg: 20 }}
    >
      <Box
        maxW={{ base: "full", md: "lg", lg: "2xl" }}
        textAlign={{ base: "left", md: "left" }}
        color="white"
      >
        {/* Heading */}
        <Heading
          as="h1"
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          mb={6}
          lineHeight="1.3"
          textAlign="left" // 🔹 Always left aligned
        >
          legal portal to <br /> satisfy all legal <br /> needs!
        </Heading>

        {/* Search Box (Responsive) */}
        <Stack
          direction={{ base: "column", sm: "row" }}
          spacing={0}
          bg="white"
          borderRadius="full"
          overflow="hidden"
          maxW="full"
          alignItems="center"
          mt={{ base: 6, md: 12 }}
        >
          {/* Search Icon + Input */}
          {/* <Flex alignItems="center" px={4} w={{ base: "100%", sm: "60%" }}>
            <Icon as={FaSearch} color="goldenrod" boxSize={5} mr={2} />
            <Input
              placeholder="Search for legal services..."
              border="none"
              flex={1}
              fontSize={{ base: "sm", md: "md" }}
              _focus={{ outline: "none" }}
            />
          </Flex> */}

          {/* Location Icon */}
          {/* <Flex
            alignItems="center"
            justifyContent="center"
            px={4}
            borderTop={{ base: "1px solid #ddd", sm: "none" }}
            borderLeft={{ base: "none", sm: "1px solid #ddd" }}
            w={{ base: "100%", sm: "auto" }}
          >
            <Icon as={FaMapMarkerAlt} color="goldenrod" boxSize={5} />
          </Flex> */}

          {/* Search Button */}
          {/* <Button
            bg="goldenrod"
            color="white"
            borderRadius={{ base: "0", sm: "none" }}
            w={{ base: "100%", sm: "auto" }}
            px={{ base: 4, sm: 8 }}
            py={{ base: 6, sm: 6 }}
            fontSize={{ base: "sm", md: "md" }}
            _hover={{ bg: "gold" }}
          >
            Search
          </Button> */}
        </Stack>
      </Box>
    </Box>
  );
};

export default LegalBanner;
