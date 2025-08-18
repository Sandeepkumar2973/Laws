// TopCompanies.js
import React from "react";
import {
  Box,
  Heading,
  Image,
  Text,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";

const companies = [
  {
    name: "BRAJ HOME",
    img: "https://lawvs.com/media/admin/clients/1717159077_983db27b8d521d7278b3.png",
  },
  {
    name: "RMD MEDIAIDS",
    img: "https://lawvs.com/media/admin/clients/1717158972_8f2820d413230a9f8d5a.png",
  },
  {
    name: "D.BHARDWAJ LAW CHAMBER",
    img: "https://lawvs.com/media/admin/clients/1717831087_bc286ee3f6a6c44d0fdd.png",
  },
  {
    name: "SGT UNIVERSITY",
    img: "https://lawvs.com/media/admin/clients/1718090938_4b4019307556987c0169.png",
  },
  {
    name: "KURUKSHETRA UNIVERSITY",
    img: "https://lawvs.com/media/admin/clients/1718090953_e754979854b28c246a6a.png",
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
