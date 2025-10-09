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
  ButtonGroup,
} from "@chakra-ui/react";
import axios from "axios";
import * as mod from "../../../url";
import ReactQuill from "react-quill";
import { formats, modules } from "../../../utils/Quill";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar";
import parse from "html-react-parser";
import LocationSelector from "../../../utils/LocationSelector";
import { Form } from "react-router-dom";
import { Label } from "recharts";

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
    workTypes: "",
  });
  // console.log(formData, "formData");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //  Step-wise validation
  const validateStep = () => {
    switch (step) {
      case 0:
        return (
          formData.workTypes &&
          // formData.title &&
          // formData.country &&
          // formData.state &&
          // formData.city &&
          // formData.openings &&
          // formData.salaryRange &&
          // formData.workMode &&
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

    // console.log("📤 Sending Payload =>", payload);

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
        workTypes: "",
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
    { key: "state", label: "state" },
    { key: "city", label: "city" },
    { key: "openings", label: "Openings" },
    { key: "salaryRange", label: "Salary Range" },
    { key: "jobType", label: "Job Type" },
    { key: "workMode", label: "Work Mode" },
    { key: "experienceRequired", label: "Experience Required" },
    { key: "skillsRequired", label: "Skills Required" },
    { key: "description", label: "Description", isHTML: true },
    { key: "industry", label: "Practice Area" },
    { key: "deadline", label: "Application Deadline" },
    { key: "education", label: "Education" },
    { key: "interviewMethod", label: "Interview Method" },
  ];

  return (
    <>
      <Navbar />
      <Sidebar />
      <Box mt="70px" ml={{ base: 0, md: SIDEBAR_WIDTH }} p={6}>
        <Heading mb={6} background="yellow.400" borderRadius="50px" padding={1}>
          Create Opportunity
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
          <FormControl isRequired backgroundColor="gray.200" p={2}>
            <ButtonGroup isAttached>
              <Button
                variant={formData.workTypes === "job" ? "solid" : "outline"}
                colorScheme="green"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, workTypes: "job" }))
                }
              >
                Job / Internship
              </Button>
              <Button
                variant={
                  formData.workTypes === "freelancing" ? "solid" : "outline"
                }
                colorScheme="blue"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    workTypes: "freelancing",
                  }))
                }
              >
                Freelancing
              </Button>
            </ButtonGroup>
          </FormControl>
          {step === 0 && (
            <>
              <Flex
                gap={4}
                direction={{ base: "column", md: "row" }} // mobile = column, desktop = row
                w="100%"
              ></Flex>

              {formData.workTypes === "job" && (
                <>
                  <FormControl isRequired>
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
                      <option value="public-prosecutor">
                        Public Prosecutor
                      </option>
                      <option value="arbitration-specialist">
                        Arbitration & Dispute Resolution Specialist
                      </option>
                      <option value="law-lecturer">
                        Law Lecturer / Academic
                      </option>
                      <option value="policy-analyst">Policy Analyst</option>
                    </Select>
                  </FormControl>
                  <Flex>
                    <FormControl>
                      <FormLabel>Openings</FormLabel>
                      <Input
                        placeholder="Openings"
                        name="openings"
                        type="number"
                        value={formData.openings}
                        onChange={handleChange}
                        isRequired
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Salary</FormLabel>
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
                    </FormControl>
                  </Flex>

                  <FormControl isRequired>
                    <FormLabel>Work Mode</FormLabel>
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
                  </FormControl>
                </>
              )}

              {formData.workTypes === "freelancing" && (
                <>
                  <FormControl isRequired>
                    <FormLabel>Freelance Work Title / Designation</FormLabel>
                    <Select
                      placeholder="Select Freelancing Title / Designation"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      isRequired
                    >
                      <option value="legal-research">
                        Legal Research & Writing
                      </option>
                      <option value="contract-drafting">
                        Contract Drafting & Review
                      </option>
                      <option value="legal-consulting">Legal Consulting</option>
                      <option value="policy-research">
                        Policy Research / Analysis
                      </option>
                      <option value="compliance-check">
                        Compliance & Due Diligence
                      </option>
                      <option value="trademark-copyright">
                        Trademark / Copyright Filing
                      </option>
                      <option value="corporate-advisory">
                        Corporate Advisory (Freelance)
                      </option>
                      <option value="arbitration-mediation">
                        Arbitration / Mediation Assistance
                      </option>
                      <option value="court-document-prep">
                        Court Documentation & Drafting
                      </option>
                      <option value="ngo-legal-support">
                        NGO / Social Sector Legal Support
                      </option>
                      <option value="freelance-paralegal">
                        Paralegal / Legal Assistance
                      </option>
                      <option value="research-assistant">
                        Research Assistant (Freelance)
                      </option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Budget</FormLabel>
                    <Select
                      placeholder="Salary Range "
                      name="salaryRange"
                      value={formData.salaryRange}
                      onChange={handleChange}
                      isRequired
                    >
                      <option value="₹0 – ₹2 K">₹0 – ₹2 K</option>
                      <option value="₹2 – ₹5 K">₹2 – ₹5 K</option>
                      <option value="₹5 – ₹10 K">₹5 – ₹10 K</option>
                      <option value="₹10 – ₹20 K">₹10 – ₹20 K</option>
                      <option value="₹20 – ₹30 K">₹20 – ₹30 K</option>
                      <option value="₹30 K & above">₹30 K & above</option>
                    </Select>
                  </FormControl>
                </>
              )}
              <FormControl isRequired>
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
              </FormControl>
              {/* Common field for both */}
              <Flex>
                <FormControl isRequired>
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
                <FormControl isRequired>
                  <FormLabel variant="floating" isRequired>
                    Address{" "}
                  </FormLabel>

                  <Input
                    type="textarea"
                    placeholder="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    isRequired
                  />
                </FormControl>
              </Flex>
            </>
          )}

          {step === 1 && (
            <>
              <FormControl isRequired>
                <FormLabel variant="floating" id="username" isRequired>
                  Company Name{" "}
                </FormLabel>

                <Input
                  placeholder="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  isRequired
                />
              </FormControl>

              <Flex gap={4} direction={{ base: "column", md: "row" }} w="100%">
                <FormControl isRequired>
                  <FormLabel>interview Method </FormLabel>
                  <Select
                    placeholder="Select Interview method"
                    name="interviewMethod"
                    value={formData.interviewMethod}
                    onChange={handleChange}
                  >
                    <option value="Walking">Walking</option>
                    <option value="Virtual">Virtual</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Practice Area</FormLabel>
                  <Select
                    placeholder="Select Practice Area"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                  >
                    {industries.map((ind) => (
                      <option key={ind.value} value={ind.value}>
                        {ind.label}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Flex>
            </>
          )}

          {step === 2 && (
            <>
              <Flex gap={4} direction={{ base: "column", md: "row" }} w="100%">
                <FormControl isRequired>
                  <FormLabel>Job Type</FormLabel>
                  <Select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    placeholder="Select Job Type"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelancing">Freelancing</option>
                    <option value="Remote">Remote</option>
                    <option value="Contract">Contract</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Experience Required</FormLabel>
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
                </FormControl>
              </Flex>
              <FormLabel>
                Highest Education
                <Select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="Select Education"
                >
                  {lawDegrees.map((deg) => (
                    <option key={deg.value} value={deg.value}>
                      {deg.label}
                    </option>
                  ))}
                </Select>
              </FormLabel>
              <Input
                placeholder="Skills (comma separated)"
                name="skillsRequired"
                value={formData.skillsRequired}
                onChange={handleChange}
              />

              <FormLabel mb={5}>
                Description
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
              </FormLabel>
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
const industries = [
  { label: "Arbitration", value: "Arbitration" },
  { label: "Aviation Law", value: "AviationLaw" },
  { label: "Banking and Finance", value: "BankingAndFinance" },
  { label: "Civil Litigation", value: "CivilLitigation" },
  { label: "Corporate Law", value: "CorporateLaw" },
  { label: "Commercial Law", value: "CommercialLaw" },
  { label: "Consumer Protection Law", value: "ConsumerProtectionLaw" },
  { label: "Competition Law", value: "CompetitionLaw" },
  { label: "Cyber Law", value: "CyberLaw" },
  { label: "Employment & Labour Law", value: "EmploymentAndLabourLaw" },
  { label: "Environment Law", value: "EnvironmentLaw" },
  { label: "Energy Law", value: "EnergyLaw" },
  {
    label: "Intellectual Property Rights",
    value: "IntellectualPropertyRights",
  },
  {
    label: "Immigration Law Human Rights Law",
    value: "ImmigrationLawHumanRightsLaw",
  },
  { label: "Insolvency & Bankruptcy", value: "InsolvencyAndBankruptcy" },
  { label: "Matrimonial Law", value: "MatrimonialLaw" },
  { label: "Maritime Law", value: "MaritimeLaw" },
  { label: "Mergers & Acquisitions", value: "MergersAndAcquisitions" },
  { label: "Real Estate", value: "RealEstate" },
  { label: "Taxation Law", value: "TaxationLaw" },
  { label: "White Collar Crimes", value: "WhiteCollarCrimes" },
  {
    label: "Technology, Media and Telecommunications (TMT) Law",
    value: "TMTLaw",
  },
  { label: "Criminal Law", value: "CriminalLaw" },
  {
    label: "Customs & Central Excise Law",
    value: "CustomsAndCentralExciseLaw",
  },
  { label: "Medical Negligence Law", value: "MedicalNegligenceLaw" },
  { label: "GST Law", value: "GSTLaw" },
  { label: "Service Law", value: "ServiceLaw" },
  { label: "Motor Accident Law", value: "MotorAccidentLaw" },
  { label: "Negotiable Instrument Act", value: "NegotiableInstrumentAct" },
  { label: "Trademark", value: "Trademark" },
  { label: "Startup", value: "Startup" },
  { label: "Wills/Trust", value: "WillsTrust" },
  { label: "Insurance Law", value: "InsuranceLaw" },
  { label: "International Law", value: "InternationalLaw" },
];

const lawDegrees = [
  // --- Undergraduate Degrees ---
  { label: "LLB (Bachelor of Laws)", value: "llb" },
  { label: "BA LLB (Integrated)", value: "ba_llb" },
  { label: "BBA LLB (Integrated)", value: "bba_llb" },
  { label: "BCom LLB (Integrated)", value: "bcom_llb" },
  { label: "BSc LLB (Integrated)", value: "bsc_llb" },
  { label: "Juris Doctor (JD)", value: "jd" },

  // --- Postgraduate Degrees ---
  { label: "LLM (Master of Laws)", value: "llm" },
  { label: "LLM in Constitutional Law", value: "llm_constitutional" },
  { label: "LLM in Criminal Law", value: "llm_criminal" },
  { label: "LLM in Corporate Law", value: "llm_corporate" },
  { label: "LLM in International Law", value: "llm_international" },
  { label: "LLM in Intellectual Property Rights", value: "llm_ipr" },
  { label: "LLM in Human Rights Law", value: "llm_human_rights" },
  { label: "LLM in Taxation Law", value: "llm_taxation" },
  { label: "LLM in Environmental Law", value: "llm_environmental" },
  { label: "LLM in Family Law", value: "llm_family" },
  { label: "LLM in Arbitration & Mediation", value: "llm_arbitration" },
  { label: "LLM in Cyber Law", value: "llm_cyber" },
  { label: "LLM in Business Law", value: "llm_business" },
  { label: "LLM in Labour & Employment Law", value: "llm_labour" },

  // --- Doctoral Level ---
  { label: "PhD in Law", value: "phd_law" },
  { label: "Doctor of Juridical Science (SJD)", value: "sjd" },

  // --- Diplomas ---
  { label: "Diploma in Corporate Law", value: "diploma_corporate" },
  { label: "Diploma in Cyber Law", value: "diploma_cyber" },
  { label: "Diploma in Intellectual Property Law", value: "diploma_ip" },
  { label: "Diploma in International Law", value: "diploma_international" },
  { label: "Diploma in Criminal Law", value: "diploma_criminal" },
  { label: "Diploma in Human Rights Law", value: "diploma_human_rights" },
  { label: "Diploma in Environmental Law", value: "diploma_environmental" },
  { label: "Diploma in Family Law", value: "diploma_family" },
  { label: "Diploma in Labour Law", value: "diploma_labour" },
  {
    label: "Diploma in Arbitration & Mediation",
    value: "diploma_arbitration",
  },
  { label: "Diploma in Taxation Law", value: "diploma_taxation" },
];
