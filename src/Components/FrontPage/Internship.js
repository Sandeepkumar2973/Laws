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
const intern = [
  {
    name: "Aarav Mehta",
    rank: 1,
    news: 15,
    articles: 12,
    type: "Jobseeker",
    img: "https://i.ibb.co/album/Aarav.jpg",
  },
  {
    name: "Saanvi Sharma",
    rank: 2,
    news: 10,
    articles: 9,
    type: "Jobseeker",
    img: null,
  },
  {
    name: "Vivaan Singh",
    rank: 3,
    news: 8,
    articles: 6,
    type: "Jobseeker",
    img: null,
  },
  {
    name: "Diya Patel",
    rank: 4,
    news: 5,
    articles: 7,
    type: "Jobseeker",
    img: null,
  },
  {
    name: "Saanvi Sharma",
    rank: 2,
    news: 10,
    articles: 9,
    type: "Jobseeker",
    img: null,
  },
  {
    name: "Saanvi Sharma",
    rank: 2,
    news: 10,
    articles: 9,
    type: "Jobseeker",
    img: null,
  },
];

// Example slider settings
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: intern.length > 5, // only autoplay if more than 5
  autoplaySpeed: 2000, // 2 seconds
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
const Internship = () => {
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
        Latest Internship
      </Heading>

      {/* <SimpleGrid  > */}
      <Slider {...settings}>
        {intern.map((job, index) => (
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
                src={job.img || "https://via.placeholder.com/150"}
                name={job.name}
                size="xl"
              />
            </Center>

            <Text fontSize="lg" fontWeight="medium">
              {job.name}
            </Text>

            <Box mt={2}>
              <Badge
                colorScheme="yellow"
                fontSize="0.8em"
                px={4}
                py={1}
                borderRadius="md"
              >
                Rank #{job.rank}
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
                {job.type}
              </Text>
              <Text>
                <Text as="span" color="gray.500">
                  News:
                </Text>{" "}
                {job.news} |{" "}
                <Text as="span" color="gray.500">
                  Articles:
                </Text>{" "}
                {job.articles}
              </Text>
            </VStack>
          </Box>
        ))}
      </Slider>
      {/* </SimpleGrid> */}
    </Box>
  );
};

export default Internship;
