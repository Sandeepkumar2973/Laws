// src/components/ForgotPassword.jsx
import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  Flex,
  Box,
  Image,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import logo from "../Assets/logo/logo.png";
import * as mod from "../../url";
import axios from "axios";
export default function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const toast = useToast();

  const [sentOtp, setSentOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // track if clicked
  const email = watch("email");

  const sendOtp = async () => {
    if (otpSent) return; // prevent double click

    setOtpSent(true); // update state immediately
    if (!email || !/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email)) {
      toast({
        title: "Enter a valid email address",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const { data } = await axios.post(
        `${mod.api_url}/api/v1/MootUser/send-otp`,
        {
          email,
        }
      );

      if (data.success) {
        toast({
          title: "OTP Sent Successfully",
          description: data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setSentOtp("sent");
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast({
        title: "Error sending OTP",
        description: err.response?.data?.message || err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const verifyOtp = async () => {
    try {
      const { data } = await axios.post(
        `${mod.api_url}/api/v1/MootUser/verify-otp`,
        {
          email,
          otp,
        }
      );

      if (data.success) {
        setOtpVerified(true);
        toast({
          title: "OTP Verified Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast({
        title: "OTP Verification Failed",
        description: err.response?.data?.message || err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onSubmit = async (data) => {
    // console.log(data, "data");
    if (!otpVerified) {
      toast({
        title: "Please verify OTP first",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const res = await axios.post(
        `${mod.api_url}/api/v1/MootUser/moot-user-newpass`,
        {
          email: data.email,
          otp,
          newPassword: data.password,
        }
      );

      if (res.data.success) {
        toast({
          title: "Password Reset Successfully",
          description: "You can now login with your new password.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        throw new Error(res.data.message);
      }
      navigate("/moot-user-login");
    } catch (err) {
      toast({
        title: "Failed to Reset Password",
        description: err.response?.data?.message || err.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" p={4}>
      <Box
        maxW="md"
        w="100%"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
        p={8}
        bg="white"
      >
        {/* ✅ Logo */}
        <Flex justify="center" mb={6}>
          <Image src={logo} alt="Logo" h="50px" />
        </Flex>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={errors.email}>
              <FormLabel>Email </FormLabel>
              <Input
                placeholder="Enter registered email "
                {...register("email", {
                  required: "Email  is required",
                  pattern: {
                    value: /^[\w.-]+@[\w.-]+\.\w{2,}$/,
                    message: "Invalid email format",
                  },
                })}
              />
              <Button
                mt={2}
                size="sm"
                colorScheme={otpSent ? "green" : "blue"}
                onClick={sendOtp}
                isDisabled={otpSent}
              >
                {otpSent ? "OTP Sent" : "Send OTP"}
              </Button>

              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            {sentOtp && !otpVerified && (
              <FormControl>
                <FormLabel>Enter OTP</FormLabel>
                <Input value={otp} onChange={(e) => setOtp(e.target.value)} />
                <Button mt={2} size="sm" onClick={verifyOtp}>
                  Verify OTP
                </Button>
              </FormControl>
            )}

            {otpVerified && <Text color="green.500">OTP Verified</Text>}

            <FormControl isInvalid={errors.password}>
              <FormLabel>New Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
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
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <Button type="submit" colorScheme="blue" w="full">
              Reset Password
            </Button>
          </VStack>
        </form>

        <Flex justify="center" mt={4}>
          <Text fontSize="sm" color="gray.500">
            Remembered your password?{" "}
            <ChakraLink as={RouterLink} to="/moot-user-login" color="blue.500">
              Login
            </ChakraLink>
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}
