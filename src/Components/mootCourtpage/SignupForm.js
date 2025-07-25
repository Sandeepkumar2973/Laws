// src/components/SignupForm.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  VStack,
  InputGroup,
  InputRightElement,
  IconButton,
  Select,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import logo from "../Assets/logo/logo.png";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    alert("Signup Successful!");
  };

  return (
    <Flex
      minH="100vh"
      bgGradient="linear(to-r, blue.200, yellow.100)"
      align="center"
      justify="center"
      px={4}
    >
      <Box
        bg="white"
        p={{ base: 6, md: 8 }}
        rounded="xl"
        shadow="lg"
        w="full"
        maxW="md"
      >
        <Flex direction="column" align="center" mb={6}>
          <Image src={logo} alt="Logo" maxW="120px" mb={4} />
          <Heading size="lg">User Signup</Heading>
        </Flex>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.institution}>
              <FormLabel>Institution</FormLabel>
              <Input
                placeholder="Enter your institution"
                {...register("institution", {
                  required: "Institution is required",
                })}
              />
              <FormErrorMessage>
                {errors.institution && errors.institution.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.course}>
              <FormLabel>Course</FormLabel>
              <Select
                placeholder="Select your course"
                {...register("course", { required: "Course is required" })}
              >
                <option value="BA LLB / BBA LLB">BA LLB / BBA LLB</option>
                <option value="LLB">LLB</option>
              </Select>
              <FormErrorMessage>
                {errors.course && errors.course.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.year}>
              <FormLabel>Year of Study</FormLabel>
              <Select
                placeholder="Select your year"
                {...register("year", { required: "Year of Study is required" })}
              >
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year</option>
              </Select>
              <FormErrorMessage>
                {errors.year && errors.year.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.collegeId}>
              <FormLabel>College ID</FormLabel>
              <Input
                placeholder="Enter your college ID"
                {...register("collegeId", {
                  required: "College ID is required",
                })}
              />
              <FormErrorMessage>
                {errors.collegeId && errors.collegeId.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.mobile}>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                type="tel"
                placeholder="Enter your mobile number"
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit mobile number",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.mobile && errors.mobile.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Button colorScheme="blue" w="full" type="submit">
              Signup
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
