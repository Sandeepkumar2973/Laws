import React from 'react';
import { Box, Heading, Flex, AspectRatio } from '@chakra-ui/react';

export default function MapPage() {
  return (
    <Box px={{ base: 4, md: 16 }} py={12} bg="gray.50">
      <Heading
        textAlign="center"
        mb={8}
        fontSize={{ base: '2xl', md: '3xl' }}
        fontWeight="bold"
      >
        Connect With Us
      </Heading>

      <Flex
        wrap="wrap"
        justify="center"
        gap={8}
      >
        {/* Map 1 */}
        <AspectRatio
          ratio={4 / 3}
          minW={{ base: '100%', md: '300px' }}
          flex="1 1 300px"
          borderRadius="md"
          overflow="hidden"
          boxShadow="md"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.4159060170755!2d77.1234567!3d28.6123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d04c5a5555555%3A0xabcdef123456789!2sYour%20Office%20Location!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
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
          minW={{ base: '100%', md: '300px' }}
          flex="1 1 300px"
          borderRadius="md"
          overflow="hidden"
          boxShadow="md"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.354765458342!2d85.3211234!3d27.7001234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xabcdef123456789%3A0x123456789abcdef!2sAnother%20Office!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
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
          minW={{ base: '100%', md: '300px' }}
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
