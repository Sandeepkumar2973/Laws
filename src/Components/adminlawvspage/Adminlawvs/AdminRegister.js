// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import {
  Heading,
  VStack,
  Input,
  Select,
  Checkbox,
  Button,
  Text,
  Link,
  List,
  ListItem,
  ListIcon,
  useToast,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import AuthLayout from "../../UserPage/AuthLayout";
// import "./Auth.css";
import axios from "axios";
import * as mod from "../../../url";
import { useNavigate } from "react-router-dom";

export default function AdminAuthRegister() {
  const toast = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    mobile: "",
    lookingFor: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [loading, setLoading] = useState(false);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validation
  const validateForm = () => {
    if (!formData.companyName.trim())
      return "Company/Firm/Advocate name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      return "Valid email is required";
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile))
      return "Valid 10-digit mobile number is required";
    if (!formData.lookingFor) return "Please select Job or Internship";
    if (!formData.password.trim() || formData.password.length < 6)
      return "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match";
    if (!formData.terms) return "You must agree to the Terms and Conditions";
    return null;
  };

  // Submit handler
  const handleSubmit = async () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      toast({
        title: "Validation Error",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${mod.api_url}/api/v1/admin/create-admin`,
        formData
      ); // Change URL to your backend endpoint

      toast({
        title: "Registration Successful",
        description: res.data.message || "You can now log in",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Optionally redirect to login
      navigate("/admin-auth-login");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const leftContent = (
    <>
      <Heading mb={6} fontSize="xl" color="orange.700">
        Job/Internship Posting Registration
      </Heading>
      <VStack spacing={4} align="stretch">
        <Input
          placeholder="Name of company/Firm /Advocate"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
        />
        <Input
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          placeholder="Enter your number"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
        <Select
          placeholder="What are you looking for?"
          name="lookingFor"
          value={formData.lookingFor}
          onChange={handleChange}
        >
          <option value="Job">Job</option>
          <option value="Internship">Internship</option>
        </Select>
        <Input
          placeholder="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Checkbox
          name="terms"
          isChecked={formData.terms}
          onChange={handleChange}
        >
          I agree to the Terms and Conditions
        </Checkbox>
        <Button colorScheme="yellow" onClick={handleSubmit} isLoading={loading}>
          Submit
        </Button>
      </VStack>
      <Text mt={4}>
        Already Registered?{" "}
        <ChakraLink
          as={RouterLink}
          to="/admin-auth-login"
          textColor={"orange.600"}
          fontStyle="italic"
        >
          Click here to login
        </ChakraLink>
      </Text>
    </>
  );

  const rightContent = (
    <>
      <Heading mb={4} marginTop={"100px"}>
        New to LAWVS:
      </Heading>
      <List spacing={3} align="left">
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="orange.400" />2 simple steps to
          post your jobs
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="orange.400" />
          Free listing of jobs
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="orange.400" />
          Affirmative response on your posted jobs
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="orange.400" />
          India's only Portal for Law candidates and interns
        </ListItem>
      </List>
      <div id="pointer"></div>
    </>
  );

  return <AuthLayout left={leftContent} right={rightContent} />;
}
