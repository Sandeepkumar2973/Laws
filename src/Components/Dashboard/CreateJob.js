import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Select,
  Stack,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar/Navbar";
import * as mod from "../../url";

const CreateJob = () => {
  const toast = useToast();

  const AdminjobInfo = sessionStorage.getItem("AdminjobInfo");
  const parsedUserInfo = JSON.parse(AdminjobInfo);
  const adminId = parsedUserInfo?.data?.admin?.id;
  const token = parsedUserInfo?.data?.token;

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    openings: "",
    salaryRange: "",
    jobType: "",
    experienceRequired: "",
    skillsRequired: "",
    description: "",
    industry: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      adminId,
      skillsRequired: formData.skillsRequired
        .split(",")
        .map((skill) => skill.trim()),
      postedDate: new Date(),
    };

    try {
      const res = await axios.post(
        `${mod.api_url}/api/v1/job/create-job`,
        payload,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      toast({
        title: "Job created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setFormData({
        title: "",
        company: "",
        location: "",
        openings: "",
        salaryRange: "",
        jobType: "",
        experienceRequired: "",
        skillsRequired: "",
        description: "",
        industry: "",
        category: "",
      });
    } catch (err) {
      toast({
        title: "Failed to create job.",
        description: err?.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <Box maxW="container.md" mx="auto" p={6}>
        <Heading mb={6}>Create Job</Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Input
              placeholder="Job Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              isRequired
            />
            <Input
              placeholder="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              isRequired
            />
            <Input
              placeholder="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              isRequired
            />
            <Input
              placeholder="Openings"
              name="openings"
              type="number"
              value={formData.openings}
              onChange={handleChange}
              isRequired
            />
            <Input
              placeholder="Salary Range (e.g., 5-8 LPA)"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
            />

            <Select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              placeholder="Select Job Type"
              isRequired
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
              <option value="Contract">Contract</option>
            </Select>

            <Select
              name="experienceRequired"
              value={formData.experienceRequired}
              onChange={handleChange}
              placeholder="Select Experience Level"
              isRequired
            >
              <option value="Fresher">Fresher</option>
              <option value="1-2 years">1-2 years</option>
              <option value="2-5 years">2-5 years</option>
              <option value="5+ years">5+ years</option>
            </Select>

            <Input
              placeholder="Skills (comma separated)"
              name="skillsRequired"
              value={formData.skillsRequired}
              onChange={handleChange}
              isRequired
            />

            <Textarea
              placeholder="Job Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              isRequired
            />

            <Select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="Select Industry"
              isRequired
            >
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Marketing">Marketing</option>
              <option value="Other">Other</option>
            </Select>

            <Input
              placeholder="Job Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              isRequired
            />

            <Button colorScheme="blue" type="submit">
              Post Job
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default CreateJob;
