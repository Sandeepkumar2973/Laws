import { Box, Spinner, Text, VStack } from "@chakra-ui/react";

export const Spinnernew = () => {
  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-r, teal.50, teal.100)"
    >
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
        <Text
          fontSize="lg"
          fontWeight="bold"
          bgGradient="linear(to-r, teal.500, green.400)"
          bgClip="text"
        >
          Loading, please wait...
        </Text>
      </VStack>
    </Box>
  );
};
