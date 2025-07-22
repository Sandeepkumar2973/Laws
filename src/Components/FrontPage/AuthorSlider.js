import React from 'react';
import {
  Box,
  Image,
  Text,
  Badge,
  Avatar,
  VStack,
  Heading,
  SimpleGrid,
  Center,
} from '@chakra-ui/react';

const authors = [
  {
    name: 'Daimand Krishna Rawat',
    rank: 3,
    news: 11,
    articles: 8,
    type: 'Jobseeker',
    img: 'https://i.ibb.co/k9RjGnG/daimand.jpg',
  },
  {
    name: 'Kashvi',
    rank: 4,
    news: 4,
    articles: 7,
    type: 'Jobseeker',
    img: null,
  },
  {
    name: 'Naincy Saraf',
    rank: 5,
    news: 3,
    articles: 5,
    type: 'Jobseeker',
    img: null,
  },
  {
    name: 'Neha',
    rank: 6,
    news: 0,
    articles: 7,
    type: 'Jobseeker',
    img: null,
  },
];

const TopAuthors = () => {
  return (
    <Box px={{ base: 4, md: 16 }} py={12}>
      <Heading
        as="h2"
        size="lg"
        color="yellow.700"
        mb={4}
        borderBottom="2px solid"
        borderColor="yellow.800"
        w="fit-content"
      >
        Top Authors
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
        {authors.map((author, index) => (
          <Box
            key={index}
            bg="white"
            rounded="xl"
            borderWidth="1px"
            shadow="md"
            p={6}
            textAlign="center"
          >
            <Center mb={3}>
              <Avatar
                src={author.img || 'https://via.placeholder.com/150'}
                name={author.name}
                size="xl"
              />
            </Center>

            <Text fontSize="lg" fontWeight="medium">
              {author.name}
            </Text>

            <Box mt={2}>
              <Badge colorScheme="yellow" fontSize="0.8em" px={4} py={1} borderRadius="md">
                Rank #{author.rank}
              </Badge>
            </Box>

            <VStack spacing={1} mt={3} fontSize="sm" color="gray.700" fontWeight="semibold">
              <Text>
                <Text as="span" color="gray.500">
                  Type:
                </Text>{' '}
                {author.type}
              </Text>
              <Text>
                <Text as="span" color="gray.500">
                  News:
                </Text>{' '}
                {author.news} |{' '}
                <Text as="span" color="gray.500">
                  Articles:
                </Text>{' '}
                {author.articles}
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TopAuthors;
