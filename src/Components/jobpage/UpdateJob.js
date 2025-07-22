import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Select,
  Stack,
  Button,
  useToast,
  Spinner,
  Center,
  FormControl,
  FormLabel
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Home from "../Sidebar";
import * as mod from "../../url";

const UpdateJob = () => {
  const { id } = useParams();
  const toast = useToast();

  const AdminjobInfo = sessionStorage.getItem("AdminjobInfo");
  const parsedUserInfo = JSON.parse(AdminjobInfo);
  const token = parsedUserInfo?.data?.token;

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    openings: "",
    salaryRange: "",
    jobType: "",
    workMode: "",
    experienceRequired: "",
    skillsRequired: "",
    description: "",
    industry: "",
    category: "",
    deadline: "",
    postedDate: "",
    status: ""

  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `${mod.api_url}/api/v1/job/get-job-byid/${id}`,
          {
            headers: {
              Authorization: `${token}`, // Make sure this matches your backend format
            },
          }
        );
        const job = res.data?.data || res.data;

        setFormData({
          ...job,
          skillsRequired: job.skillsRequired?.join(", ") || "",
          postedDate: job.postedDate?.split("T")[0] || "",
          deadline: job.deadline?.split("T")[0] || ""
        });
      } catch (err) {
        toast({
          title: "Error fetching job data",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    if (id && token) fetchJob();
  }, [id, token, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        skillsRequired: formData.skillsRequired
          .split(",")
          .map((skill) => skill.trim()),
      };

      await axios.put(
        `${mod.api_url}/api/v1/job/update-job-byId/${id}`,
        payload,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      toast({
        title: "Job updated successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Failed to update job",
        description: err?.response?.data?.message || "Error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Center mt={10}>
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <>
      <Home />
      <Box maxW="container.md" mx="auto" p={6}>
        <Heading mb={6}>Update Job</Heading>
        <form onSubmit={handleUpdate}>
          <Stack spacing={4}>
            <Input placeholder="Job Title" name="title" value={formData.title} onChange={handleChange} isRequired />
            <Select placeholder="Job status" name="status" value={formData.status} onChange={handleChange} isRequired >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Select>
            <Input placeholder="Company" name="company" value={formData.company} onChange={handleChange} isRequired />
            <Input placeholder="Location" name="location" value={formData.location} onChange={handleChange} isRequired />
            <Input placeholder="Openings" name="openings" type="number" value={formData.openings} onChange={handleChange} isRequired />
            <Input placeholder="Salary Range" name="salaryRange" value={formData.salaryRange} onChange={handleChange} />

            <Select name="jobType" value={formData.jobType} onChange={handleChange} placeholder="Select Job Type" isRequired>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
              <option value="Contract">Contract</option>
            </Select>

            <Select name="workMode" value={formData.workMode} onChange={handleChange} placeholder="Select Work Mode" isRequired>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">On-Site</option>
            </Select>

            <Select name="experienceRequired" value={formData.experienceRequired} onChange={handleChange} placeholder="Select Experience" isRequired>
              <option value="Intern">Intern</option>
              <option value="Fresher">Fresher</option>
              <option value="1-2 years">1-2 years</option>
              <option value="2-5 years">2-5 years</option>
              <option value="5+ years">5+ years</option>
            </Select>

            <Input placeholder="Skills (comma separated)" name="skillsRequired" value={formData.skillsRequired} onChange={handleChange} isRequired />
            <Textarea placeholder="Job Description" name="description" value={formData.description} onChange={handleChange} isRequired />

            <Select name="industry" value={formData.industry} onChange={handleChange} placeholder="Select Industry" isRequired>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Marketing">Marketing</option>
              <option value="Other">Other</option>
            </Select>

            <FormControl>
              <FormLabel>Application Deadline</FormLabel>
              <Input type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
            </FormControl>
            <Button colorScheme="teal" type="submit">Update Job</Button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default UpdateJob;
