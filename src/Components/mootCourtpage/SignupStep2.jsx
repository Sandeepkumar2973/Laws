import React, { useState } from "react";
import {
  VStack,
  SimpleGrid,
  Box,
  Input,
  Select,
  Heading,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  Image,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import * as mod from "../../url"; // Replace this with your actual API module

const CLOUDINARY_UPLOAD_PRESET = "unsigned_preset"; // your created preset
const CLOUDINARY_CLOUD_NAME = "dwikskvzt"; // Your Cloudinary cloud name

export default function SignupStep2({ basicData, navigate }) {
  const toast = useToast();

  const [formData, setFormData] = useState({
    name1: "",
    gender1: "",
    university1: "",
    year1: "",
    course1: "",
    contact1: "",
    collegeId1: "",
    name2: "",
    gender2: "",
    university2: "",
    year2: "",
    course2: "",
    contact2: "",
    collegeId2: "",
    name3: "",
    gender3: "",
    university3: "",
    year3: "",
    course3: "",
    contact3: "",
    collegeId3: "",
  });

  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading((prev) => ({ ...prev, [fieldName]: true }));

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        form
      );
      setFormData((prev) => ({ ...prev, [fieldName]: res.data.secure_url }));
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    } catch (error) {
      toast({
        title: "Image Upload Failed",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setUploading((prev) => ({ ...prev, [fieldName]: false }));
    }
  };

  const validateFields = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinalSubmit = async () => {
    if (!validateFields()) {
      toast({
        title: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const finalData = {
      ...basicData,
      teamMembers: [
        {
          role: "speaker1",
          name: formData.name1,
          gender: formData.gender1,
          university: formData.university1,
          year: formData.year1,
          course: formData.course1,
          contact: formData.contact1,
          collegeId: formData.collegeId1,
        },
        {
          role: "speaker2",
          name: formData.name2,
          gender: formData.gender2,
          university: formData.university2,
          year: formData.year2,
          course: formData.course2,
          contact: formData.contact2,
          collegeId: formData.collegeId2,
        },
        {
          role: "researcher",
          name: formData.name3,
          gender: formData.gender3,
          university: formData.university3,
          year: formData.year3,
          course: formData.course3,
          contact: formData.contact3,
          collegeId: formData.collegeId3,
        },
      ],
    };

    try {
      await axios.post(
        `${mod.api_url}/api/v1/MootUser/mootuser_signup`,
        finalData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast({
        title: "Registration Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/moot-user-login");
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

  const renderField = (label, name, type = "input", options = []) => (
    <FormControl isInvalid={errors[name]}>
      <FormLabel>{label}</FormLabel>
      {type === "input" ? (
        <Input name={name} value={formData[name]} onChange={handleChange} />
      ) : (
        <Select
          placeholder={`Select ${label}`}
          name={name}
          value={formData[name]}
          onChange={handleChange}
        >
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </Select>
      )}
      {errors[name] && <FormErrorMessage>{errors[name]}</FormErrorMessage>}
    </FormControl>
  );

  const renderImageUpload = (label, name) => (
    <FormControl isInvalid={errors[name]}>
      <FormLabel>{label}</FormLabel>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, name)}
      />
      {uploading[name] && <Spinner size="sm" ml={2} />}
      {formData[name] && (
        <Image
          src={formData[name]}
          alt="Uploaded ID"
          width="100%"
          maxW="250px"
          mt={2}
          borderRadius="md"
          boxShadow="md"
        />
      )}
      {errors[name] && <FormErrorMessage>{errors[name]}</FormErrorMessage>}
    </FormControl>
  );

  return (
    <Box w="100%" mx="auto">
      <VStack spacing={6} align="stretch" width="100%">
        <Heading size="md">Speaker 1</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {renderField("Full Name", "name1")}
          {renderField("Gender", "gender1", "select", [
            "Male",
            "Female",
            "Other",
          ])}
          {renderField("University", "university1")}
          {renderField("Year", "year1", "select", [
            "1st",
            "2nd",
            "3rd",
            "4th",
            "5th",
          ])}
          {renderField("Course", "course1", "select", [
            "B.A. LL.B.",
            "B.Com LL.B.",
            "B.Sc. LL.B.",
            "BBA LL.B.",
            "LL.B.",
            "B.A Legal Studies",
            "B.A Criminology & Criminal Justice",
          ])}
          {renderField("Contact Number", "contact1")}
          {renderImageUpload("College ID Image", "collegeId1")}
        </SimpleGrid>

        <Heading size="md">Speaker 2</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {renderField("Full Name", "name2")}
          {renderField("Gender", "gender2", "select", [
            "Male",
            "Female",
            "Other",
          ])}
          {renderField("University", "university2")}
          {renderField("Year", "year2", "select", [
            "1st",
            "2nd",
            "3rd",
            "4th",
            "5th",
          ])}
          {renderField("Course", "course2", "select", [
            "B.A. LL.B.",
            "B.Com LL.B.",
            "B.Sc. LL.B.",
            "BBA LL.B.",
            "LL.B.",
            "B.A Legal Studies",
            "B.A Criminology & Criminal Justice",
          ])}
          {renderField("Contact Number", "contact2")}
          {renderImageUpload("College ID Image", "collegeId2")}
        </SimpleGrid>

        <Heading size="md">Researcher</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {renderField("Full Name", "name3")}
          {renderField("Gender", "gender3", "select", [
            "Male",
            "Female",
            "Other",
          ])}
          {renderField("University", "university3")}
          {renderField("Year", "year3", "select", [
            "1st",
            "2nd",
            "3rd",
            "4th",
            "5th",
          ])}
          {renderField("Course", "course3", "select", [
            "B.A. LL.B.",
            "B.Com LL.B.",
            "B.Sc. LL.B.",
            "BBA LL.B.",
            "LL.B.",
            "B.A Legal Studies",
            "B.A Criminology & Criminal Justice",
          ])}
          {renderField("Contact Number", "contact3")}
          {renderImageUpload("College ID Image", "collegeId3")}
        </SimpleGrid>

        <Button colorScheme="blue" onClick={handleFinalSubmit} width="full">
          Submit Registration
        </Button>
      </VStack>
    </Box>
  );
}
