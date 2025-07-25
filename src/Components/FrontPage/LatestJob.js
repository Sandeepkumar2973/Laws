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

const jobs = [
  {
    name: "Aarav Sharma",
    rank: 1,
    news: 15,
    articles: 12,
    type: "Internship Seeker",
    img: "https://i.ibb.co/BBcKw9Z/avatar1.jpg",
  },
  {
    name: "Priya Mehta",
    rank: 2,
    news: 9,
    articles: 11,
    type: "Jobseeker",
    img: "https://i.ibb.co/YbfjqG8/avatar2.jpg",
  },
  {
    name: "Rohan Kapoor",
    rank: 3,
    news: 7,
    articles: 9,
    type: "Jobseeker",
    img: "https://i.ibb.co/f8RZ4nM/avatar3.jpg",
  },
  {
    name: "Simran Kaur",
    rank: 4,
    news: 6,
    articles: 8,
    type: "Internship Seeker",
    img: null,
  },
  {
    name: "Simran Kaur",
    rank: 4,
    news: 6,
    articles: 8,
    type: "Internship Seeker",
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
  autoplay: jobs.length > 4, // only autoplay if more than 4
  autoplaySpeed: 1000, // 1 seconds
  // rtl: false, // <-- make sure this is false (or just omit it)
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
const LatestJob = () => {
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
        Latest Job Openings
      </Heading>

      <Slider {...settings}>
        {jobs.map((job, index) => (
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
    </Box>
  );
};

export default LatestJob;
