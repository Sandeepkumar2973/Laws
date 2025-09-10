import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";
import { Box, Button, Container, Heading, SimpleGrid } from "@chakra-ui/react";

const IndustryList = () => {
  const navigate = useNavigate();

  const industries = [
    { label: "Arbitration Job", value: "Arbitration" },
    { label: "Aviation Law Job", value: "AviationLaw" },
    { label: "Banking and Finance Job", value: "BankingAndFinance" },
    { label: "Civil Litigation Job", value: "CivilLitigation" },
    { label: "Corporate Law Job", value: "CorporateLaw" },
    { label: "Commercial Law Job", value: "CommercialLaw" },
    { label: "Consumer Protection Law Job", value: "ConsumerProtectionLaw" },
    { label: "Competition Law Job", value: "CompetitionLaw" },
    { label: "Cyber Law Job", value: "CyberLaw" },
    { label: "Employment & Labour Law Job", value: "EmploymentAndLabourLaw" },
    { label: "Environment Law Job", value: "EnvironmentLaw" },
    { label: "Energy Law Job", value: "EnergyLaw" },

    { label: "Matrimonial Law Job", value: "MatrimonialLaw" },
    { label: "Maritime Law Job", value: "MaritimeLaw" },
    { label: "Mergers & Acquisitions Job", value: "MergersAndAcquisitions" },
    { label: "Real Estate Job", value: "RealEstate" },
    { label: "Taxation Law Job", value: "TaxationLaw" },
    { label: "White Collar Crimes Job", value: "WhiteCollarCrimes" },

    { label: "Medical Negligence Law Job", value: "MedicalNegligenceLaw" },
    { label: "GST Law Job", value: "GSTLaw" },
    { label: "Service Law Job", value: "ServiceLaw" },
    { label: "Motor Accident Law Job", value: "MotorAccidentLaw" },
    {
      label: "Negotiable Instrument Act Job",
      value: "NegotiableInstrumentAct",
    },
    { label: "Trademark Job", value: "Trademark" },
    { label: "Startup Job", value: "Startup" },
    { label: "Wills/Trust Job", value: "WillsTrust" },
    { label: "Insurance Law Job", value: "InsuranceLaw" },
    { label: "International Law Job", value: "InternationalLaw" },
    { label: "Insolvency & Bankruptcy Job", value: "InsolvencyAndBankruptcy" },
    {
      label: "Intellectual Property Rights Job",
      value: "IntellectualPropertyRights",
    },
    {
      label: "Immigration Human Rights",
      value: "ImmigrationLawHumanRightsLaw",
    },
    {
      label: "Technology, Media & Telecom..",
      value: "TMTLaw",
    },
    { label: "Criminal Law Job", value: "CriminalLaw" },
    {
      label: "Customs & Central Excise Law Job",
      value: "CustomsAndCentralExciseLaw",
    },
  ];

  const handleClick = (industry) => {
    navigate(`/get-all-jobs?industry=${industry}`);
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
          bgGradient="linear(to-r, teal.500, green.400)"
          bgClip="text"
          fontWeight="extrabold"
        >
          Practice Areas
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
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={3}>
            {industries.map((ind) => (
              <Button
                key={ind.value}
                onClick={() => handleClick(ind.value)}
                variant="outline"
                borderRadius="xl"
                size="lg"
                _hover={{
                  bg: "teal.50",
                  transform: "scale(1.05)",
                  boxShadow: "lg",
                }}
                transition="all 0.2s ease-in-out"
              >
                {ind.label}
              </Button>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default IndustryList;
