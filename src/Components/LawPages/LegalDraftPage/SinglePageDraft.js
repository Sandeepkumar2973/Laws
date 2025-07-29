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
import draftimage from "../../Assets/lawsImage/draft.jpg"; // Adjust the path as necessary

const drafts = [
  {
    id: 1,
    title:
      "Petition for Dissolution of Marriage by a Decree of Divorce Amended by the Mar...",
    des: "This draft is a petition for the dissolution of marriage by a decree of divorce, amended by the Marriage Laws (Amendment) Act, 2019. It includes details about the parties involved, grounds for divorce, and other relevant information.",
    image: draftimage,
  },
  {
    id: 2,
    title: "Suit for Permanent Injunction",
    des: "This draft is a suit for a permanent injunction to restrain the defendant from committing a particular act.",
    image: draftimage,
  },
  {
    id: 3,
    title: "Revision Petition under Section 25-B (1) of DRC Act",
    des: "This draft is a revision petition under Section 25-B (1) of the DRC Act challenging the eviction order passed by the lower court.",
    image: draftimage,
  },
  {
    id: 4,
    title: "Maintenance for Wife under Section 125 of CrPC",
    des: "This draft is a petition for maintenance for the wife under Section 125 of the Criminal Procedure Code, seeking financial support from the husband.",
    image: draftimage,
  },
  {
    id: 5,
    title: "Criminal Appellate Jurisdiction SLP 438",
    des: "This draft is a Special Leave Petition (SLP) under Section 438 of the Criminal Procedure Code, seeking anticipatory bail in a criminal case.",
    image: draftimage,
  },
  {
    id: 6,
    title:
      "Writ Petition under Article 226 of the Constitution of India to be filed before ...",
    des: "This draft is a writ petition under Article 226 of the Constitution of India, seeking a specific relief from the High Court.",
    image: draftimage,
  },
  {
    id: 7,
    title:
      "Petition for Dissolution of Marriage by a Decree of Divorce Amended by the Mar...",
    des: "This draft is a petition for the dissolution of marriage by a decree of divorce, amended by the Marriage Laws (Amendment) Act, 2019. It includes details about the parties involved, grounds for divorce, and other relevant information.",
    image: draftimage,
  },
  {
    id: 8,
    title: "Suit for Permanent Injunction",
    des: "This draft is a suit for a permanent injunction to restrain the defendant from committing a particular act.",
    image: draftimage,
  },
  {
    id: 9,
    title: "Revision Petition under Section 25-B (1) of DRC Act",
    des: "This draft is a revision petition under Section 25-B (1) of the DRC Act challenging the eviction order passed by the lower court.",
    image: draftimage,
  },
  {
    id: 10,
    title: "Maintenance for Wife under Section 125 of CrPC",
    des: "This draft is a petition for maintenance for the wife under Section 125 of the Criminal Procedure Code, seeking financial support from the husband.",
    image: draftimage,
  },
  {
    id: 11,
    title: "Criminal Appellate Jurisdiction SLP 438",
    des: "This draft is a Special Leave Petition (SLP) under Section 438 of the Criminal Procedure Code, seeking anticipatory bail in a criminal case.",
    image: draftimage,
  },
  {
    id: 12,
    title:
      "Writ Petition under Article 226 of the Constitution of India to be filed before ...",
    des: "This draft is a writ petition under Article 226 of the Constitution of India, seeking a specific relief from the High Court.",
    image: draftimage,
  },
];
export default function SingleDraft() {
  const { id } = useParams();
  const draft = drafts.find((d) => d.id === Number(id));
  const latestDrafts = drafts.filter((d) => d.id !== Number(id)).slice(0, 5);

  if (!draft) return <Text>Draft not found</Text>;

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
            {/* <Image src={draft.image} alt={draft.title} mb={4} /> */}
            <Heading mb={2}>{draft.title}</Heading>
            <Text color="gray.500" mb={4}>
              {drafts.author} • {drafts.date}
            </Text>
            <Text>{drafts.description} (Full content here...)</Text>
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
              {latestDrafts.map((d) => (
                <HStack key={d.id} spacing={3} align="start">
                  <Image
                    src={d.image}
                    alt={d.title}
                    boxSize="60px"
                    objectFit="cover"
                  />
                  <ChakraLink
                    as={Link}
                    to={`/drafts/${d.id}`}
                    fontWeight="bold"
                  >
                    {d.title}
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
