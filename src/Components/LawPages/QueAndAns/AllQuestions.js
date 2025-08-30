import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Button,
  VStack,
  Text,
  Divider,
  Flex,
  List,
  ListItem,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { SearchBox } from "./SearchBox";
import { BiSolidLike } from "react-icons/bi";
import { IoIosShareAlt } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import AddQuestionPage from "./AddQue";
import axios from "axios";
import * as mod from "../../../url";
import Header from "../../Navbar/Header";
import { MdInsertComment } from "react-icons/md";
const userInfo = JSON.parse(localStorage.getItem("lawvsuserinfo"));

export const QAndA = () => {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({}); // store answers by question id
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const userId = userInfo?.data?.userData._id;
  const userType = userInfo?.data?.userData.role;
  console.log(filteredQuestions, "filteredQuestions");

  const handleSubmitComment = async (Qid, AnsId) => {
    if (!userId) {
      toast({
        title: "Please login",
        description: "You need to login before applying for a job.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      await axios.post(
        `${mod.api_url}/api/v1/question/questions/${Qid}/answers/${AnsId}/comments`,
        {
          text: comment,
          userId,
          userType,
        }
      );
      toast({
        title: "Comment submitted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setComment("");
      setShowCommentBox(false);
    } catch (error) {
      toast({
        title: "Failed to submit comment",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch categories
        const { data: categoryData } = await axios.get(
          `${mod.api_url}/api/v1/category/get_all_category`
        );
        setCategories(categoryData);

        // Fetch questions
        const { data: questionData } = await axios.get(
          `${mod.api_url}/api/v1/question/get_all_questions`
        );

        // console.log(questionData, "questionData");
        const mappedData = questionData.map((item) => ({
          id: item._id,
          question: item.que,
          slug: item.slug,
          postedBy: item.postedBy?.id?.fullName || "Unknown",
          answers: item.answers || [], // <-- add this
          answerCount: item.answers?.length || 0,
          category:
            categoryData.find((cat) => cat._id === item.category)?.name ||
            "Unknown",
        }));

        setQuestions(mappedData);
        setFilteredQuestions(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Filter by category
  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setFilteredQuestions(
      questions.filter((q) => q.category.toLowerCase() === cat.toLowerCase())
    );
  };

  // Submit your answer
  const handleSubmit = async (id) => {
    if (!userId) {
      toast({
        title: "Please login",
        description: "You need to login before applying for a job.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${mod.api_url}/api/v1/question/add/${id}/answers`, {
        text: answers[id],
        userId,
        userType,
      });

      toast({
        title: "Answer submitted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setAnswers((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      toast({
        title: "Failed to submit answer",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <>
      <Header />
      <Container maxW="7xl" py={10}>
        <Flex gap={6} textAlign="center" justifyContent={"center"}>
          <Heading mb={6}>Questions & Answers</Heading>
          <Heading size="md" mb={4} color="goldenrod">
            <AddQuestionPage />
          </Heading>
        </Flex>
        <Flex gap={6}>
          {/* LEFT COLUMN - Categories */}
          <Box>
            <Heading size="md" mb={4} color="goldenrod"></Heading>
            <List spacing={3}>
              {categories &&
                categories.map((cat, idx) => (
                  <ListItem
                    key={idx}
                    p={2}
                    borderRadius="md"
                    cursor="pointer"
                    bg={selectedCategory === cat.name ? "goldenrod" : "gray.50"}
                    color={selectedCategory === cat.name ? "white" : "black"}
                    _hover={{ bg: "goldenrod", color: "white" }}
                    onClick={() => handleCategoryClick(cat.slug)}
                  >
                    {cat.name}
                  </ListItem>
                ))}
            </List>
          </Box>

          {/* RIGHT COLUMN - Q&A */}
          <Box
            flex="1"
            w={{ base: "30%", md: "25%" }}
            p={4}
            borderWidth="1px"
            borderRadius="md"
          >
            <SearchBox
              questions={questions}
              setFilteredQuestions={setFilteredQuestions}
            />

            <VStack align="stretch" spacing={6}>
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((q) => (
                  <Box
                    key={q.id}
                    // cursor="pointer"
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    bg="white"
                    boxShadow="sm"
                    _hover={{ boxShadow: "md", transform: "scale(1.01)" }}
                    borderLeft="4px solid goldenrod"
                  >
                    <Text
                      fontWeight="bold"
                      mb={2}
                      align="left"
                      color="#762d00"
                      noOfLines={2}
                      onClick={() => navigate(`/question/${q.id}`)}
                    >
                      {q.question}
                    </Text>
                    <Text fontSize="sm" color="gray.600" mb={2} align="left">
                      Posted by {q.postedBy}
                    </Text>
                    <Heading
                      as="h4"
                      size="sm"
                      mb={2}
                      color="goldenrod"
                      align="left"
                    >
                      Answer
                    </Heading>
                    {/* answers start here........ */}
                    {Array.isArray(q?.answers) && q?.answers?.length > 0 ? (
                      q?.answers.map((answer, i) => (
                        <>
                          <Text
                            key={i}
                            fontSize="sm"
                            color="gray.700"
                            mb={1}
                            pl={2}
                            borderLeft="4px solid #762d00"
                            bg={i % 2 === 0 ? "gray.50" : "white"}
                            borderRadius="md"
                            p={2}
                            textAlign="justify"
                          >
                            {answer?.text}
                          </Text>
                          <Divider my={2} />
                          <Flex
                            flexWrap="wrap"
                            columnGap={5}
                            rowGap={3}
                            alignItems="center"
                          >
                            <Text
                              fontSize="sm"
                              color="gray.500"
                              display="flex"
                              alignItems="center"
                              gap={1}
                            >
                              likes <BiSolidLike />
                            </Text>

                            <Text
                              fontSize="sm"
                              color="gray.500"
                              display="flex"
                              alignItems="center"
                              gap={1}
                            >
                              share <IoIosShareAlt />
                            </Text>

                            <Box
                              flex={{ base: "1 1 100%", md: "0 1 60%" }}
                              maxW={{ md: "600px" }}
                              mx={{ base: 0, md: "auto" }}
                              px={4}
                              py={2}
                            >
                              <Text
                                fontSize={{ base: "sm", md: "md" }}
                                color="gray.500"
                                display="flex"
                                alignItems="center"
                                gap={1}
                                cursor="pointer"
                                onClick={() =>
                                  setShowCommentBox(!showCommentBox)
                                }
                                userSelect="none"
                              >
                                comments <MdInsertComment />
                              </Text>

                              {showCommentBox && (
                                <Flex
                                  mt={2}
                                  gap={2}
                                  flexDirection={{ base: "column", sm: "row" }}
                                  alignItems={{ base: "stretch", sm: "center" }}
                                >
                                  <Textarea
                                    placeholder="Write your comment..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    size="sm"
                                    resize="vertical"
                                    borderColor="gray.300"
                                    width={{
                                      base: "100%",
                                      sm: "auto",
                                      md: "100%",
                                    }}
                                    flex={1}
                                  />
                                  <Button
                                    colorScheme="blue"
                                    size="sm"
                                    onClick={() =>
                                      handleSubmitComment(q.id, answer._id)
                                    }
                                    alignSelf={{
                                      base: "stretch",
                                      sm: "flex-start",
                                    }}
                                    minW={{ base: "100%", sm: "auto" }}
                                  >
                                    Submit
                                  </Button>
                                </Flex>
                              )}
                            </Box>

                            <Text
                              fontSize="sm"
                              color="gray.500"
                              textAlign="right"
                              flex={{ base: "1 1 100%", md: "0 1 auto" }}
                              ml={{ base: 0, md: "auto" }}
                            >
                              Please login to submit an answer.
                            </Text>
                          </Flex>
                        </>
                      ))
                    ) : (
                      <Text
                        fontSize="sm"
                        color="gray.500"
                        fontStyle="italic"
                        mb={2}
                      >
                        No answers yet.
                      </Text>
                    )}
                    {/* Answer input */}
                    <Box
                      margin="0px"
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                    >
                      <Textarea
                        placeholder="Submit your answer"
                        value={answers[q.id] || ""}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [q.id]: e.target.value,
                          }))
                        }
                      />
                      <Button
                        mt={1}
                        colorScheme="yellow"
                        onClick={() => handleSubmit(q.id)}
                        isLoading={loading}
                      >
                        Submit Answer
                      </Button>
                    </Box>
                  </Box>
                ))
              ) : (
                <Text>No questions found.</Text>
              )}
            </VStack>
          </Box>
        </Flex>
      </Container>
    </>
  );
};
