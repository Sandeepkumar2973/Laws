// src/components/SignupForm.jsx

import React, { useState } from "react";
import { Box, Flex, Image, Heading, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";
import logo from "../Assets/logo/logo.png";

export default function SignupForm() {
  const [step, setStep] = useState(1);
  const [basicData, setBasicData] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  return (
    <Flex
      minH="100vh"
      // bgGradient="linear(to-r, blue.200, yellow.100)"
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
        maxW="1000px"
      >
        <Flex direction="column" align="center" mb={6}>
          <Image src={logo} alt="Logo" maxW="220px" mb={4} />
          <Heading
            size="lg"
            textAlign="center"
            bgGradient="linear(to-r, blue.200, yellow.100)"
          >
            Moot Court Registration
          </Heading>
        </Flex>

        {step === 1 && (
          <SignupStep1
            setStep={setStep}
            setBasicData={setBasicData}
            toast={toast}
          />
        )}

        {step === 2 && (
          <SignupStep2
            basicData={basicData}
            toast={toast}
            navigate={navigate}
          />
        )}
      </Box>
    </Flex>
  );
}
