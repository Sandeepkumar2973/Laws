import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormLabel,
  Select,
  VStack,
  Heading,
  useToast,
  Text,
  HStack,
} from "@chakra-ui/react";

const MultiStepForm = () => {
  const toast = useToast();
  const [step, setStep] = useState(1); // Step 1: Name & Email, Step 2: Full form
  const [sentOtp, setSentOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    // Speaker 1
    gender1: "",
    university1: "",
    year1: "",
    course1: "",
    contact1: "",
    // Speaker 2
    name2: "",
    gender2: "",
    university2: "",
    year2: "",
    course2: "",
    contact2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const sendOtp = () => {
    if (!formData.email) {
      toast({
        title: "Please enter your email.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setLoadingOtp(true);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOtp(otp);
    setLoadingOtp(false);
    toast({
      title: "OTP sent to your email (Dummy).",
      description: `Your OTP is ${otp}`,
      status: "info",
      duration: 4000,
      isClosable: true,
    });
  };
  const verifyOtp = () => {
    if (formData.otp === sentOtp) {
      setOtpVerified(true);
      toast({
        title: "OTP Verified Successfully!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Incorrect OTP",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handleNext = () => {
    if (!formData.name || !formData.email || !formData.mobile) {
      toast({
        title: "All fields are required",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (!otpVerified) {
      toast({
        title: "Please verify OTP",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setStep(2);
  };

  return (
    <Box p={5} borderWidth="1px" borderRadius="md" maxW="600px" mx="auto">
      <Heading size="md" mb={4}>
        Speaker Registration
      </Heading>

      {step === 1 && (
        <VStack spacing={4} align="stretch" maxW="md" mx="auto" mt={8}>
          <Box>
            <FormLabel>Full Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Box>

          <Box>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <HStack mt={2}>
              <Button
                size="sm"
                onClick={sendOtp}
                isLoading={loadingOtp}
                isDisabled={otpVerified}
              >
                Send OTP
              </Button>
              {otpVerified && <Text color="green.500">Verified</Text>}
            </HStack>
          </Box>

          {!otpVerified && sentOtp && (
            <Box>
              <FormLabel>Enter OTP</FormLabel>
              <Input
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
              />
              <Button mt={2} size="sm" onClick={verifyOtp}>
                Verify OTP
              </Button>
            </Box>
          )}

          <Box>
            <FormLabel>Mobile</FormLabel>
            <Input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </Box>

          <Button colorScheme="blue" onClick={handleNext}>
            Next
          </Button>
        </VStack>
      )}
      {step === 2 && (
        <VStack spacing={4} align="stretch">
          {/* Speaker 1 */}
          <Heading size="sm">Speaker 1</Heading>
          <Input placeholder="Full Name" name="name1" onChange={handleChange} />
          <Select placeholder="Gender" name="gender1" onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Select>
          <Input
            placeholder="University Name"
            name="university1"
            onChange={handleChange}
          />
          <Select placeholder="Year" name="year1" onChange={handleChange}>
            <option>1st</option>
            <option>2nd</option>
            <option>3rd</option>
            <option>4th</option>
            <option>5th</option>
          </Select>
          <Select placeholder="Course" name="course1" onChange={handleChange}>
            <option>B.A. LL.B.</option>
            <option>B.A. LL.B. (Hons)</option>
            <option>B.Com LL.B.</option>
            <option>B.Sc. LL.B.</option>
            <option>BBA LL.B.</option>
            <option>LL.B.</option>
            <option>LL.M.</option>
          </Select>
          <Input
            placeholder="Contact Number"
            name="contact1"
            onChange={handleChange}
          />

          {/* Speaker 2 */}
          <Heading size="sm" mt={6}>
            Speaker 2
          </Heading>
          <Input placeholder="Full Name" name="name2" onChange={handleChange} />
          <Select placeholder="Gender" name="gender2" onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Select>
          <Input
            placeholder="University Name"
            name="university2"
            onChange={handleChange}
          />
          <Select placeholder="Year" name="year2" onChange={handleChange}>
            <option>1st</option>
            <option>2nd</option>
            <option>3rd</option>
            <option>4th</option>
            <option>5th</option>
          </Select>
          <Select placeholder="Course" name="course2" onChange={handleChange}>
            <option>B.A. LL.B.</option>
            <option>B.A. LL.B. (Hons)</option>
            <option>B.Com LL.B.</option>
            <option>B.Sc. LL.B.</option>
            <option>BBA LL.B.</option>
            <option>LL.B.</option>
            <option>LL.M.</option>
          </Select>
          <Input
            placeholder="Contact Number"
            name="contact2"
            onChange={handleChange}
          />
          {/* researcher data */}
          <Heading size="sm">Researcher </Heading>
          <Input placeholder="Full Name" name="name1" onChange={handleChange} />
          <Select placeholder="Gender" name="gender1" onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Select>
          <Input
            placeholder="University Name"
            name="university1"
            onChange={handleChange}
          />
          <Select placeholder="Year" name="year1" onChange={handleChange}>
            <option>1st</option>
            <option>2nd</option>
            <option>3rd</option>
            <option>4th</option>
            <option>5th</option>
          </Select>
          <Select placeholder="Course" name="course1" onChange={handleChange}>
            <option>B.A. LL.B.</option>
            <option>B.A. LL.B. (Hons)</option>
            <option>B.Com LL.B.</option>
            <option>B.Sc. LL.B.</option>
            <option>BBA LL.B.</option>
            <option>LL.B.</option>
            <option>LL.M.</option>
          </Select>
          <Input
            placeholder="Contact Number"
            name="contact1"
            onChange={handleChange}
          />
          <Button colorScheme="blue" mt={4} onClick={() => alert("Submitted!")}>
            Submit
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default MultiStepForm;
