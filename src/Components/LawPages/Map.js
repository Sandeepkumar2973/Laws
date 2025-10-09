import React from "react";
import { Box, Heading, Flex, AspectRatio } from "@chakra-ui/react";

export default function MapPage() {
  return (
    <Box px={{ base: 4, md: 16 }} py={12} bg="gray.50">
      <Heading
        textAlign="center"
        mb={8}
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="bold"
      >
        Connect With Us
      </Heading>

      <Flex wrap="wrap" justify="center" gap={8}>
        {/* Map 1 */}
        <AspectRatio
          ratio={4 / 3}
          minW={{ base: "100%", md: "300px" }}
          flex="1 1 300px"
          borderRadius="md"
          overflow="hidden"
          boxShadow="md"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.9231620525006!2d77.14454827485092!3d28.662019282742268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0255c9905a7d%3A0x320a30905bcc850a!2sLAWVS%20LEGAL%20LLP!5e0!3m2!1sen!2sin!4v1759908214673!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </AspectRatio>

        {/* Map 2 */}
        <AspectRatio
          ratio={4 / 3}
          minW={{ base: "100%", md: "300px" }}
          flex="1 1 300px"
          borderRadius="md"
          overflow="hidden"
          boxShadow="md"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3988.8249020983344!2d103.84860307435027!3d1.278604261802004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sAT%208%2C%20Marina%20View%2C%20Level%2042%2C%20%20Asia%20Square%20Tower%201%2C%20%20Suite%20No%3A%2042030%2C%20Singapore!5e0!3m2!1sen!2sin!4v1759908709296!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </AspectRatio>

        {/* Map 3 */}
        <AspectRatio
          ratio={4 / 3}
          minW={{ base: "100%", md: "300px" }}
          flex="1 1 300px"
          borderRadius="md"
          overflow="hidden"
          boxShadow="md"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.354765458342!2d72.8351234!3d19.0761234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xabcdef123456789%3A0xabcdef123456789!2sAli%20Chambers!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </AspectRatio>
      </Flex>
    </Box>
  );
}
