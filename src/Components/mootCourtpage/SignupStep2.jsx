// src/components/SignupStep2.jsx

import React, { useState } from "react";
import {
  VStack,
  Input,
  Select,
  Heading,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

export default function SignupStep2({ basicData, toast, navigate }) {
  const [formData, setFormData] = useState({
    // Speaker 1
    name1: "",
    gender1: "",
    university1: "",
    year1: "",
    course1: "",
    contact1: "",
    collegeId1: "",

    // Speaker 2
    name2: "",
    gender2: "",
    university2: "",
    year2: "",
    course2: "",
    contact2: "",
    collegeId2: "",

    // Researcher
    name3: "",
    gender3: "",
    university3: "",
    year3: "",
    course3: "",
    contact3: "",
    collegeId3: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinalSubmit = async () => {
    const finalData = {
      ...basicData,
      teamMembers: [
        {
          role: "speaker1",
          name: formData.name1,
          gender: formData.gender1,
          university: formData.university1,
          year: formData.year1,
          course: formData.course1,
          contact: formData.contact1,
          collegeId: formData.collegeId1,
        },
        {
          role: "speaker2",
          name: formData.name2,
          gender: formData.gender2,
          university: formData.university2,
          year: formData.year2,
          course: formData.course2,
          contact: formData.contact2,
          collegeId: formData.collegeId2,
        },
        {
          role: "researcher",
          name: formData.name3,
          gender: formData.gender3,
          university: formData.university3,
          year: formData.year3,
          course: formData.course3,
          contact: formData.contact3,
          collegeId: formData.collegeId3,
        },
      ],
    };
    console.log(finalData, "Final Data to Submit");
    try {
      await axios.post(
        "http://localhost:8000/api/v1/MootUser/mootuser_signup",
        finalData,
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

      // Optional: navigate to login or dashboard
      navigate("/moot-user-dashboard");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Heading size="md">Speaker 1</Heading>
      <Input placeholder="Full Name" name="name1" onChange={handleChange} />
      <Select placeholder="Gender" name="gender1" onChange={handleChange}>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </Select>
      <Input
        placeholder="University"
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
        <option>B.Com LL.B.</option>
        <option>B.Sc. LL.B.</option>
        <option>BBA LL.B.</option>
        <option>LL.B.</option>
        <option>B.A Legal Studies</option>
        <option>B.A Criminology & Criminal Justice</option>
      </Select>
      <Input
        placeholder="Contact Number"
        name="contact1"
        onChange={handleChange}
      />
      <Input
        placeholder="College ID"
        name="collegeId1"
        onChange={handleChange}
      />

      <Heading size="md">Speaker 2</Heading>
      <Input placeholder="Full Name" name="name2" onChange={handleChange} />
      <Select placeholder="Gender" name="gender2" onChange={handleChange}>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </Select>
      <Input
        placeholder="University"
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
        <option>B.Com LL.B.</option>
        <option>B.Sc. LL.B.</option>
        <option>BBA LL.B.</option>
        <option>LL.B.</option>
        <option>B.A Legal Studies</option>
        <option>B.A Criminology & Criminal Justice</option>
      </Select>
      <Input
        placeholder="Contact Number"
        name="contact2"
        onChange={handleChange}
      />
      <Input
        placeholder="College ID"
        name="collegeId2"
        onChange={handleChange}
      />

      <Heading size="md">Researcher</Heading>
      <Input placeholder="Full Name" name="name3" onChange={handleChange} />
      <Select placeholder="Gender" name="gender3" onChange={handleChange}>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </Select>
      <Input
        placeholder="University"
        name="university3"
        onChange={handleChange}
      />
      <Select placeholder="Year" name="year3" onChange={handleChange}>
        <option>1st</option>
        <option>2nd</option>
        <option>3rd</option>
        <option>4th</option>
        <option>5th</option>
      </Select>
      <Select placeholder="Course" name="course3" onChange={handleChange}>
        <option>B.A. LL.B.</option>
        <option>B.Com LL.B.</option>
        <option>B.Sc. LL.B.</option>
        <option>BBA LL.B.</option>
        <option>LL.B.</option>
        <option>B.A Legal Studies</option>
        <option>B.A Criminology & Criminal Justice</option>
      </Select>
      <Input
        placeholder="Contact Number"
        name="contact3"
        onChange={handleChange}
      />
      <Input
        placeholder="College ID"
        name="collegeId3"
        onChange={handleChange}
      />

      <Button colorScheme="blue" onClick={handleFinalSubmit}>
        Submit Registration
      </Button>
    </VStack>
  );
}
