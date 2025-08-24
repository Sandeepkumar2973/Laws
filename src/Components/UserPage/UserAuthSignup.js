// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import {
  Heading,
  VStack,
  Input,
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
import AuthLayout from "./AuthLayout";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as mod from "../../url";
export default function UserAuthSignup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAgreed: false,
  });

  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill out all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!formData.termsAgreed) {
      toast({
        title: "Terms Required",
        description: "Please agree to the Terms and Conditions.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // ✅ Call API
    try {
      await axios.post(
        `${mod.api_url}/api/v1/user/create-user`,
        {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        },
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

      navigate("/user-auth-login");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const leftContent = (
    <>
      <Heading mb={6} fontSize="xl" color="orange.700">
        Job Seeker Registration
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Input
            placeholder="Enter your full name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          <Input
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
          />
          <Input
            placeholder="Enter your mobile number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
          />
          <Input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
          />
          <Input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
          />
          <Checkbox
            name="termsAgreed"
            isChecked={formData.termsAgreed}
            onChange={handleChange}
          >
            I agree to the Terms and Conditions
          </Checkbox>
          <Button type="submit" colorScheme="yellow">
            Submit
          </Button>
        </VStack>
      </form>
      <Text mt={4}>
        Already Registered?{" "}
        <Link
          as={RouterLink}
          to="/user-auth-login"
          textColor={"orange.600"}
          fontStyle="italic"
        >
          Click here to login
        </Link>
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
          <ListIcon as={CheckCircleIcon} color="orange.400" />
          Build your profile and let recruiters find you.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="orange.400" />
          Get job postings delivered right to your email.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="orange.400" />
          Find a job and grow your career.
        </ListItem>
      </List>
    </>
  );

  return <AuthLayout left={leftContent} right={rightContent} />;
}
