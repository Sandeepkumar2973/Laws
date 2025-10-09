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

const LegalLawJobs = () => {
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
            Legal Law Jobs
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
            Embarking on a career in law is much like stepping into a labyrinth
            of possibilities, shaped by the diverse demands of justice and the
            intricacies of the legal system.
            <br />
            <br /> In this article, we unravel a plethora of legal careers,
            shedding light on roles ranging from the courtroom drama of
            litigators to the strategic counsel provided by corporate attorneys.
            Explore the responsibilities, specialities, and average salaries
            that define these legal professions, guiding you through the maze to
            discover the legal career that resonates with your passion and
            qualifications.
            <br />
            <br /> Whether you're curious about legal law jobs and vacancies or
            seeking insights into various legal pathways, this exploration is
            tailored to illuminate your journey in the dynamic world of law.
            Let’s delve deep into the various legal jobs and vacancies in the
            market for aspiring legal professionals. They are listed as follows:
          </Text>
          <Heading as="h2" size="md" mb={2}>
            Associate Attorney
          </Heading>

          <UnorderedList>
            <ListItem>
              Responsibilities: As an entry-level role often found in law firms,
              associate attorneys contribute to jury selection, represent
              clients in court, and assist in negotiating contracts or resolving
              corporate disputes.
            </ListItem>
            <ListItem>Salary: $78,510 per year</ListItem>
          </UnorderedList>
          <Heading as="h2" size="md" mb={2}>
            Associate General Counsel
          </Heading>
          <UnorderedList>
            <ListItem>
              Responsibilities: Functioning as a legal representative for
              individuals or organizations, associate general counsels advise on
              potential legal actions arising from malpractice and collaborate
              with legal teams to build strong cases.
            </ListItem>
            <ListItem>Salary: $85,913 per year</ListItem>
          </UnorderedList>
          <Heading as="h2" size="md" mb={2}>
            Bankruptcy Paralegal
          </Heading>
          <UnorderedList>
            <ListItem>
              Responsibilities: Playing a crucial role in assisting bankruptcy
              lawyers, bankruptcy paralegals provide clients with advice on
              financial situations, eligibility for bankruptcy, and guidance on
              the filing process.
            </ListItem>
            <ListItem>Salary: $54,767 per year</ListItem>
          </UnorderedList>
          <Heading as="h2" size="md" mb={2}>
            Contracts Lawyer
          </Heading>
          <UnorderedList>
            <ListItem>
              Responsibilities: Specializing in contract matters, contract
              lawyers offer legal advice on signing agreements and assist
              clients in navigating contractual challenges.
            </ListItem>
            <ListItem>Salary: $108,771 per hour</ListItem>
          </UnorderedList>
          <Heading as="h2" size="md" mb={2}>
            Corporate Lawyer
          </Heading>
          <UnorderedList>
            <ListItem>
              Responsibilities: Operating within companies, corporate lawyers
              advise executives to prevent legal issues, represent companies in
              legal actions, and ensure corporate contracts adhere to legal
              standards.
            </ListItem>
            <ListItem>Salary: $132,786 per hour</ListItem>
          </UnorderedList>
          <Heading as="h2" size="md" mb={2}>
            Corporate Attorney
          </Heading>
          <UnorderedList>
            <ListItem>
              Responsibilities: Corporate attorneys get tremendous opportunities
              in the world in terms of legal law jobs and vacancies. Acting as
              legal advisors to corporations, corporate attorneys offer counsel
              on optimal business practices, draft legal documents, and, when
              required, advocate for the company in a court of law.
            </ListItem>
            <ListItem>Salary: $135,843 per year</ListItem>
          </UnorderedList>
          <Heading as="h2" size="md" mb={2}>
            Employment Lawyer
          </Heading>
          <UnorderedList>
            <ListItem>
              Responsibilities: Acting as mediators, employment lawyers settle
              disputes in employee contracts and defend clients, whether
              employees or employers, facing maltreatment allegations.
            </ListItem>
            <ListItem>Salary: $117,877 per year</ListItem>
          </UnorderedList>
          <Heading as="h2" size="md" mb={2}>
            Family Lawyer
          </Heading>
          <UnorderedList>
            <ListItem>
              Responsibilities: Handling a spectrum of family-related matters,
              family lawyers defend clients in divorce proceedings, child
              custody battles, and child support claims.
            </ListItem>
            <ListItem>Salary: $129,194 per year</ListItem>
          </UnorderedList>
          <Heading as="h2" size="md" mb={2}>
            General Practice Lawyer
          </Heading>
          <UnorderedList>
            <ListItem>
              Responsibilities: Operating without a specific specialization,
              general practice lawyers consult on various legal issues,
              providing a broad range of legal services.
            </ListItem>
            <ListItem>Salary: $50,797 per year</ListItem>
          </UnorderedList>
          <Heading as="h2" size="md" mb={2}>
            Immigration Lawyer
          </Heading>
          <UnorderedList>
            <ListItem>
              Responsibilities: Assisting clients with immigration challenges,
              immigration lawyers work on issues related to green cards, visas,
              citizenship documentation, and asylum cases
            </ListItem>
            <ListItem>Salary: $66,891 per year</ListItem>
          </UnorderedList>
          <Heading as="h2" size="md" mb={2}>
            Intellectual Property Lawyer
          </Heading>
          <UnorderedList>
            <ListItem>
              Responsibilities: Focused on intellectual property rights and
              trademarks, these legal professionals assist clients in cases of
              unauthorized use or help individuals and companies protect their
              intellectual assets. Explore the opportunities in legal law jobs
              and vacancies within this specialized field, where intellectual
              property lawyers play a crucial role in safeguarding creative and
              innovative endeavours.
            </ListItem>
            <ListItem>Salary: $84,952 per year</ListItem>
          </UnorderedList>
          <Heading as="h2" size="md" mb={2}>
            Litigation Attorney
          </Heading>
          <UnorderedList>
            <ListItem>
              Responsibilities: Engaged in civil lawsuits, litigation attorneys
              guide clients through legal processes, from pre-trial events to
              defence strategies and appeals.
            </ListItem>
            <ListItem>Salary: $101,002 per year</ListItem>
          </UnorderedList>
          <Heading as="h2" size="md" mb={2}>
            Litigation Paralegal
          </Heading>
          <UnorderedList>
            <ListItem>
              Responsibilities: A litigation paralegal is responsible for
              helping trial attorneys prepare for courtroom proceedings. They
              draft documents, complete administrative tasks, interview
              witnesses and conduct additional research ahead of the trial.
            </ListItem>
            <ListItem>Salary: $53,269 per year</ListItem>
          </UnorderedList>
          <Heading as="h2" size="md" mb={2}>
            Personal injury lawyer
          </Heading>
          <UnorderedList>
            <ListItem>
              Responsibilities: A personal injury lawyer is responsible for
              helping clients who have sustained injuries, whether it be through
              a car accident or an injury acquired on a company's property. They
              plead their case to help a client get compensation for their
              injury.
            </ListItem>
            <ListItem>Salary: $91,422 per year</ListItem>
          </UnorderedList>
          <Heading as="h2" size="md" mb={2}>
            Trademark paralegal
          </Heading>
          <UnorderedList>
            <ListItem>
              Responsibilities: A trademark paralegal works for a trademark
              attorney and is responsible for helping clients file claims for
              names and logos. They are responsible for assisting trademark
              attorneys in the creation of courtroom cases against an individual
              or company who stole a trademark from their client.
            </ListItem>
            <ListItem>Salary: $73,565 per year</ListItem>
          </UnorderedList>
          <Text fontSize="md" textAlign="justify">
            In conclusion, a career in law offers a spectrum of opportunities,
            each with its unique set of challenges and rewards. Whether your
            passion lies in the courtroom battles of litigation or the strategic
            advisory role in corporate law, understanding the nuances of diverse
            legal roles is pivotal to navigating a successful and fulfilling
            career. This comprehensive resource serves as a valuable compass,
            providing insights into the intricacies of various legal pathways
            and offering guidance for those exploring legal jobs and vacancies.
            As you embark on your journey in the dynamic field of law, may this
            guide illuminate your path and empower you to make informed
            decisions as you chart your course in the fascinating world of legal
            professions.
          </Text>
        </VStack>
      </Box>
      <Footer />
    </>
  );
};
export default LegalLawJobs;
