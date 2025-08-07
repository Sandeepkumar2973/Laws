import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  VStack,
  Container,
} from "@chakra-ui/react";
import draftimage from "../../Assets/lawsImage/draft.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import * as mod from "../../../url";

export default function DraftsGrid() {
  const [allDrafts, setAllDrafts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // <-- New state

  // Fetch drafts from API
  const fetchAllDrafts = async () => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/draft/get_active_drafts`
      );
      setAllDrafts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching drafts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDrafts();
  }, []);

  // Filter drafts by title
  const filteredDrafts = allDrafts.filter((draft) =>
    draft.subTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxW="7xl" py={12}>
      {/* Search Bar */}
      <InputGroup size="lg" mb={8}>
        <Input
          placeholder="Search drafts by name"
          borderRadius="md"
          borderColor="gray.300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <InputRightElement width="5rem">
          <Button h="100%" colorScheme="blue" borderRadius="md">
            Search
          </Button>
        </InputRightElement>
      </InputGroup>

      {/* Drafts Cards */}
      {/* Drafts Cards */}
      {filteredDrafts.length === 0 ? (
        <Box textAlign="center" py={20}>
          <Text fontSize="xl" color="gray.500">
            No drafts found matching your search.
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          {filteredDrafts.map((d, i) => (
            <Box
              key={i}
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
              as={Link}
              to={`/drafts/${d.slug}`}
              p={4}
              boxShadow="md"
            >
              <VStack
                spacing={4}
                color="white"
                _hover={{
                  textDecoration: "none",
                  cursor: "pointer",
                  backgroundColor: "gray.50",
                }}
              >
                <Image
                  src={draftimage}
                  alt="Draft"
                  boxSize="80px"
                  objectFit="contain"
                />
                <Box
                  bg="blue.500"
                  color="white"
                  p={3}
                  textAlign="center"
                  borderRadius="md"
                  fontWeight="semibold"
                  fontSize="sm"
                  lineHeight="short"
                >
                  <Text noOfLines={3}>{d.title.toUpperCase()}</Text>
                </Box>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
