import React, { useState } from "react";
import {
  Box,
  Heading,
  Button,
  Flex,
  Tag,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import * as mod from "../../../url";
import axios from "axios";
import { useEffect } from "react";
import useUser from "../../hooks/useUser";
const data = JSON.parse(localStorage.getItem("lawvsuserinfo"));
const token = data?.data?.token;
const userId = data?.data?.userData?._id;
export const Skills = () => {
  const { user, setUser, loading, setLoading } = useUser(userId, token);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [skill, setSkill] = useState("");
  const [proficiency, setProficiency] = useState("Beginner");
  const toast = useToast();

  const handleSubmit = async () => {
    if (!skill || !proficiency) {
      toast({
        title: "All fields are required",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      const response = await axios.put(
        `${mod.api_url}/api/v1/user/${userId}/add-skill`,
        {
          skill,
          proficiency,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      toast({
        title: "Skill added successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      // Update local user state
      setUser((prev) => ({
        ...prev,
        skill: [...(prev?.skill || []), { skill, proficiency }],
      }));

      // Reset form
      setSkill("");
      setProficiency("Beginner");
      onClose();
    } catch (error) {
      toast({
        title: "Failed to add skill",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  // delete skill
  const handleDelete = async (sId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete ?");
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(
        `${mod.api_url}/api/v1/user/${userId}/delete-skill/${sId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setUser((prev) => ({
        ...prev,
        skill: response.data.data, // updated skill list from backend
      }));

      toast({
        title: "Skill removed successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Box
        p={1}
        boxShadow="md"
        border="2px solid blue"
        borderRadius={5}
        backgroundColor="white.500"
      >
        <Flex justifyContent="space-between" mb={2}>
          <Heading size="m" textAlign="left" color={"blue"}>
            Skill
          </Heading>
          <Button colorScheme="teal" onClick={onOpen}>
            Add Skill
          </Button>
        </Flex>

        {/* Skill list */}
        <Flex gap={3} wrap="wrap">
          {user?.skills?.map((s, i) => (
            <Tag
              key={i}
              size="lg"
              variant="solid"
              colorScheme="gray"
              borderRadius="full"
              p={2}
            >
              {s?.skill} - {s?.proficiency}
              <Button
                ml={2}
                size="xs"
                colorScheme="red"
                onClick={() => handleDelete(s?._id)}
              >
                ✕
              </Button>
            </Tag>
          ))}
        </Flex>
      </Box>

      {/* Modal for Add Skill */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Skill</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Skill</FormLabel>
              <Input
                placeholder="Enter skill"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Proficiency</FormLabel>
              <Select
                value={proficiency}
                onChange={(e) => setProficiency(e.target.value)}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Expert</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
