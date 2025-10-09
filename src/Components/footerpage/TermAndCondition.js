import {
  Box,
  Container,
  Heading,
  ListItem,
  OrderedList,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import react from "react";
import Header from "../Navbar/Header";
import Footer from "../Navbar/Footer";

const TermsAndConditions = () => {
  return (
    <>
      <Header />
      <Box
        w="100%"
        minH={{ base: "15vh", md: "40vh", lg: "40vh" }}
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
          <Heading
            as="h1"
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            mb={6}
            lineHeight="1.3"
            textAlign="left"
          >
            Terms And Conditions
          </Heading>

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
          <Heading as="h2" size="md" mb={2}>
            TERMS AND CONDITIONS
          </Heading>

          <Text fontSize="md" textAlign="justify" mb={1}>
            LAWVS.com, often known as the "Platform," serves as a comprehensive
            platform for advertising employment opportunities and internships
            for legal professionals and potential recruits.
          </Text>
          <Heading as="h2" size="md" mb={1}>
            1. ACCEPTANCE OF TERMS
          </Heading>
          <Text fontSize="md" textAlign="justify" mb={1}>
            By accessing or using the Platform, including its website at
            https://www.lawvs.com (the "Website"),and utilising the services
            provided therein, you, the Platform user("User," "Applicant,"
            "Advertiser," or "Member"), hereby acknowledge that you have
            carefully read, understood, and agree to be legally bound by the
            Terms and Conditions ("Terms"). Furthermore, you agree that our
            Cookie Policy and Privacy Policy, both of which are incorporated
            herein by reference, are an essential part of this Agreement. If you
            choose to terminate this Agreement, you may do so by stopping usage
            of the Platform and, if applicable, deleting your account. If you
            are accepting these Terms on behalf of a company, group,
            governmental body, or any other legal entity, you guarantee and
            represent that (a) you have the legal authority to do so, (b) the
            entity accepts these Terms, and (c) neither you nor the entity is
            prohibited from using the Platform or accepting these Terms by the
            laws of the relevant jurisdiction.
          </Text>

          <Text fontSize="md" textAlign="justify" mb={1}>
            1.1 Personal data The personal data that is submitted to us,
            obtained by us, or processed in connection with the use of our
            Website is controlled by us as the Platform. The gathering, use, and
            sharing of your personal information as a User or Member of the
            Platform is governed by our Privacy Policy and Cookie Policy, as set
            out in those policies.
          </Text>

          <Text fontSize="md" textAlign="justify" mb={1}>
            1.2 Users: People who access or browse the LAWVS.com website without
            registering an account or giving personal information are referred
            to as users. Members: Individuals who register for a LAWVS.com
            account, enter personal information, and access extra features and
            services are referred to as members.
          </Text>
          <Text mb={1}>
            1.3.1 Users: Users refer to individuals who visit or access the
            LAWVS.com website without creating an account or providing personal
            information. 1.3.2 Members: Members refer to individuals who create
            an account on LAWVS.com, providing personal information and
            accessing additional features and services available to registered
            members.
          </Text>

          <Heading as="h2" size="md" mb={1}>
            2. USE OF WEBSITES
          </Heading>
          <Text mb={1}>
            2.1. Qualification You guarantee and declare that you are at least
            18 years old and have the legal ability to enter into this Agreement
            by using this Website. You must be the minor's parent or legal
            guardian and have the power to bind them to this Agreement if you
            are using this Website on behalf of a minor.
          </Text>
          <Text mb={1}>
            2.2. Opening an Account In order to use certain of LAWVS.com's
            features and services, members must first register. During the
            registration process, you promise to give true, full, and current
            information. You also promise to immediately update your account
            information if something changes.
          </Text>
          <Text mb={1}>
            2.2.1 You alone are in charge of protecting the privacy of your
            account information, including your login and password. All actions
            taken on your behalf while using your account are your
            responsibility. You must let LAWVS.com know right away if you think
            your account has been used without your permission.
          </Text>
          <Text mb={1}>
            2.3 Prohibited Behaviour You acknowledge that you will not use this
            website or the services for any illegal or forbidden activities,
            such as, but not limited to: posting erroneous, deceptive, or
            fraudulent data. b. Breaking any rules, laws, or rights of third
            parties. Uploading or sending any malicious data, such as malware,
            viruses, or destructive code. d. Interfering with the Website's or
            Services' functioning or security. Taking part in any unauthorised
            data collecting or scraping activities. f. Pretending to be someone
            else or something else, or misrepresenting your association with
            someone or something.
          </Text>
          <Text mb={1}>
            2.3.2 If you participate in prohibited activity or violate these
            Terms of Use, LAWVS.com has the right to suspend or cancel your
            account and restrict your access to the Website and Services.
          </Text>
          <Heading as="h2" size="md" mb={1}>
            3. POSTINGS FOR JOBS AND INTERNSHIPS
          </Heading>
          <Text mb={1}>
            3.1 Postings for Jobs LAWVS.com offers a venue for posting job
            openings in the legal industry. Posting of job postings that include
            job descriptions, prerequisites, and application guidelines is
            permitted by employers or authorised representatives.
          </Text>
          <Text mb={1}>
            3.1.2 LAWVS.com makes no claims on the appropriateness, correctness,
            or comprehensiveness of the job advertisements. It is the
            applicant's obligation to confirm the information and determine
            whether any employment opportunities are suitable for them.
          </Text>
          <Text mb={1}>
            3.2 Postings for Internships A forum for posting internships in the
            legal industry is offered by LAWVS.com. Internship opportunities may
            be posted by employers or authorised representatives, together with
            information on the programme, prerequisites, and application
            procedure.
          </Text>
          <Text mb={1}>
            3.2.1 The internships listed on LAWVS.com are neither recommended
            nor guaranteed. It is the applicant's duty to do due investigation
            and determine whether any internship opportunity is appropriate.
          </Text>
        </VStack>
        <VStack align="flex-start" spacing={6} textAlign={"justify"}>
          <Heading as="h2" size="md" mb={1}>
            4. LIMITATIONS OF LIABILITY AND DISCLAIMERS
          </Heading>
          <Text fontSize="md" textAlign="justify" mb={1}>
            4.1 Website Content Only general informative objectives are served
            by the data and material on LAWVS.com. They do not create an
            attorney-client relationship or constitute legal advice. Users
            should consult a lawyer for guidance on their individual situations.
          </Text>
          <Text mb={1}>
            4.1.2 LAWVS.com does not support or advocate any specific
            internship, job posting, company, or candidate.
          </Text>
          <Text mb={1}>
            4.2 Third-Party Websites and Services, Section LAWVS.com could
            include links to or mentions of other websites or services. These
            links are presented for your convenience and do not signify that we
            approve or are in charge of the information, goods, or services
            provided by those third parties.
          </Text>
          <Text mb={1}>
            4.2.2 You recognise and concur that you use any third-party websites
            or services at your own risk and that it is your own responsibility
            to evaluate and abide by their terms of service.
          </Text>
          <Text mb={1}>
            4.3. Liability Limitation To the fullest extent permissible by law,
            LAWVS.com, its affiliates, directors, officers, employees, and
            agents will not be liable for any direct, indirect, incidental,
            special, or consequential losses resulting from or related to your
            use of the website.
          </Text>
          <Box mb={1}>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              5. INTELLECTUAL PROPERTY
            </Text>
            <Text fontSize="md" textAlign="justify" mb={4}>
              5.1 Ownership LAWVS.com and its licensors own the full ownership
              of the Website, Services, and all associated intellectual property
              rights, including but not limited to copyrights, trademarks, and
              trade secrets.
            </Text>
            <Text>
              5.1.2 In line with these Terms, you are given a limited,
              non-exclusive, and non-transferable licence to access and use the
              Website and Services only for your own personal and non-commercial
              use.
            </Text>
            <Text>
              5.2 User Content You grant LAWVS.com a worldwide, royalty-free,
              perpetual, irrevocable, sublicensable, and transferable licence to
              use, reproduce, modify, adapt, publish, translate, distribute,
              perform, and display the content in connection with the operation
              of the Website and Services by submitting any content, including
              job applications, resumes, or other materials, to LAWVS.com.
            </Text>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              6. CANCELLATION
            </Text>
            <Text>
              6.1. User Termination You have the option to end this Agreement at
              any time by stopping usage of the Website and Services and, if
              applicable, deleting your account.
            </Text>
            <Text>
              6.2 Termination by LAWVS.com, clause For any cause, including but
              not limited to infraction of these Terms of Use, LAWVS.com may at
              any time without prior notice cancel this Agreement or stop your
              access to the Website and Services.
            </Text>
          </Box>
        </VStack>
        <VStack align="flex-start" spacing={6} textAlign="justify">
          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              7. GENERAL REQUIREMENTS
            </Text>
            <Text fontSize="md" textAlign="justify" mb={4}>
              7.1 Modification of Terms These Terms of Use may be changed or
              updated at any time by LAWVS.com. The revised Terms take effect
              when they are published on the website. It is your duty to
              frequently check the Terms for any modifications.
            </Text>

            <Text fontSize="md" mb={2}>
              7.2 Severability The remaining parts of these Terms shall remain
              valid, legal, and enforceable even if one or more of them is found
              to be invalid, unlawful, or unenforceable.
            </Text>
            <Text fontSize="md" mb={2}>
              7.3. Jurisdiction and Governing Law The laws of [Jurisdiction]
              shall govern these terms of use and be followed in their
              interpretation. The courts of [Jurisdiction] shall have exclusive
              jurisdiction over any disputes arising out of or related to these
              Terms.
            </Text>
            <Text fontSize="md" mb={2}>
              7.4 Complete Agreement These Terms of Use replace any prior
              agreements or understandings, whether written or oral, and along
              with the integrated Privacy Policy and Cookie Policy, comprise the
              entire agreement between you and LAWVS.com governing your use of
              the Website and Services.
            </Text>
            <Text>
              You accept that you have read, comprehended, and agree to be bound
              by these Terms & Conditions by accessing or using LAWVS.com.
            </Text>
          </Box>
        </VStack>
      </Box>
      <Footer />
    </>
  );
};
export default TermsAndConditions;
