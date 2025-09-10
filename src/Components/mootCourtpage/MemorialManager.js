import React, { useRef, useState, useEffect } from "react";
import { Button, useToast, Spinner, Text, Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import * as mode from "../../url";

const MemorialManager = ({ userId }) => {
  const toast = useToast();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [memorial, setMemorial] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: "0",
    hours: "0",
    minutes: "0",
    seconds: "0",
  });
  const [expired, setExpired] = useState(false);

  // Countdown logic
  useEffect(() => {
    const deadline = new Date("2025-09-22T23:59:59").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = deadline - now;

      if (diff <= 0) {
        setExpired(true);
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => fileInputRef.current.click();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Only PDF, DOC, DOCX are allowed",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("memorial", file);

    try {
      setLoading(true);
      const res = await axios.post(
        `${mode.api_url}/api/v1/MootUser/${userId}/memorial`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMemorial(res.data.data.memorial);

      toast({
        title: "Success",
        description: res.data.message,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Upload failed",
        description: err.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const TimeBox = ({ value, label, gradient }) => (
    <Box
      p={4}
      m={1}
      minW="70px"
      borderRadius="md"
      bgGradient={gradient}
      color="white"
      fontWeight="bold"
      fontSize="2xl"
      textAlign="center"
      boxShadow="lg"
      transition="transform 0.3s"
      _hover={{ transform: "scale(1.1)" }}
    >
      <Text>{value}</Text>
      <Text fontSize="sm">{label}</Text>
    </Box>
  );

  return (
    <Box textAlign="center" mt={5}>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
      />
      <Text
        backgroundColor="yellow.400"
        p={3}
        borderRadius="md"
        mb={5}
        fontSize="xl"
      >
        Time Countdown
      </Text>
      <Text>
        <b
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "2px 6px",
            borderRadius: "4px",
          }}
        >
          Note:
        </b>{" "}
        You can submit your memorial here. Please note that you may upload your
        memorial in PDF format only, and submissions are allowed just once. Once
        uploaded, you will not be able to make any changes.
      </Text>
      <Flex justify="center" mb={5} wrap="wrap">
        {expired ? (
          <Text fontSize="2xl" fontWeight="bold" color="red.500">
            Memorial Submission Closed
          </Text>
        ) : (
          <>
            <TimeBox
              value={timeLeft.days}
              label="Days"
              gradient="linear(to-r, teal.400, blue.500)"
            />
            <TimeBox
              value={timeLeft.hours}
              label="Hours"
              gradient="linear(to-r, pink.400, purple.500)"
            />
            <TimeBox
              value={timeLeft.minutes}
              label="Minutes"
              gradient="linear(to-r, orange.400, red.500)"
            />
            <TimeBox
              value={timeLeft.seconds}
              label="Seconds"
              gradient="linear(to-r, yellow.400, orange.500)"
            />
          </>
        )}
      </Flex>

      <Button
        fontSize="xl"
        fontWeight="bold"
        backgroundColor={expired ? "gray.400" : "green.500"}
        color="white"
        p={4}
        borderRadius="md"
        isDisabled={expired}
        onClick={handleClick}
        m={2}
        _hover={{ backgroundColor: expired ? "gray.400" : "green.600" }}
      >
        {loading ? (
          <Spinner />
        ) : memorial ? (
          "Memorial Uploaded"
        ) : (
          "Submit Your Memorial"
        )}
      </Button>
    </Box>
  );
};

export default MemorialManager;
