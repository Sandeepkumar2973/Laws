import React from "react";
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
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const authors = [
  {
    name: "Daimand Krishna Rawat",
    rank: 3,
    news: 11,
    articles: 8,
    type: "Jobseeker",
    img: "https://i.ibb.co/k9RjGnG/daimand.jpg",
  },
  {
    name: "Kashvi",
    rank: 4,
    news: 4,
    articles: 7,
    type: "Jobseeker",
    img: null,
  },
  {
    name: "Naincy Saraf",
    rank: 5,
    news: 3,
    articles: 5,
    type: "Jobseeker",
    img: null,
  },
  {
    name: "Neha",
    rank: 6,
    news: 0,
    articles: 7,
    type: "Jobseeker",
    img: null,
  },
  {
    name: "Neha",
    rank: 6,
    news: 0,
    articles: 7,
    type: "Jobseeker",
    img: null,
  },
  {
    name: "Daimand Krishna Rawat",
    rank: 3,
    news: 11,
    articles: 8,
    type: "Jobseeker",
    img: "https://i.ibb.co/k9RjGnG/daimand.jpg",
  },
  {
    name: "Kashvi",
    rank: 4,
    news: 4,
    articles: 7,
    type: "Jobseeker",
    img: null,
  },
];
// Example slider settings
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: authors.length > 4, // only autoplay if more than 5
  autoplaySpeed: 1000, // 1 seconds
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

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

      <Slider {...settings}>
        {authors.map((author, index) => (
          <Box
            key={index}
            bg="white"
            rounded="xl"
            borderWidth="1px"
            shadow="md"
            p={6}
            textAlign="center"
            // mx={2} // add margin between slides
            margin={2}
          >
            <Center mb={3}>
              <Avatar
                src={author.img || "https://via.placeholder.com/150"}
                name={author.name}
                size="xl"
              />
            </Center>

            <Text fontSize="lg" fontWeight="medium">
              {author.name}
            </Text>

            <Box mt={2}>
              <Badge
                colorScheme="yellow"
                fontSize="0.8em"
                px={4}
                py={1}
                borderRadius="md"
              >
                Rank #{author.rank}
              </Badge>
            </Box>

            <VStack
              spacing={1}
              mt={3}
              fontSize="sm"
              color="gray.700"
              fontWeight="semibold"
            >
              <Text>
                <Text as="span" color="gray.500">
                  Type:
                </Text>{" "}
                {author.type}
              </Text>
              <Text>
                <Text as="span" color="gray.500">
                  News:
                </Text>{" "}
                {author.news} |{" "}
                <Text as="span" color="gray.500">
                  Articles:
                </Text>{" "}
                {author.articles}
              </Text>
            </VStack>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default TopAuthors;
