import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Circle,
  Input,
  Select,
  Stack,
  FormLabel,
  FormControl,
  Heading,
  useToast,
  Divider,
  TableContainer,
  Table,
  Tr,
  Td,
  Tbody,
} from "@chakra-ui/react";
import axios from "axios";
import * as mod from "../../../url";
import ReactQuill from "react-quill";
import { formats, modules } from "../../../utils/Quill";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar";
import parse from "html-react-parser";
import LocationSelector from "../../../utils/LocationSelector";

const SIDEBAR_WIDTH = "250px";
const steps = [
  "Job Details",
  "Company Info",
  "Requirements",
  "Review",
  "Submit",
];

const CreateJob = () => {
  const toast = useToast();

  const AdminjobInfo = localStorage.getItem("lawvsadmininfo");
  const parsedUserInfo = JSON.parse(AdminjobInfo);
  const adminId = parsedUserInfo?.data?.id;
  const token = parsedUserInfo?.token;
  const [step, setStep] = useState(0);
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
    deadline: "",
    education: "",
    interviewMethod: "",
    country: "",
    state: "",
    city: "",
  });
  // console.log(formData, "formData");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Step-wise validation
  const validateStep = () => {
    switch (step) {
      case 0:
        return (
          formData.title &&
          formData.country &&
          formData.state &&
          formData.city &&
          formData.openings &&
          formData.salaryRange &&
          formData.workMode &&
          formData.deadline
        );
      case 1:
        return formData.company && formData.industry;
      case 2:
        return (
          formData.jobType &&
          formData.experienceRequired &&
          formData.education &&
          formData.description
        );
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateStep()) {
      toast({
        title: "Please fill all required fields before proceeding.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      adminId,
      skillsRequired: formData.skillsRequired
        ? formData.skillsRequired.split(",").map((skill) => skill.trim())
        : [],
      postedDate: new Date(),
    };

    console.log("📤 Sending Payload =>", payload);

    try {
      await axios.post(`${mod.api_url}/api/v1/job/create-job`, payload, {
        headers: { Authorization: `${token}` },
      });

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
        deadline: "",
        education: "",
        interviewMethod: "",
        country: "",
        state: "",
        city: "",
      });
      setStep(0);
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
  // view page
  const fields = [
    { key: "title", label: "Job Title" },
    { key: "company", label: "Company" },
    { key: "location", label: "Location" },
    { key: "openings", label: "Openings" },
    { key: "salaryRange", label: "Salary Range" },
    { key: "jobType", label: "Job Type" },
    { key: "workMode", label: "Work Mode" },
    { key: "experienceRequired", label: "Experience Required" },
    { key: "skillsRequired", label: "Skills Required" },
    { key: "description", label: "Description", isHTML: true },
    { key: "industry", label: "Industry" },
    { key: "deadline", label: "Application Deadline" },
    { key: "education", label: "Education" },
    { key: "interviewMethod", label: "Interview Method" },
  ];
  return (
    <>
      <Navbar />
      <Sidebar />
      <Box mt="100px" ml={{ base: 0, md: SIDEBAR_WIDTH }} p={6}>
        <Heading mb={6} background="yellow.400" borderRadius="50px" padding={1}>
          Create Job
        </Heading>

        {/* Stepper */}
        <Flex align="center" justify="space-between" mb={6} position="relative">
          {steps.map((label, i) => (
            <Flex
              key={i}
              flex="1"
              direction="column"
              align="center"
              position="relative"
            >
              <Circle
                size="35px"
                bg={i <= step ? "green.600" : "gray.400"}
                color="white"
                zIndex={1}
              >
                {i + 1}
              </Circle>
              <Text
                fontSize="sm"
                mt={2}
                color={i <= step ? "green.600" : "gray.500"}
              >
                {label}
              </Text>
              {i < steps.length - 1 && (
                <Box
                  position="absolute"
                  top="16px"
                  right="-50%"
                  width="100%"
                  height="2px"
                  bg={i < step ? "green.600" : "gray.300"}
                  zIndex={0}
                />
              )}
            </Flex>
          ))}
        </Flex>

        {/* Step-wise Form */}
        <Stack spacing={4}>
          {step === 0 && (
            <>
              <FormLabel>Job Title / Designation</FormLabel>
              <Select
                placeholder="Select Job Title / Designation"
                name="title"
                value={formData.title}
                onChange={handleChange}
                isRequired
              >
                <option value="legal-intern">Legal Intern</option>
                <option value="judicial-intern">Judicial Intern</option>
                <option value="ngo-intern">NGO/Policy Intern</option>
                <option value="junior-advocate">Junior Advocate</option>
                <option value="associate">Associate (Law Firm)</option>
                <option value="litigation-associate">
                  Litigation Associate
                </option>
                <option value="legal-researcher">Legal Researcher</option>
                <option value="advocate">Advocate (Litigation)</option>
                <option value="corporate-lawyer">
                  Corporate Lawyer (In-house)
                </option>
                <option value="legal-advisor">Legal Advisor</option>
                <option value="legal-officer">
                  Legal Officer (PSU/Bank/Insurance)
                </option>
                <option value="public-prosecutor">Public Prosecutor</option>
                <option value="arbitration-specialist">
                  Arbitration & Dispute Resolution Specialist
                </option>
                <option value="law-lecturer">Law Lecturer / Academic</option>
                <option value="policy-analyst">Policy Analyst</option>
              </Select>

              <FormLabel>Location</FormLabel>
              <LocationSelector
                onChange={(loc) => {
                  setFormData((prev) => ({
                    ...prev,
                    country: loc.country,
                    state: loc.state,
                    city: loc.city,
                  }));
                }}
              />

              {/* <Box mt={6}>
                <Text>Country: {location.country}</Text>
                <Text>State: {location.state}</Text>
                <Text>City: {location.city}</Text>
              </Box> */}
              {/* <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                list="locations"
                placeholder="Enter location"
                isRequired
              />
              <datalist id="locations">
                {citySuggestions.map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist> */}

              <Input
                placeholder="Openings"
                name="openings"
                type="number"
                value={formData.openings}
                onChange={handleChange}
                isRequired
              />

              <Select
                placeholder="Salary Range "
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
                <option value="₹30 LPA & above">₹30 LPA & above</option>
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
            </>
          )}

          {step === 1 && (
            <>
              <FormLabel>Company Name</FormLabel>
              <Input
                placeholder="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                isRequired
              />
              <Select
                placeholder="Select Interview method"
                name="interviewMethod"
                value={formData.interviewMethod}
                onChange={handleChange}
              >
                <option value="Walking">Walking</option>
                <option value="Virtual">Virtual</option>
              </Select>
              <Select
                placeholder="Select Industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              >
                <option value="Law">Law</option>
                <option value="Other">Other</option>
              </Select>
            </>
          )}

          {step === 2 && (
            <>
              <Select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                placeholder="Select Job Type"
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
              >
                <option value="Intern">Intern</option>
                <option value="Fresher">Fresher</option>
                <option value="1-2 years">1-2 years</option>
                <option value="2-5 years">2-5 years</option>
                <option value="5+ years">5+ years</option>
              </Select>

              <Select
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Select Education"
              >
                <option value="LLB">LLB (Bachelor of Laws)</option>
                <option value="BALLB">BA LLB (Integrated)</option>
                <option value="BBA LLB">BBA LLB (Integrated)</option>
                <option value="BCom LLB">B.Com LLB (Integrated)</option>
                <option value="BSc LLB">B.Sc LLB (Integrated)</option>
                <option value="BACLLB">BA CLLB</option>
                <option value="LLM">LLM (Master of Laws)</option>
                <option value="LLM Business Law">LLM in Business Law</option>
                <option value="LLM Criminal Law">LLM in Criminal Law</option>
                <option value="LLM Constitutional Law">
                  LLM in Constitutional Law
                </option>
                <option value="LLM International Law">
                  LLM in International Law
                </option>
                <option value="LLM Human Rights">
                  LLM in Human Rights Law
                </option>
                <option value="LLM Corporate Law">LLM in Corporate Law</option>
                <option value="LLM Intellectual Property Law">
                  LLM in Intellectual Property Law
                </option>
              </Select>

              <Input
                placeholder="Skills (comma separated)"
                name="skillsRequired"
                value={formData.skillsRequired}
                onChange={handleChange}
              />

              <Text fontWeight="bold" mb={2}>
                Description
              </Text>
              <ReactQuill
                className="custom-quill"
                value={formData.description}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, description: value }))
                }
                modules={modules}
                formats={formats}
                theme="snow"
                placeholder="Write your job description here..."
                style={{ height: "30vh", marginBottom: "20px" }}
              />
            </>
          )}

          {step === 3 && (
            <Box p={4} borderWidth="1px" borderRadius="lg" bg="gray.50">
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Review Your Job Post
              </Text>

              <TableContainer>
                <Table variant="simple" size="sm">
                  <Tbody>
                    {fields.map((field) => (
                      <Tr key={field.key}>
                        <Td fontWeight="semibold" width="30%">
                          {field.label}
                        </Td>
                        <Td>
                          {field.isHTML
                            ? parse(formData[field.key] || "")
                            : formData[field.key] || "—"}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {step === 4 && (
            <Box textAlign="center">
              <Text>Ready to submit ✅</Text>
              <Button colorScheme="blue" mt={4} onClick={handleSubmit}>
                Submit Job
              </Button>
            </Box>
          )}
        </Stack>

        {/* Navigation Buttons */}
        <Flex justify="space-between" mt={6}>
          <Button onClick={prevStep} isDisabled={step === 0}>
            Previous
          </Button>
          {step < steps.length - 1 && (
            <Button colorScheme="green" onClick={nextStep}>
              Next
            </Button>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default CreateJob;
