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
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

export default function ForgotPassword() {
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

  const mobile = watch("mobile");

  const sendOtp = () => {
    if (!mobile || !/^[0-9]{10}$/.test(mobile)) {
      toast({
        title: "Enter a valid 10-digit mobile number",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOtp(randomOtp);

    toast({
      title: "OTP Sent (Dummy)",
      description: `OTP: ${randomOtp}`,
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  const verifyOtp = () => {
    if (otp === sentOtp) {
      setOtpVerified(true);
      toast({
        title: "OTP Verified Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Invalid OTP",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onSubmit = (data) => {
    if (!otpVerified) {
      toast({
        title: "Please verify OTP first",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    console.log("New Password Data:", data);

    toast({
      title: "Password Reset Successfully",
      description: "You can now login with your new password.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
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
          <Image
            src="https://via.placeholder.com/150x50?text=Your+Logo"
            alt="Logo"
            h="50px"
          />
        </Flex>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={errors.mobile}>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                placeholder="Enter 10-digit mobile number"
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid mobile number",
                  },
                })}
              />
              <Button mt={2} size="sm" onClick={sendOtp}>
                Send OTP
              </Button>
              <FormErrorMessage>{errors.mobile?.message}</FormErrorMessage>
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
