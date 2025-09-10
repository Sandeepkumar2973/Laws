import { Container, Box, Heading, Button, SimpleGrid } from "@chakra-ui/react";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";
import { useNavigate } from "react-router-dom";

export default function LawDegrees() {
  const navigate = useNavigate();
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
  const handleClick = (education) => {
    navigate(`/get-all-jobs?education=${education}`);
  };
  return (
    <>
      <Header />
      <Container
        maxW="container.xl"
        py={12}
        textAlign="center"
        bgGradient="linear(to-r, gray.50, gray.100)"
        borderRadius="2xl"
        boxShadow="xl"
      >
        {/* Title */}
        <Heading
          as="h1"
          size="xl"
          mb={8}
          bgGradient="linear(to-r, yellow.500, pink.400)"
          bgClip="text"
          fontWeight="extrabold"
        >
          Law Degrees & Specializations
        </Heading>

        {/* Button Grid */}
        <Box
          bg="white"
          p={8}
          borderRadius="2xl"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.200"
        >
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={6}>
            {lawDegrees.map((deg) => (
              <Button
                key={deg.value}
                onClick={() => handleClick(deg.value)}
                variant="outline"
                borderRadius="xl"
                size="md"
                _hover={{
                  bg: "yellow.100",
                  transform: "scale(1.05)",
                  boxShadow: "lg",
                }}
                transition="all 0.2s ease-in-out"
              >
                {deg.label}
              </Button>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
