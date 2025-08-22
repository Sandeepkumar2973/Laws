import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Stack,
  Input,
  Textarea,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Spinner,
  Select,
} from "@chakra-ui/react";
import * as mod from "../../../url";
import axios from "axios";
import { useEffect } from "react";
import { CiEdit } from "react-icons/ci";

import { MdOutlineDeleteOutline } from "react-icons/md";
import useUser from "../../hooks/useUser";
const data = JSON.parse(localStorage.getItem("lawvsuserinfo"));
const token = data?.data?.token;
const userId = data?.data?.userData?._id;
export const Experience = () => {
  const [showForm, setShowForm] = useState(false);
  const toast = useToast();
  const [formData, setFormData] = useState({
    designation: "",
    companyName: "",
    employmentType: "",
    ctc: "",
    industry: "",
    domain: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    location: "",
    responsibilities: "",
  });
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const { user, setUser, loading, setLoading } = useUser(userId, token);

  const handleOpenUpdate = (edu, index) => {
    setFormData(edu); // prefill form
    setEditIndex(index);
    setIsUpdateOpen(true);
  };
  // fetch user details
  const fetchUserData = async () => {
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
      // console.log(user, "josjdddddddd");
    } catch (err) {
      console.error("Error fetching user:", err.response?.data || err);
      toast({
        title: "Error loading experience",
        description:
          err.response?.data?.message || "Could not fetch experience details",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    const {
      designation,
      companyName,
      employmentType,
      industry,
      domain,
      startDate,
      endDate,
      location,
      responsibilities,
    } = formData;

    if (
      !designation ||
      !companyName ||
      !employmentType ||
      !industry ||
      !domain ||
      !startDate ||
      !endDate ||
      !location ||
      !responsibilities
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
        `${mod.api_url}/api/v1/user/${userId}/add-experience`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      toast({
        title: "Experience added successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      // Update local user state
      setUser((prev) => ({
        ...prev,
        experience: [...(prev?.experience || []), formData],
      }));

      // Reset form
      setFormData({
        designation: "",
        companyName: "",
        employmentType: "",
        ctc: "",
        industry: "",
        domain: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        location: "",
        responsibilities: "",
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
        `${mod.api_url}/api/v1/user/${userId}/update-experience/${formData._id}`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      // For now, just update state locally:
      setUser((prev) => {
        const updatExperience = [...(prev?.experience || [])];
        updatExperience[editIndex] = formData;
        return { ...prev, experience: updatExperience };
      });

      toast({
        title: "Experience updated successfully!",
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
        `${mod.api_url}/api/v1/user/${userId}/delete-experience/${edu._id}`,
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
          Experience
        </Heading>
        <Button colorScheme="teal" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Experience"}
        </Button>
      </Flex>

      {/* Add Experience Form */}
      {showForm && (
        <Box p={4} borderWidth="1px" borderRadius="md" mb={4} bg="gray.50">
          <Stack spacing={3}>
            <Input
              name="designation"
              placeholder="Designation"
              value={formData?.designation}
              onChange={handleChange}
            />
            <Input
              name="companyName"
              placeholder="Company Name"
              value={formData?.companyName}
              onChange={handleChange}
            />
            <Input
              name="employmentType"
              placeholder="Employment Type (e.g. Full-time)"
              value={formData?.employmentType}
              onChange={handleChange}
            />
            <Input
              name="ctc"
              type="number"
              placeholder="CTC (in LPA)"
              value={formData?.ctc}
              onChange={handleChange}
            />
            <Input
              name="industry"
              placeholder="Industry"
              value={formData?.industry}
              onChange={handleChange}
            />
            <Input
              name="domain"
              placeholder="Domain"
              value={formData?.domain}
              onChange={handleChange}
            />
            <Input
              name="startDate"
              type="date"
              value={formData?.startDate}
              onChange={handleChange}
            />
            <Input
              name="endDate"
              type="date"
              value={formData?.endDate}
              onChange={handleChange}
              isDisabled={formData?.currentlyWorking}
            />
            <Flex gap={2} align="center">
              <input
                type="checkbox"
                name="currentlyWorking"
                checked={formData?.currentlyWorking}
                onChange={handleChange}
              />
              <Text>Currently Working</Text>
            </Flex>
            <Input
              name="location"
              placeholder="Location"
              value={formData?.location}
              onChange={handleChange}
            />
            <Textarea
              name="responsibilities"
              placeholder="Responsibilities"
              value={formData?.responsibilities}
              onChange={handleChange}
            />
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </Box>
      )}

      {/* Experience List */}
      {loading ? (
        <Flex justify="center" py={4}>
          <Spinner size="lg" />
        </Flex>
      ) : (
        <Box borderWidth="1px" borderRadius="md" overflowX="auto">
          {user?.experience?.length > 0 ? (
            <Table variant="striped" colorScheme="gray" size="sm">
              <Thead bg="gray.100">
                <Tr backgroundColor="blue.200">
                  <Th fontWeight="1000" fontSize="15">
                    companyName
                  </Th>
                  <Th fontWeight="1000" fontSize="15">
                    designation
                  </Th>
                  <Th fontWeight="1000" fontSize="15">
                    employmentType
                  </Th>
                  <Th fontWeight="1000" fontSize="15">
                    startDate
                  </Th>
                  <Th fontWeight="1000" fontSize="15">
                    responsibilities
                  </Th>
                  <Th fontWeight="1000" fontSize="15">
                    location
                  </Th>
                  <Th fontWeight="1000" fontSize="15">
                    domain
                  </Th>

                  <Th textAlign="center" fontWeight="1000" fontSize="15">
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {user.experience.map((exp, i) => (
                  <Tr key={exp._id || i}>
                    <Td fontWeight="bold">{exp?.companyName}</Td>
                    <Td>{exp?.designation}</Td>
                    <Td>{exp?.employmentType}</Td>
                    <Td>
                      {exp?.startDate
                        ? new Date(exp?.startDate).toLocaleDateString()
                        : ""}
                      -{" "}
                      {exp?.currentlyWorking
                        ? "Present"
                        : new Date(exp?.endDate).toLocaleDateString()}
                    </Td>
                    <Td>{exp?.responsibilities}</Td>
                    <Td>{exp?.location}</Td>
                    <Td>{exp?.domain}</Td>
                    <Td>
                      <Flex gap={2} justify="center">
                        <Button
                          size="sm"
                          colorScheme="blue"
                          onClick={() => handleOpenUpdate(exp, i)}
                        >
                          <CiEdit />
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDelete(exp, i)}
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
            <Text p={4}>No experience details added yet.</Text>
          )}
        </Box>
      )}

      {/* Update Modal */}
      <Modal isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Experience</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Input
                name="designation"
                placeholder="Designation"
                value={formData?.designation}
                onChange={handleChange}
              />
              <Input
                name="companyName"
                placeholder="Company Name"
                value={formData?.companyName}
                onChange={handleChange}
              />
              <Input
                name="employmentType"
                placeholder="Employment Type (e.g. Full-time)"
                value={formData?.employmentType}
                onChange={handleChange}
              />
              <Input
                name="ctc"
                type="number"
                placeholder="CTC (in LPA)"
                value={formData?.ctc}
                onChange={handleChange}
              />
              <Input
                name="industry"
                placeholder="Industry"
                value={formData?.industry}
                onChange={handleChange}
              />
              <Input
                name="domain"
                placeholder="Domain"
                value={formData?.domain}
                onChange={handleChange}
              />
              <Input
                name="startDate"
                type="date"
                value={formData?.startDate}
                onChange={handleChange}
              />
              <Input
                name="endDate"
                type="date"
                value={formData?.endDate}
                onChange={handleChange}
                isDisabled={formData?.currentlyWorking}
              />
              <Flex gap={2} align="center">
                <input
                  type="checkbox"
                  name="currentlyWorking"
                  checked={formData?.currentlyWorking}
                  onChange={handleChange}
                />
                <Text>Currently Working</Text>
              </Flex>
              <Input
                name="location"
                placeholder="Location"
                value={formData?.location}
                onChange={handleChange}
              />
              <Textarea
                name="responsibilities"
                placeholder="Responsibilities"
                value={formData?.responsibilities}
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
