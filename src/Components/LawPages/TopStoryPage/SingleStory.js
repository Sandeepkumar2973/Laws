import {
  Box,
  Image,
  Text,
  Heading,
  VStack,
  HStack,
  Link as ChakraLink,
  Container,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";

const stories = [
  {
    id: 1,
    title: "Supreme Court Issues Notice to Madhya Pradesh Govt",
    author: "Garima Rajput",
    date: "28-Jun-25",
    description:
      "The Supreme Court of India has issued a notice to the Madhya Pradesh government seeking its response regarding the non-implementation of the promised 27% reservation for Other Backward Classes (OBCs) in public employment and education. The move comes amid increasing pressure from opposition parties and civil rights groups who allege deliberate delay and political indifferenceA bench comprising Justices Suryakant and B.V. Nagarathna issued the notice in response to a Public Interest Litigation (PIL) challenging the prolonged inaction by the state. The court asked the government to explain the legal and administrative reasons for not enforcing the policy, despite its approval in principle and sustained public demand The Congress party has taken a firm stand on the issue, accusing the state of failing its constitutional duty. Senior Congress leader Kamal Nath stated, “This delay is nothing short of social injustice. The backward communities of Madhya Pradesh deserve equal representation, and the government must act immediately.The petitioners argued that the 27% OBC reservation was announced in 2019 and even notified in part, but implementation remains patchy and inconsistent, especially in state-level recruitments and higher education admissions.Legal experts believe the case could have wider implications on reservation jurisprudence, especially if the court presses for timely implementation and mechanisms of accountability.The case has been posted for further hearing in August, with the Madhya Pradesh government directed to file a detailed affidavit.",
    image: "/images/blog1.jpg",
  },
  {
    id: 2,
    title: "Chief Justice Sanjiv Gavai Initiates Judicial Reforms",
    author: "Garima Rajput",
    date: "27-Jun-25",
    description:
      "Chief Justice Sanjiv Gavai has launched a series of reforms aimed at increasing transparency and...",
    image: "/images/blog2.jpg",
  },
  {
    id: 3,
    title: "Another Important Judicial Story",
    author: "Garima Rajput",
    date: "26-Jun-25",
    description: "New legal development affecting the judiciary...",
    image: "/images/blog1.jpg",
  },
  {
    id: 4,
    title: "Legal Changes in 2025",
    author: "Garima Rajput",
    date: "25-Jun-25",
    description: "Overview of upcoming legal changes in 2025...",
    image: "/images/blog2.jpg",
  },
  {
    id: 3,
    title: "Another Important Judicial Story",
    author: "Garima Rajput",
    date: "26-Jun-25",
    description: "New legal development affecting the judiciary...",
    image: "/images/blog1.jpg",
  },
  {
    id: 4,
    title: "Legal Changes in 2025",
    author: "Garima Rajput",
    date: "25-Jun-25",
    description: "Overview of upcoming legal changes in 2025...",
    image: "/images/blog2.jpg",
  },
  {
    id: 3,
    title: "Another Important Judicial Story",
    author: "Garima Rajput",
    date: "26-Jun-25",
    description: "New legal development affecting the judiciary...",
    image: "/images/blog1.jpg",
  },
  {
    id: 4,
    title: "Legal Changes in 2025",
    author: "Garima Rajput",
    date: "25-Jun-25",
    description: "Overview of upcoming legal changes in 2025...",
    image: "/images/blog2.jpg",
  },
];

export default function SingleStory() {
  const { id } = useParams();
  const story = stories.find((s) => s.id === Number(id));
  const latestStories = stories.filter((s) => s.id !== Number(id)).slice(0, 5);

  if (!story) return <Text>Story not found</Text>;

  return (
    <>
      <Header />
      <Container maxW="7xl" py={8}>
        <HStack
          align="start"
          spacing={8}
          flexDir={{ base: "column", md: "row" }}
        >
          {/* Left Side */}
          <Box flex="3" align="start" p={4} m={4}>
            <Image src={story.image} alt={story.title} mb={4} />
            <Heading mb={2}>{story.title}</Heading>
            <Text color="gray.500" mb={4}>
              {story.author} • {story.date}
            </Text>
            <Text>{story.description} (Full content here...)</Text>
            <Text>
              Lorem ipsum dolor sit amet... (add enough dummy content so page is
              scrollable)
            </Text>
          </Box>

          {/* Right Side Sticky Latest */}
          <Box
            flex="1"
            position="sticky"
            top="100px"
            align="start"
            border="1px solid #e2e8f0"
            borderRadius="md"
            p={4}
            maxW="500px"
            minH="500px"
          >
            <Heading size="md" mb={4}>
              Latest Stories
            </Heading>
            <VStack align="start" spacing={4}>
              {latestStories.map((s) => (
                <HStack key={s.id} spacing={3} align="start">
                  <Image
                    src={s.image}
                    alt={s.title}
                    boxSize="60px"
                    objectFit="cover"
                  />
                  <ChakraLink
                    as={Link}
                    to={`/stories/${s.id}`}
                    fontWeight="bold"
                  >
                    {s.title}
                  </ChakraLink>
                </HStack>
              ))}
            </VStack>
          </Box>
        </HStack>
      </Container>
      <Footer />
    </>
  );
}
