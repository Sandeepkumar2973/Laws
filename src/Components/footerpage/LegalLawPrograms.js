import {
  Box,
  Container,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import react from "react";
import Header from "../Navbar/Header";
import Footer from "../Navbar/Footer";

const LegalLawProgram = () => {
  return (
    <>
      <Header />
      <Box
        w="100%"
        minH={{ base: "15vh", md: "40vh", lg: "60vh" }}
        bgImage="url('https://lawvs.com/public/lawvs/assets/images/law-banner.png')"
        bgRepeat="no-repeat"
        bgSize={{ base: "contain", md: "cover" }}
        bgPosition="center"
        bgColor="black"
        display="flex"
        alignItems="center"
        px={{ base: 4, md: 12, lg: 20 }}
      >
        <Box
          maxW={{ base: "full", md: "lg", lg: "2xl" }}
          textAlign={{ base: "left", md: "left" }}
          color="white"
        >
          {/* Heading */}
          <Heading
            as="h1"
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            mb={6}
            lineHeight="1.3"
            textAlign="left" // 🔹 Always left aligned
          >
            Legal Law Programs
          </Heading>

          {/* Search Box (Responsive) */}
          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={0}
            bg="white"
            borderRadius="full"
            overflow="hidden"
            maxW="full"
            alignItems="center"
            mt={{ base: 6, md: 12 }}
          ></Stack>
        </Box>
      </Box>
      <Box maxW="1100px" mx="auto" py={10}>
        <VStack align="flex-start" spacing={5} textAlign={"justify"} mb={2}>
          <Text fontSize="md" textAlign="justify">
            Embarking on a journey in legal education is akin to opening a door
            to a world where the nuances of justice are dissected and
            understood. In this comprehensive guide, we navigate through the
            vast landscape of legal law programs, each offering a unique avenue
            for aspiring professionals to explore and excel.
            <br />
            <br /> Join us as we explore the world of legal education,
            uncovering traditional degrees, online programs, and specialized
            certificates in various legal law programs. Whether you're a student
            looking for the right program or a professional aiming to deepen
            your legal knowledge, this guide promises to shed light on the
            diverse paths available in legal academia. <br />
            <br /> Discover how these programs shape legal professionals and
            contribute to the ever-evolving legal landscape. Welcome to the
            multifaceted world of legal education!
          </Text>
          <Heading as="h2" fontSize="2xl" mt={5} mb={3}>
            Different types of Legal Law Programs
          </Heading>
          <UnorderedList>
            <ListItem>
              <b>Bachelor of Laws (LLB):</b> The LLB, a common undergraduate law
              degree in Indian universities, spans three years. Following a
              standard curriculum covering essential bar subjects, LLB graduates
              can pursue diverse careers, including roles as Advocates, Legal
              Advisors, and positions in the Judiciary, Legal Outsourcing, Legal
              Research, and more. Reports indicate that LLB degree holders can
              earn an average salary of up to 7 LPA in India, depending on
              experience and specialization.
            </ListItem>
            <ListItem>
              <b>Integrated Undergraduate Degrees:</b> Integrated law courses,
              such as B.A. LL.B., B.Sc. LL.B., BBA. LLB., B.Com. LL.B., and
              B.A.L. LL.B., offer a combined academic framework for both the
              traditional LLB degree and another graduation degree. Typically
              lasting five years, graduates of these programs can explore career
              opportunities as Public Prosecutors, Legal Experts, Company
              Secretaries, and more. Average salaries for these integrated
              undergraduate law degrees, like B.A. LL.B and BBA LL.B, often
              reach up to 7 LPA in India.
            </ListItem>
            <ListItem>
              <b>Master of Laws (LL.M.):</b> LL.M. is a common postgraduate law
              degree with a duration of one or two years. Graduates can pursue
              roles such as Civil Judges, Lawyers, Property Lawyers, Criminal
              Lawyers, and Intellectual Property Lawyers. Depending on the job
              role and industry, the average salary for LL.M. graduates varies
              from INR 8-15 LPA.
            </ListItem>
            <ListItem>
              <b>Master of Business Law:</b> M.B.L., a postgraduate civil law
              program focusing on commercial legal elements and essential
              business skills, opens up career opportunities as Law Officers,
              Legal Advisors, Chief Financial Officers, and more. The average
              salary for Master of Business Law graduates can reach up to INR 47
              Lakhs.
            </ListItem>
            <ListItem>
              <b>Doctor of Philosophy (PhD) of Law:</b> A three-year doctorate
              specializing in law study, PhD in Law graduates can pursue careers
              in legal research, teaching, writing law books or reports, and
              various managerial roles. Glassdoor reports an average salary of
              up to 8 LPA for PhD Law graduates.
            </ListItem>
            <ListItem>
              <b>Integrated MBL-LLM/MBA-LLM:</b> A three-year double degree
              integrated course with a specialization in business law, graduates
              can explore careers as Law Officers, Legal Advisors, Chief
              Financial Officers, Corporate Lawyers, and more. This integrated
              program offers a unique blend of legal and business expertise
            </ListItem>
          </UnorderedList>
          <Text fontSize="md" textAlign="justify">
            These legal education pathways not only equip individuals with
            comprehensive knowledge but also carve distinct professional
            identities. From advocating for justice in courtrooms to shaping
            corporate strategies,
          </Text>
        </VStack>
      </Box>
      <Footer />
    </>
  );
};
export default LegalLawProgram;
