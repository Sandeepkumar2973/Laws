import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  Heading,
  SimpleGrid,
  Flex,
  Divider,
  Button,
  Input,
  Select,
  Img,
  useToast,
} from "@chakra-ui/react";
import * as mod from "../../../../url";
import axios from "axios";
import { CiLocationOn } from "react-icons/ci";
import logo from "./../../../Assets/logo/logo.png";
import { Link, useLocation } from "react-router-dom";
import Header from "../../../Navbar/Header";
import Footer from "../../../Navbar/Footer";
import { Country, State, City } from "country-state-city";

const AlljobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const toast = useToast();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const industry = searchParams.get("industry");
  const education = searchParams.get("education");
  const [filters, setFilters] = useState({
    jobType: "",
    salary: "",
    city: "",
    title: "",
    industry: "",
    education: "",
  });
  const data = JSON.parse(localStorage.getItem("lawvsuserinfo"));
  const token = data?.data?.token;
  const userId = data?.data?.userData?._id;
  // fetch all jobs
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/job/get-Active-jobs`
      );
      if (data) {
        setJobs(data.data);
        setFilteredJobs(data.data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
    }
  };
  const fetchAppliedJobs = async () => {
    if (!userId) return;
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/user/user/applied-jobs/${userId}`,
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );
      // console.log(data, "data");
      if (data.success) {
        setAppliedJobs(data.appliedJobs);
      }
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };
  useEffect(() => {
    fetchJobs();
    fetchAppliedJobs();
  }, []);
  // search + filter logic
  useEffect(() => {
    if (industry) {
      setFilters((prev) => ({ ...prev, industry }));
    }
    if (education) {
      setFilters((prev) => ({ ...prev, education }));
    }
  }, [industry, education]);

  // existing filter logic
  useEffect(() => {
    let temp = jobs;

    if (search)
      temp = temp.filter((j) =>
        j.title.toLowerCase().includes(search.toLowerCase())
      );
    if (filters.jobType)
      temp = temp.filter((j) => j.jobType === filters.jobType);
    if (filters.salary)
      temp = temp.filter((j) => j.salaryRange.includes(filters.salary));
    if (filters.title)
      temp = temp.filter((j) =>
        j.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    if (filters.state)
      temp = temp.filter((j) =>
        j.state?.toLowerCase().includes(filters.state.toLowerCase())
      );
    if (filters.city)
      temp = temp.filter((j) =>
        j.city?.toLowerCase().includes(filters.city.toLowerCase())
      );
    if (filters.industry)
      temp = temp.filter(
        (j) => j.industry?.toLowerCase() === filters.industry.toLowerCase()
      );
    if (filters.education)
      temp = temp.filter(
        (j) => j.education?.toLowerCase() === filters.education.toLowerCase()
      );

    setFilteredJobs(temp);
  }, [search, filters, jobs]);

  const applyJobByUser = async (jobId, adminId) => {
    if (!userId || !token) {
      toast({
        title: "Please login",
        description: "You need to login before applying for a job.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const response = await axios.post(
        `${mod.api_url}/api/v1/user/job-apply/${jobId}/${userId}`,
        { adminId },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      toast({
        title: "Job applied successfully",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setAppliedJobs((prev) => [...prev, jobId]);
    } catch (error) {
      toast({
        title: "Application failed",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Header />
      <Box px={{ base: 4, md: 8 }} py={8}>
        <Heading as="h2" size="lg" color="yellow.700">
          All Jobs ({filteredJobs.length})
        </Heading>
        <Flex direction={{ base: "column", md: "row" }} gap={6} align="start">
          {/* Sidebar Filters */}
          <Box
            w={{ base: "100%", md: "25%" }}
            border="1px solid"
            borderColor="gray.200"
            rounded="md"
            p={4}
            bg="white"
            gap={4}
          >
            <Heading size="md" mb={4} color="yellow.700">
              Filters
            </Heading>

            {/* Search */}
            <Input
              placeholder="Search jobs by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              mb={4}
            />

            {/* job by job name */}
            <Select
              placeholder="Job Name"
              mb={4}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, title: e.target.value }))
              }
            >
              <option value="legal-intern">Legal Intern</option>
              <option value="judicial-intern">Judicial Intern</option>
              <option value="ngo-intern">NGO/Policy Intern</option>
              <option value="junior-advocate">Junior Advocate</option>
              <option value="associate">Associate (Law Firm)</option>
              <option value="litigation-associate">Litigation Associate</option>
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
            {/* Job Type */}
            <Select
              placeholder="Job Type"
              mb={4}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, jobType: e.target.value }))
              }
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
              <option value="Contract">Contract</option>
            </Select>

            {/* Salary */}
            <Select
              placeholder="Salary"
              mb={4}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, salary: e.target.value }))
              }
            >
              <option value="₹0 – ₹2 LPA">0-2 LPA</option>
              <option value="₹2 – ₹5 LPA">2-5 LPA</option>
              <option value="₹5 – ₹10 LPA">5-10 LPA</option>
              <option value="₹10 – ₹20 LPA">10-20 LPA</option>
              <option value="₹20 – ₹30 LPA">20-30 LPA</option>
            </Select>
            <Select
              mb={4}
              placeholder="Select Practice Area"
              value={filters.industry}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, industry: e.target.value }))
              }
            >
              {industries.map((ind) => (
                <option key={ind.value} value={ind.value}>
                  {ind.label}
                </option>
              ))}
            </Select>
            <Select
              mb={4}
              placeholder="Select Education"
              value={filters.education}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, education: e.target.value }))
              }
            >
              {lawDegrees.map((ind) => (
                <option key={ind.value} value={ind.value}>
                  {ind.label}
                </option>
              ))}
            </Select>
            {/* Reset */}
            <Button
              w="full"
              mt={2}
              colorScheme="yellow"
              variant="outline"
              onClick={() => {
                setSearch("");
                setFilters({ jobType: "", salary: "", location: "" });
              }}
            >
              Reset Filters
            </Button>
          </Box>

          {/* Job Listings */}
          <Box flex="1">
            <Flex justify="space-between" mb={4}>
              {/* State Dropdown */}

              <Select
                placeholder="Select State"
                mb={3}
                onChange={(e) =>
                  setFilters((prev) => ({
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
                value={filters.city}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, city: e.target.value }))
                }
                isDisabled={!filters.state} // disable until state is chosen
              >
                {filters.state &&
                  City.getCitiesOfState("IN", filters.state).map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
              </Select>
            </Flex>
            <Divider mb={4} />

            {filteredJobs.length === 0 && (
              <Text>No jobs found matching your criteria.</Text>
            )}
            <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3 }} spacing={6}>
              {filteredJobs.map((job, index) => (
                <Box
                  key={index}
                  bg="white"
                  rounded="xl"
                  borderWidth="1px"
                  shadow="sm"
                  p={6}
                  _hover={{ shadow: "lg", transform: "scale(1.02)" }}
                  transition="all 0.2s"
                >
                  <Img
                    src={logo}
                    alt={job?.name}
                    boxSize="80px"
                    objectFit="contain"
                    mx="auto"
                    mb={3}
                  />

                  <Text fontSize="lg" fontWeight="bold" mb={1}>
                    {job?.title}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    {job?.company}
                  </Text>

                  <VStack align="start" spacing={1} fontSize="sm" mb={3}>
                    <Text>
                      <b>Experience:</b> {job?.experienceRequired}
                    </Text>
                    <Flex align="center">
                      <CiLocationOn
                        size="18px"
                        style={{ marginRight: "4px" }}
                      />
                      {job?.city}
                    </Flex>
                    <Text>
                      <b>CTC:</b> {job?.salaryRange}
                    </Text>
                  </VStack>

                  <Flex justify="space-between" gap={2}>
                    <Button
                      flex="1"
                      size="sm"
                      colorScheme="yellow"
                      as={Link}
                      to={`/get-single-job/details/${job._id}`}
                    >
                      View Details
                    </Button>

                    {appliedJobs.includes(job._id) ? (
                      <Button
                        flex="1"
                        size="sm"
                        colorScheme="gray"
                        variant="solid"
                        disabled
                      >
                        Applied
                      </Button>
                    ) : (
                      <Button
                        flex="1"
                        size="sm"
                        colorScheme="green"
                        variant="solid"
                        onClick={() => applyJobByUser(job._id, job.adminId)}
                      >
                        Apply Now
                      </Button>
                    )}
                  </Flex>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export default AlljobsPage;
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
