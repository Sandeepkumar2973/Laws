// src/components/EbooksSlider.jsx

import React from "react";
import Slider from "react-slick";
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const ebooks = [
  {
    id: 1,
    title: "Odisha Judiciary Services",
    image: "/odisha-judiciary.jpg",
  },
  {
    id: 2,
    title: "Cybersecurity Laws and Regulations",
    image: "/cybersecurity.jpg",
  },
  {
    id: 3,
    title: "Journey from Advocacy to Judiciary",
    image: "/journey.jpg",
  },
  {
    id: 4,
    title: "Indian Judiciary",
    image: "/indian-judiciary.jpg",
  },
  {
    id: 5,
    title: "CLAT Preparation",
    image: "/clat.jpg",
  },
  {
    id: 6,
    title: "Delhi Judicial Services Exam",
    image: "/delhi-judicial.jpg",
  },
];

const EbooksSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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

  return (
    <Container maxW="7xl" py={10}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h2" size="xl" color="goldenrod">
          Ebooks
        </Heading>
        <Link color="goldenrod" fontWeight="bold">
          View All
        </Link>
      </Flex>

      <Slider {...settings}>
        {ebooks.map((ebook) => (
          <VStack key={ebook.id} spacing={4} p={2} textAlign="center">
            <Box
              borderRadius="md"
              overflow="hidden"
              boxShadow="md"
              _hover={{ shadow: "lg" }}
            >
              <Image src={ebook.image} alt={ebook.title} w="100%" />
            </Box>
            <Text>{ebook.title}</Text>
          </VStack>
        ))}
      </Slider>
    </Container>
  );
};

export default EbooksSlider;
