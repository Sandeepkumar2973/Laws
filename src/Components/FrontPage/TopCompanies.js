// TopCompanies.js
import React from "react";
import { Box, Heading, Image, Text, SimpleGrid, VStack } from "@chakra-ui/react";

const companies = [
  {
    name: "GLA UNIVERSITY",
    img: "https://via.placeholder.com/150x150?text=GLA",
  },
  {
    name: "RMD MEDIAIDS",
    img: "https://via.placeholder.com/150x150?text=RMD",
  },
  {
    name: "D.BHARDWAJ LAW CHAMBER",
    img: "https://via.placeholder.com/150x150?text=DB+Law",
  },
  {
    name: "SGT UNIVERSITY",
    img: "https://via.placeholder.com/150x150?text=SGT",
  },
  {
    name: "KURUKSHETRA UNIVERSITY",
    img: "https://via.placeholder.com/150x150?text=KU",
  },
];

const TopCompanies = () => {
  return (
    <Box bg="#f2f9ff" py={10} textAlign="center">
      <Heading mb={10} color="goldenrod">
        Top Companies Hiring at Lawvs
      </Heading>

      <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={10} px={5}>
        {companies.map((company, index) => (
          <VStack key={index}>
            <Image
              src={company.img}
              alt={company.name}
              boxSize="100px"
              objectFit="contain"
            />
            <Text fontWeight="medium">{company.name}</Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TopCompanies;
