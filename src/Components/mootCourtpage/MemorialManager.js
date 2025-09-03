import React, { useRef, useState, useEffect } from "react";
import { Button, useToast, Spinner, Text, Box } from "@chakra-ui/react";
import axios from "axios";
import dayjs from "dayjs";
import * as mode from "../../url";
const MemorialManager = ({ userId }) => {
  const toast = useToast();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [memorial, setMemorial] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [expired, setExpired] = useState(false);

  // Countdown logic
  useEffect(() => {
    const deadline = new Date("2025-09-20T23:59:59").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = deadline - now;

      if (diff <= 0) {
        setExpired(true);
        setTimeLeft("Expired");
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // File input trigger
  const handleClick = () => fileInputRef.current.click();

  // File upload
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

      // ✅ Store memorial + expiry (frontend only, +5 days)
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

  return (
    <Box textAlign="center" mt={1}>
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
      />

      {/* Upload Button or Countdown */}
      <Text
        fontSize="2xl"
        mb={3}
        fontWeight="bold"
        // bgGradient="linear(to-r, teal.400, blue.500, purple.500)"
        bgClip="text"
      >
        {expired ? "Memorial Submission Closed " : `Time Left: ${timeLeft}`}
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
      >
        Submit Your Memorial
      </Button>
    </Box>
  );
};

export default MemorialManager;
