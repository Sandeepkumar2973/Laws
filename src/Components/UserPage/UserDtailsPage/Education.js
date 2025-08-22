import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Stack,
  Input,
  useToast,
  Spinner,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import axios from "axios";
import * as mod from "../../../url";
import { CiEdit } from "react-icons/ci";

import { MdOutlineDeleteOutline } from "react-icons/md";
import useUser from "../../hooks/useUser";
const data = JSON.parse(localStorage.getItem("lawvsuserinfo"));
const token = data?.data?.token;
const userId = data?.data?.userData?._id;
// console.log(data, "userId");
export const Education = () => {

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    degree: "",
    degreeType: "",
    specialization: "",
    university: "",
    startYear: "",
    endYear: "",
    ongoing: false,
    grade: "",
  });
  const toast = useToast();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const { user, setUser, loading, setLoading } = useUser(userId, token);

  const handleOpenUpdate = (edu, index) => {
    setFormData(edu); // prefill form
    setEditIndex(index);
    setIsUpdateOpen(true);
  };

  // fetch user ddetails
  const fetchEducation = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/user/get-user-byId/${userId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setUser(data?.data);
      //   console.log(user, "josjdddddddd");
    } catch (err) {
      console.error("Error fetching user:", err.response?.data || err);
      toast({
        title: "Error loading education",
        description:
          err.response?.data?.message || "Could not fetch education details",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEducation();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit education form
  const handleSubmitEducation = async () => {
    //  Validate required fields
    const {
      degree,
      degreeType,
      specialization,
      university,
      startYear,
      endYear,
      grade,
    } = formData;

    if (
      !degree ||
      !degreeType ||
      !specialization ||
      !university ||
      !startYear ||
      (!formData.ongoing && !endYear) ||
      !grade
    ) {
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
        `${mod.api_url}/api/v1/user/${userId}/add-education`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      toast({
        title: "Education added successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      // Update local user state
      setUser((prev) => ({
        ...prev,
        education: [...(prev?.education || []), formData],
      }));

      // Reset form
      setFormData({
        degree: "",
        degreeType: "",
        specialization: "",
        university: "",
        startYear: "",
        endYear: "",
        ongoing: false,
        grade: "",
      });
      setShowForm(false);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateEducation = async () => {
    try {
      // 🔹 call your update API
      const res = await axios.put(
        `${mod.api_url}/api/v1/user/${userId}/update-education/${formData._id}`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      // For now, just update state locally:
      setUser((prev) => {
        const updatedEducation = [...(prev?.education || [])];
        updatedEducation[editIndex] = formData;
        return { ...prev, education: updatedEducation };
      });

      toast({
        title: "Education updated successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      setIsUpdateOpen(false);
      setFormData({
        degree: "",
        degreeType: "",
        specialization: "",
        university: "",
        startYear: "",
        endYear: "",
        ongoing: false,
        grade: "",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // delete education
  const handleDelete = async (edu, index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete ?");
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(
        `${mod.api_url}/api/v1/user/${userId}/delete-education/${edu._id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setUser((prev) => ({
        ...prev,
        education: response.data.data, // updated education list from backend
      }));

      toast({
        title: "Education removed successfully!",
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
    <Box
      p={1}
      boxShadow="md"
      border="2px solid blue"
      borderRadius={5}
      backgroundColor="white.500"
    >
      <Flex justifyContent="space-between" mb={2}>
        <Heading size="m" textAlign={"left"} color="blue">
          Education
        </Heading>
        <Button colorScheme="teal" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Education"}
        </Button>
      </Flex>

      {/* Form Section */}
      {showForm && (
        <Box p={4} borderWidth="1px" borderRadius="md" mb={4} bg="gray.50">
          <Stack spacing={3}>
            <Input
              name="degree"
              placeholder="Degree"
              value={formData.degree}
              onChange={handleChange}
              required
            />
            <Select
              name="degreeType"
              placeholder="Select Degree Type"
              value={formData.degreeType}
              onChange={handleChange}
              required
            >
              <option value="regular">Regular</option>
              <option value="private">Private</option>
            </Select>

            <Input
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            />
            <Input
              name="university"
              placeholder="University Name"
              value={formData.university}
              onChange={handleChange}
              required
            />
            <Input
              name="startYear"
              type="number"
              placeholder="Start Year"
              value={formData.startYear}
              onChange={handleChange}
            />
            <Input
              name="endYear"
              type="number"
              placeholder="End Year"
              value={formData.endYear}
              onChange={handleChange}
              isDisabled={formData.ongoing}
            />
            <Flex gap={2} align="center">
              <input
                type="checkbox"
                name="ongoing"
                checked={formData.ongoing}
                onChange={handleChange}
              />
              <Text>Ongoing</Text>
            </Flex>
            <Input
              name="grade"
              placeholder="Grade / CGPA"
              value={formData.grade}
              onChange={handleChange}
            />
            <Button colorScheme="blue" onClick={handleSubmitEducation}>
              Submit
            </Button>
          </Stack>
        </Box>
      )}

      {/* List of Education */}
      {loading ? (
        <Flex justify="center" py={4}>
          <Spinner size="lg" />
        </Flex>
      ) : (
        <Box borderWidth="1px" borderRadius="md" overflowX="auto">
          {user?.education?.length > 0 ? (
            <Table variant="striped" colorScheme="gray" size="sm">
              <Thead bg="gray.100">
                <Tr backgroundColor="blue.200">
                  <Th fontWeight="1000" fontSize="15">
                    Degree
                  </Th>
                  <Th fontWeight="1000" fontSize="15">
                    Type
                  </Th>
                  <Th fontWeight="1000" fontSize="15">
                    Specialization
                  </Th>
                  <Th fontWeight="1000" fontSize="15">
                    University
                  </Th>
                  <Th fontWeight="1000" fontSize="15">
                    Duration
                  </Th>
                  <Th fontWeight="1000" fontSize="15">
                    Grade
                  </Th>
                  <Th fontWeight="1000" fontSize="15" textAlign="center">
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {user.education.map((edu, i) => (
                  <Tr key={edu._id || i}>
                    <Td fontWeight="bold">{edu?.degree}</Td>
                    <Td>{edu?.degreeType}</Td>
                    <Td>{edu?.specialization}</Td>
                    <Td>{edu?.university}</Td>
                    <Td>
                      {edu?.startYear} -{" "}
                      {edu?.ongoing ? "Present" : edu?.endYear}
                    </Td>
                    <Td>{edu?.grade}</Td>
                    <Td>
                      <Flex gap={2} justify="center">
                        <Button
                          size="sm"
                          colorScheme="blue"
                          onClick={() => handleOpenUpdate(edu, i)}
                        >
                          <CiEdit />
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDelete(edu, i)}
                        >
                          <MdOutlineDeleteOutline />
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text p={4}>No education details added yet.</Text>
          )}
        </Box>
      )}

      {/* Update Modal */}
      <Modal isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Education</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Input
                name="degree"
                placeholder="Degree"
                value={formData.degree}
                onChange={handleChange}
              />
              <Select
                name="degreeType"
                value={formData.degreeType}
                onChange={handleChange}
              >
                <option value="regular">Regular</option>
                <option value="private">Private</option>
              </Select>
              <Input
                name="specialization"
                placeholder="Specialization"
                value={formData.specialization}
                onChange={handleChange}
              />
              <Input
                name="university"
                placeholder="University Name"
                value={formData.university}
                onChange={handleChange}
              />
              <Input
                name="startYear"
                type="number"
                placeholder="Start Year"
                value={formData.startYear}
                onChange={handleChange}
              />
              <Input
                name="endYear"
                type="number"
                placeholder="End Year"
                value={formData.endYear}
                onChange={handleChange}
                isDisabled={formData.ongoing}
              />
              <Flex gap={2} align="center">
                <input
                  type="checkbox"
                  name="ongoing"
                  checked={formData.ongoing}
                  onChange={handleChange}
                />
                <Text>Ongoing</Text>
              </Flex>
              <Input
                name="grade"
                placeholder="Grade / CGPA"
                value={formData.grade}
                onChange={handleChange}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateEducation}>
              Update
            </Button>
            <Button variant="ghost" onClick={() => setIsUpdateOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
