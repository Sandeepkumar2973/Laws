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
  FormLabel,
  FormControl
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
    workMode: "",
    experienceRequired: "",
    skillsRequired: "",
    description: "",
    industry: "",
    deadline: ""
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
        workMode: "",
        experienceRequired: "",
        skillsRequired: "",
        description: "",
        industry: "",
        deadline: ""
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
  const SIDEBAR_WIDTH = "250px";

  return (
    <>
      <Navbar />
      <Sidebar />
      <Box mt="100px" // to push below fixed Navbar
        ml={{ base: 0, md: SIDEBAR_WIDTH }} // push right if sidebar is present
        p={6}>
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
              name="location"
              value={formData.location}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={handleChange}
              list="locations"
              placeholder="Enter location"
              isRequired
            />
            <datalist id="locations">
              {citySuggestions.map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>
            <Input
              placeholder="Openings"
              name="openings"
              type="number"
              value={formData.openings}
              onChange={handleChange}
              isRequired
            />
            <Select
              placeholder="Salary Range (e.g., 5-8 LPA)"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              isRequired
            >
              <option value="₹0 – ₹2 LPA">₹0 – ₹2 LPA</option>
              <option value="₹2 – ₹5 LPA">₹2 – ₹5 LPA</option>
              <option value="₹5 – ₹10 LPA">₹5 – ₹10 LPA</option>
              <option value="₹10 – ₹20 LPA">₹10 – ₹20 LPA</option>
              <option value="₹20 – ₹30 LPA">₹20 – ₹30 LPA</option>
              <option value="₹30 LPA & above">₹30 LPA & above</option>
            </Select>
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
              <option value="Intern">Intern</option>
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

            <Select
              name="workMode"
              value={formData.workMode}
              onChange={handleChange}
              placeholder="Select work mode"
              isRequired
            >
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">On-Site</option>
            </Select>


            <FormControl>
              <FormLabel>Application Deadline</FormLabel>
              <Input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                border="1px solid #ccc"
                isRequired
              />
            </FormControl>

            <Button colorScheme="blue" type="submit">
              Post Job
            </Button>
          </Stack>
        </form>
      </Box >
    </>
  );
};

export default CreateJob;

const citySuggestions = [
  "Delhi", "Mumbai", "Kolkata", "Chennai", "Bengaluru",
  "Hyderabad", "Ahmedabad", "Pune", "Surat", "Jaipur",
  "Lucknow", "Kanpur", "Nagpur", "Indore", "Bhopal",
  "Patna", "Vadodara", "Ludhiana", "Agra", "Nashik",
  "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar",
  "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar",
  "Navi Mumbai", "Prayagraj", "Ranchi", "Howrah", "Jabalpur",
  "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur",
  "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli-Dharwad",
  "Mysuru", "Tiruchirappalli", "Bareilly", "Aligarh", "Tiruppur",
  "Moradabad", "Jalandhar", "Bhubaneswar", "Salem", "Mira-Bhayandar",
  "Thiruvananthapuram", "Bhiwandi", "Saharanpur", "Guntur", "Gorakhpur",
  "Bikaner", "Amravati", "Noida", "Jamshedpur", "Bhilai",
  "Cuttack", "Firozabad", "Kochi", "Nellore", "Bhavnagar",
  "Dehradun", "Durgapur", "Asansol", "Rourkela", "Nanded",
  "Kolhapur", "Ajmer", "Akola", "Gulbarga", "Jamnagar",
  "Ujjain", "Loni", "Siliguri", "Jhansi", "Ulhasnagar",
  "Pondicherry", "Bilaspur", "Thane", "Panipat", "Karimnagar",
  "Ichalkaranji", "Mangalore", "Erode", "Tirunelveli", "Malegaon",
  "Gaya", "Udaipur", "Maheshtala", "Dewas"
];