// src/components/SignupStep1.jsx
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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import axios from "axios";
import * as mod from "../../url";

export default function SignupStep1({ setStep, setBasicData, toast }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [sentOtp, setSentOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const mobile = watch("mobile");

  const sendOtp = async () => {
    if (!mobile || mobile.length !== 10) {
      toast({
        title: "Enter valid mobile number first",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(
        `${mod.api_url}/api/v1/MootUser/send-otp`,
        { mobile }, // ✅ Send mobile in body
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // You may log or temporarily display OTP for dev only (not in prod)
      toast({
        title: "OTP Sent Successfully",
        description: `OTP has been sent to ${mobile}`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to send OTP",
        description: error?.response?.data?.message || "Server error",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  // ✅ Verify OTP (calls backend to verify it)
  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Enter a valid 6-digit OTP",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(
        `${mod.api_url}/api/v1/MootUser/verify-otp`,
        { mobile, otp },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // If backend confirms OTP is valid
      if (response.data.success) {
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
    } catch (error) {
      toast({
        title: "OTP Verification Failed",
        description: error?.response?.data?.message || "Server error",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const onSubmit = (data) => {
    // if (!otpVerified) {
    //   toast({
    //     title: "Please verify OTP first",
    //     status: "warning",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    //   return;
    // }

    // ✅ Save the Step 1 data in parent state only
    setBasicData(data);
    setStep(2);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={errors.institution}>
            <FormLabel>Institution name</FormLabel>
            <Input
              placeholder="Enter your institution/ college / university"
              {...register("institution", {
                required: "Institution is required",
              })}
            />
            <FormErrorMessage>{errors.institution?.message}</FormErrorMessage>
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
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.mobile}>
            <Flex direction="column" gap={2}>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                placeholder="Enter 10-digit mobile number"
                {...register("mobile", {
                  required: "Mobile is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid mobile number",
                  },
                })}
              />
              {/* <Button mt={2} size="sm" onClick={sendOtp}>
                Send OTP
              </Button> */}
              <FormErrorMessage>{errors.mobile?.message}</FormErrorMessage>
            </Flex>
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
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="blue" w="full">
            Next Step
          </Button>
        </VStack>
      </form>
      <Flex justify="center" mt={4}>
        <Text fontSize="sm" color="gray.500">
          Already have an account?
          <ChakraLink
            as={RouterLink}
            to="/moot-user-login"
            color="blue.500"
            href="/login"
          >
            Login
          </ChakraLink>
        </Text>
      </Flex>
    </>
  );
}
