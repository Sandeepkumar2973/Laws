import { Box, VStack, Link, IconButton, useToast } from "@chakra-ui/react";
import { FaWhatsapp, FaXTwitter, FaFacebookF, FaLinkedinIn, FaEnvelope, FaLink } from "react-icons/fa6";

export default function ShareSidebar({ url, title }) {
  const toast = useToast();

  // copy link function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box
      position="fixed"
      top="50%"
      right="0"
      transform="translateY(-50%)"
      zIndex="1000"
    >
      <VStack spacing={0}>
        {/* WhatsApp */}
        <Link href={`https://wa.me/?text=${encodeURIComponent(title)} - ${url}`} isExternal>
          <IconButton
            icon={<FaWhatsapp />}
            bg="green.400"
            color="white"
            borderRadius="0"
            size="lg"
            _hover={{ bg: "green.500" }}
          />
        </Link>

        {/* X / Twitter */}
        <Link href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(title)}`} isExternal>
          <IconButton
            icon={<FaXTwitter />}
            bg="black"
            color="white"
            borderRadius="0"
            size="lg"
            _hover={{ bg: "gray.800" }}
          />
        </Link>

        {/* Facebook */}
        <Link href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} isExternal>
          <IconButton
            icon={<FaFacebookF />}
            bg="blue.500"
            color="white"
            borderRadius="0"
            size="lg"
            _hover={{ bg: "blue.600" }}
          />
        </Link>

        {/* LinkedIn */}
        <Link
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodeURIComponent(title)}`}
          isExternal
        >
          <IconButton
            icon={<FaLinkedinIn />}
            bg="blue.700"
            color="white"
            borderRadius="0"
            size="lg"
            _hover={{ bg: "blue.800" }}
          />
        </Link>

        {/* Email */}
        <Link href={`mailto:?subject=${encodeURIComponent(title)}&body=${url}`}>
          <IconButton
            icon={<FaEnvelope />}
            bg="red.400"
            color="white"
            borderRadius="0"
            size="lg"
            _hover={{ bg: "red.500" }}
          />
        </Link>

        {/* Copy Link */}
        <IconButton
          icon={<FaLink />}
          bg="black"
          color="white"
          borderRadius="0"
          size="lg"
          onClick={copyToClipboard}
          _hover={{ bg: "gray.700" }}
        />
      </VStack>
    </Box>
  );
}
