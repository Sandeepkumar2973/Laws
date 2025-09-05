import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Spinner,
  Button,
  Textarea,
  IconButton,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { BiSolidLike } from "react-icons/bi";
import { MdInsertComment, MdShare } from "react-icons/md";
import axios from "axios";
import * as mod from "../../../url.js";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../../Navbar/Header.js";
import Footer from "../../Navbar/Footer.js";
import { GiImbricatedArrows } from "react-icons/gi";
export default function SingleQnAPage() {
  const [mainQuestion, setMainQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCommentBox, setActiveCommentBox] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [category, setCategory] = useState([]);
  const { slug } = useParams();
  const toast = useToast();
  const userInfo = JSON.parse(localStorage.getItem("lawvsuserinfo"));
  const userId = userInfo?.data?.userData._id;
  const userType = userInfo?.data?.userData.role;
  const navigate = useNavigate();
  // console.log("answers", answers);
  // console.log("mainQuestion", mainQuestion);\

  const fetchDatasingleQue = async () => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/question/questions/${slug}`
      );
      setMainQuestion(data);
      setAnswers(data?.answers || []);
      setCategory(data?.category || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching QnA data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatasingleQue();
  }, [slug]);
  // Handle Comment Submit
  const handleSubmitComment = async (Qid, AnsId) => {
    if (!userId) {
      toast({
        title: "Please login",
        description: "You need to login for any comments.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!commentText.trim()) return; // Empty comment avoid

    try {
      await axios.post(
        `${mod.api_url}/api/v1/question/questions/${Qid}/answers/${AnsId}/comments`,
        {
          text: commentText,
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
      setCommentText(""); // ✅ clear input
      setActiveCommentBox(null); // ✅ close box (optional)
      fetchDatasingleQue(); // ✅ refresh
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

  // Handle Share
  const handleShare = () => {
    const url = `${window.location.origin}/q-and-a/${slug}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied to clipboard!",
      status: "info",
      duration: 1500,
      isClosable: true,
    });
  };
  // console.log("relatedQuestions", relatedQuestions);
  // related questions
  const fetchRelatedQuestions = async (category, excludeId) => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/question/questions/${category}/${excludeId}`
      );
      setRelatedQuestions(data);
    } catch (err) {
      console.error("Error fetching related questions:", err);
    }
  };

  useEffect(() => {
    if (mainQuestion?.category && mainQuestion?._id) {
      fetchRelatedQuestions(mainQuestion.category, mainQuestion._id);
    }
  }, [mainQuestion?.category, mainQuestion?._id]);

  // if current user is inclued in answers likes array then he already liked
  const alreadyLiked = answers?.some((ans) =>
    ans.likes?.some((l) => l.id === userId)
  );
  // console.log("alreadyLiked", alreadyLiked);
  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <>
      <Header />
      <Flex p={6} gap={6} align="start" minH={"80vh"}>
        {/* Left Column - Main Q&A */}
        <Box flex="3">
          <Heading mb={2}>{mainQuestion?.title}</Heading>
          <Text
            fontSize="lg"
            color="blue.600"
            backgroundColor={"blue.50"}
            p={3}
            mb={2}
            textAlign="justify"
            rounded="md"
            fontWeight={"bold"}
          >
            Q. {mainQuestion?.que || "Unknown"}
            <Text fontSize="sm" color="gray.600" mb={1} textAlign={"right"}>
              Posted by {mainQuestion?.postedBy?.id?.fullName || "Unknown"}
            </Text>
          </Text>

          <Text fontSize="sm" color="gray.500" mb={4}>
            {mainQuestion?.tags?.join(" • ")}
          </Text>

          <VStack align="stretch" spacing={6}>
            {answers.map((ans) => {
              const alreadyLiked = ans.likes?.some((l) => l.id === userId);

              return (
                <Box key={ans._id} p={4} borderWidth="1px" rounded="lg">
                  <Text
                    fontWeight="bold"
                    mb={2}
                    textAlign="left"
                    flex={1}
                    display={"flex"}
                  >
                    <GiImbricatedArrows /> &nbsp;
                    {/* Answered by{" "} */} By.
                    <b>{ans?.postedBy?.id?.fullName}</b>
                  </Text>

                  <Text mb={3} textAlign="justify" p={3}>
                    {/* <GiImbricatedArrows /> */}
                    {ans?.text}
                  </Text>

                  {/* Like */}
                  <Flex gap={4} align="center" justifyContent="flex-end">
                    <Text
                      as="span"
                      fontSize="sm"
                      display="flex"
                      alignItems="center"
                      gap={1}
                      cursor="pointer"
                      color={alreadyLiked ? "blue.500" : "gray.600"}
                    >
                      {ans.likes?.length || 0} <BiSolidLike />
                    </Text>

                    {/* Comment */}
                    <Text
                      as="span"
                      fontSize="sm"
                      display="flex"
                      alignItems="center"
                      gap={1}
                      cursor="pointer"
                      onClick={() =>
                        setActiveCommentBox(
                          activeCommentBox === ans._id ? null : ans._id
                        )
                      }
                    >
                      {ans.comments?.length || 0} <MdInsertComment />
                    </Text>

                    {/* Share */}
                    <IconButton
                      aria-label="Share"
                      size="sm"
                      icon={<MdShare />}
                      onClick={() => handleShare(ans._id)}
                    />
                  </Flex>

                  {/* Comment Box */}
                  <Divider my={4} />
                  {activeCommentBox === ans._id && (
                    <Box mt={3}>
                      <VStack align="stretch" spacing={2}>
                        <Text backgroundColor="blue.200" p={2}>
                          Users Comments
                          {ans.comments?.length
                            ? ` (${ans?.comments?.length})`
                            : ""}
                        </Text>
                        {ans.comments?.map((c) => {
                          const isCurrentUser = c?.postedBy?.id?._id === userId;
                          return (
                            <Flex
                              key={c._id}
                              justify={
                                isCurrentUser ? "flex-end" : "flex-start"
                              }
                            >
                              <Box
                                maxW="70%"
                                p={2}
                                borderRadius="lg"
                                bg={isCurrentUser ? "blue.400" : "gray.200"}
                                color={isCurrentUser ? "white" : "black"}
                                textAlign={isCurrentUser ? "right" : "left"}
                                boxShadow="sm"
                                // w="50%"
                              >
                                {!isCurrentUser && (
                                  <Text
                                    fontSize="10px"
                                    fontWeight="bold"
                                    color="gray.600"
                                    mb={1}
                                  >
                                    {c?.postedBy?.id?.fullName || "Unknown"}
                                  </Text>
                                )}
                                <Text fontSize="sm" textAlign="justify">
                                  {c?.text}
                                </Text>
                                <Text
                                  fontSize="10px"
                                  color={
                                    isCurrentUser ? "gray.200" : "gray.600"
                                  }
                                >
                                  {new Date(c?.createdAt).toLocaleString()}
                                </Text>
                              </Box>
                            </Flex>
                          );
                        })}

                        {/* Comment input box */}
                        <Flex gap={2} mt={2}>
                          <Textarea
                            placeholder="Write a comment..."
                            size="sm"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                          />
                          <Button
                            size="sm"
                            colorScheme="blue"
                            onClick={() =>
                              handleSubmitComment(mainQuestion?._id, ans._id)
                            }
                          >
                            Send
                          </Button>
                        </Flex>
                      </VStack>
                    </Box>
                  )}
                </Box>
              );
            })}
          </VStack>
        </Box>

        {/* Right Column - Related Questions */}
        <Box
          flex="1"
          borderLeft="1px solid #ddd"
          pl={4}
          textAlign="justify"
          display={{ base: "none", md: "block" }} //  mobile me hide, md+ pe show
          w={{ md: "20%" }}
        >
          <Heading size="md" mb={3} color={"rgba(241, 130, 3, 0.78)"}>
            Related questions
          </Heading>
          <VStack align="start" spacing={3}>
            {relatedQuestions?.map((q) => (
              <Box key={q._id}>
                <Text
                  color="blue.500"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => navigate(`/q-and-a/${q.slug}`)}
                >
                  {q.que}
                  <Text fontSize="sm" color="gray.300" textAlign={"right"}>
                    Posted by: {q.postedBy?.id?.fullName}
                  </Text>
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>
      </Flex>
      <Footer />
    </>
  );
}
