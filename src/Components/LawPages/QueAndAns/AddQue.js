import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Textarea,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useToast,
  Divider,
  Select,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import * as mod from "../../../url";
import { useRef } from "react";
const userInfo = JSON.parse(localStorage.getItem("lawvsuserinfo"));
// const token = userInfo?.token;

const AddQuestionPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const userId = userInfo.data.userData._id;
  const userType = userInfo.data.userData.role;

  // add quetions
  const handleSubmit = async () => {
    try {
      await axios.post(`${mod.api_url}/api/v1/question/create_questions`, {
        category,
        question,
        userId,
        userType,
      });
      toast({
        title: "Question added successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setCategory("");
      setQuestion("");
      onClose();
    } catch (error) {
      toast({
        title: "Error adding question",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  // get all categories
  const getAllCategory = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/category/get_all_category`
      );
      setAllCategory(data);
    } catch (error) {
      console.error("Error getting data", error.response);
      toast({
        title: "Getting failed",
        description: "Something went wrong while getting the category.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // ? this mark show in input box
  const handleChange = (e) => {
    let val = e.target.value;
    if (val.trim() !== " " && !val.endsWith("?")) {
      val += "?";
    }
    setQuestion(val);
    requestAnimationFrame(() => {
      if (textareaRef.current && val.endsWith("?")) {
        const pos = val.length - 1;
        textareaRef.current.setSelectionRange(pos, pos);
      }
    });
  };

  return (
    <Box p={5}>
      <Button colorScheme="teal" onClick={onOpen}>
        Add Question
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select your question type"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {allCategory?.map((item, index) => (
                  <option key={index} value={item._id || item}>
                    {item.name || item}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Question</FormLabel>
              <Textarea
                ref={textareaRef}
                placeholder="Write your question"
                value={question}
                onChange={handleChange}
              />
            </FormControl>

            <Divider my={2} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={handleSubmit}
              isLoading={loading}
            >
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddQuestionPage;
