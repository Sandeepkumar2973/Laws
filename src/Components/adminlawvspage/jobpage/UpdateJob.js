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
  FormLabel,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { Form, useParams } from "react-router-dom";
import Sidebar from "../../Sidebar";
import * as mod from "../../../url";
import Navbar from "../../Navbar/Navbar";
import LocationSelector from "../../../utils/LocationSelector";
import { Country, State, City } from "country-state-city";

const SIDEBAR_WIDTH = "250px";

const UpdateJob = () => {
  const { id } = useParams();
  const toast = useToast();

  const AdminjobInfo = localStorage.getItem("lawvsadmininfo");
  const parsedUserInfo = JSON.parse(AdminjobInfo);
  const adminId = parsedUserInfo?.data?.id;
  const token = parsedUserInfo?.token;

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    country: "",
    state: "",
    city: "",
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
    status: "",
    education: "",
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
          deadline: job.deadline?.split("T")[0] || "",
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
      <Navbar />
      <Sidebar />
      <Box mt="100px" ml={{ base: 0, md: SIDEBAR_WIDTH }} p={6}>
        <Heading mb={6}>Update Job</Heading>
        <form onSubmit={handleUpdate}>
          <Stack spacing={4}>
            <FormLabel>
              Location
              <Flex
                gap={4}
                direction={{ base: "column", md: "row" }} // mobile = column, desktop = row
                w="100%"
              >
                {/* State Dropdown */}

                <Select
                  placeholder="Select State"
                  mb={3}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      state: e.target.value,
                      city: "", // reset city when state changes
                    }))
                  }
                >
                  {State.getStatesOfCountry("IN").map((s) => (
                    <option key={s.isoCode} value={s.isoCode}>
                      {s.name}
                    </option>
                  ))}
                </Select>

                {/* City Dropdown */}
                <Select
                  placeholder="Select City"
                  mb={3}
                  value={formData.city}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, city: e.target.value }))
                  }
                  isDisabled={!formData.state} // disable until state is chosen
                >
                  {formData.state &&
                    City.getCitiesOfState("IN", formData.state).map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                </Select>
              </Flex>
            </FormLabel>

            <Flex
              gap={4}
              direction={{ base: "column", md: "row" }} // mobile = column, desktop = row
              w="100%"
            >
              <FormControl isRequired>
                <FormLabel>Job Title</FormLabel>
                <Input
                  placeholder="Job Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Job Status</FormLabel>
                <Select
                  placeholder="Job Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Job Openings</FormLabel>
                <Input
                  placeholder="Openings"
                  name="openings"
                  type="number"
                  value={formData.openings}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Salary Range</FormLabel>
                <Input
                  placeholder="Salary Range"
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleChange}
                />
              </FormControl>
            </Flex>

            <FormLabel>
              Company Name{" "}
              <Input
                placeholder="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                isRequired
              />
            </FormLabel>
            <Flex
              gap={4}
              direction={{ base: "column", md: "row" }} // mobile = column, desktop = row
              w="100%"
            >
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
                  placeholder="Select Experience"
                >
                  <option value="Intern">Intern</option>
                  <option value="Fresher">Fresher</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="2-5 years">2-5 years</option>
                  <option value="5+ years">5+ years</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Work Mode</FormLabel>
                <Select
                  name="workMode"
                  value={formData.workMode}
                  onChange={handleChange}
                  placeholder="Select Work Mode"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Onsite">On-Site</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Application Deadline</FormLabel>
                <Input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                />
              </FormControl>
            </Flex>

            <FormLabel>
              Skills Required
              <Input
                placeholder="Skills (comma separated)"
                name="skillsRequired"
                value={formData.skillsRequired}
                onChange={handleChange}
                isRequired
              />
            </FormLabel>
            <FormLabel>
              Job Description
              <Textarea
                placeholder="Job Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                isRequired
              />
            </FormLabel>

            <Flex
              gap={4}
              direction={{ base: "column", md: "row" }} // mobile = column, desktop = row
              w="100%"
            >
              <FormControl>
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

              <FormControl>
                <FormLabel>Highest Education</FormLabel>
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
              </FormControl>
            </Flex>

            <Button colorScheme="teal" type="submit">
              Update Job
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default UpdateJob;
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

  // --- Certifications ---
  // { label: "Certificate in Cyber Law", value: "cert_cyber" },
  // {
  //   label: "Certificate in IPR (Intellectual Property Rights)",
  //   value: "cert_ipr",
  // },
  // { label: "Certificate in International Trade Law", value: "cert_trade" },
  // { label: "Certificate in Corporate Governance", value: "cert_governance" },
  // { label: "Certificate in Human Rights Law", value: "cert_human_rights" },
  // { label: "Certificate in Competition Law", value: "cert_competition" },
  // { label: "Certificate in Sports Law", value: "cert_sports" },
  // { label: "Certificate in Media & Entertainment Law", value: "cert_media" },
];
