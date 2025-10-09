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

const PrivacyAndPolicy = () => {
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
          {/* Heading */}
          <Heading
            as="h1"
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            mb={6}
            lineHeight="1.3"
            textAlign="left" // 🔹 Always left aligned
          >
            Privacy And Policy
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
        <VStack align="flex-start" spacing={5} textAlign={"justify"}>
          <Heading as="h2" size="md">
            INTRODUCTION
          </Heading>

          <Text fontSize="md" textAlign="justify">
            LAWVS is intended to meet the needs of both law students and
            professionals. Our service strives to make the recruiting process
            easier for companies by allowing them to look for and access resumes
            of competent persons in the legal sector.
          </Text>

          <Text fontSize="md" textAlign="justify">
            Users may benefit from a centralised platform that links them with
            relevant opportunities, knowledge, and a community of like-minded
            individuals by utilising LAWVS and its associated Services. LAWVS
            attempts to provide a comprehensive and user-friendly experience,
            whether you are a law student looking for internships, a legal
            professional looking for job vacancies or networking possibilities,
            or an organisation looking for suitable people.
          </Text>

          <Text fontSize="md" textAlign="justify">
            Before using LAWVS, we advise all users to properly read and
            comprehend these policies. If you have any questions, issues, or
            need additional clarification, please contact our support staff
            using the information given. Please keep in mind that the material
            provided here is merely for illustration purposes and should be
            checked by legal specialists to guarantee compliance with local laws
            and regulations.
          </Text>

          <Text fontSize="md" textAlign="justify">
            We encourage all users to carefully review and understand these
            policies before engaging with LAWVS. Should you have any questions,
            concerns, or require further clarification, please feel free to
            contact our support team via the provided contact information.
          </Text>

          <Text fontSize="sm" color="gray.600" textAlign="justify">
            <b>Note:</b> This information is for illustrative purposes only and
            should be reviewed by legal professionals to ensure compliance with
            local laws and regulations.
          </Text>
          <Heading as="h2" size="md">
            DEDICATION TO DATA PROTECTION
          </Heading>
          <Text>
            LAWVS.com is committed to protecting your personal information and
            honouring your right to privacy. We are committed to protecting the
            confidentiality and security of the information we gather from you.
            This dedication to data security is ingrained in our beliefs and
            principles. Transparency is essential to our approach to data
            privacy. We make every effort to give you clear and simple
            information about the personal data we collect, how it is used, and
            who it may be shared with. This commitment guarantees that you fully
            understand how your information is handled and that you are able to
            make informed decisions.
          </Text>
          <Text>
            Transparency is a cornerstone of our approach to data privacy. We
            strive to provide you with clear and concise information about the
            personal data we collect, how it is used, and the parties with whom
            it may be shared. This commitment ensures that you have a complete
            understanding of how your information is handled and empowers you to
            make informed decisions.
          </Text>
          <Heading as="h2" size="md">
            Our Data Collection Methodologies:
          </Heading>
          <Text>
            We may gather certain personal information from you when you
            interact with our website or use our legal services. This may
            include, but is not limited to, your name, contact information,
            email address, and any other pertinent information required to
            provide you with the services you desire.
          </Text>
        </VStack>
        <VStack align="flex-start" spacing={6} textAlign={"justify"}>
          <Heading as="h2" size="md">
            How We Use Your Information:
          </Heading>
          <Text fontSize="md" textAlign="justify">
            We gather personal information for the sole purpose of providing
            legal services, engaging with you, and meeting our professional
            duties. We may use your information to:
          </Text>

          <OrderedList spacing={3} pl={5}>
            <ListItem>
              Respond to your enquiries and supply the requested information.
            </ListItem>
            <ListItem>
              Any information you supply for the purpose of locating an
              appropriate legal representative or corporate organisation will be
              kept strictly secret. Your personal information and preferences
              will be used solely to facilitate the matching process and will
              not be shared with any third parties without your specific
              permission.
            </ListItem>
            <ListItem>
              We are devoted to safeguarding your personal information and
              ensuring that it is only used to provide you with the most
              qualified individuals for legal job posts.
            </ListItem>
            <ListItem>
              Based on your input and choices, we will improve our website and
              services.
            </ListItem>
          </OrderedList>

          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              Data Sharing and Disclosure:
            </Text>
            <Text fontSize="md" textAlign="justify" mb={4}>
              We appreciate the significance of confidentiality in the legal
              profession, and we handle your personal information with great
              care. We never sell, trade, or rent your personal information to
              third parties for marketing reasons. However, there may be times
              when we must disclose your information with trustworthy third
              parties, such as:
            </Text>

            <OrderedList spacing={3} pl={5}>
              <ListItem>
                <b>Service Providers:</b> We may work with respected service
                providers to help us offer legal services and manage our
                operations. These service providers are bound by stringent
                confidentiality agreements and are only permitted to use your
                information for the purposes mentioned.
              </ListItem>
              <ListItem>
                <b>Legal Obligations:</b> We may be compelled to release your
                personal information in certain instances to comply with
                relevant laws, rules, or legal proceedings. We shall make every
                effort to ensure that any such disclosure is made legally.
              </ListItem>
            </OrderedList>
          </Box>
        </VStack>
        <VStack align="flex-start" spacing={6} textAlign="justify">
          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              Your Rights and Options:
            </Text>
            <Text fontSize="md" textAlign="justify" mb={4}>
              We respect your personal data rights and give you alternatives for
              managing and controlling the information you send to us. You have
              the legal right to:
            </Text>

            <Text fontSize="md" mb={2}>
              <b>Access and Correction:</b> You may request access to the
              personal information we hold about you and have the right to
              rectify any inaccuracies.
            </Text>
            <Text fontSize="md" mb={2}>
              <b>Opt-out:</b> You can opt-out of receiving informational
              communications from us at any time by contacting us directly.
            </Text>
            <Text fontSize="md" mb={2}>
              <b>Data Retention:</b> We will retain your personal information
              only for as long as necessary to fulfil the purposes outlined in
              this commitment, unless a longer retention period is required or
              permitted by law.
            </Text>
          </Box>

          {/* Security Measures */}
          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              Security Measures for Data:
            </Text>
            <Text fontSize="md" textAlign="justify">
              To protect your personal information from unauthorised access,
              disclosure, modification, or destruction, we use industry-standard
              security measures. We examine and improve our security practises
              on a regular basis to guarantee that your data is safe from
              emerging threats.
            </Text>
          </Box>

          {/* Contact Section */}
          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              Please contact us at:
            </Text>
            <Text fontSize="md" textAlign="justify">
              Please contact us if you have any questions, complaints, or
              requests about our data protection practices. We are here to
              resolve any concerns and offer you with the information you need
              to feel confident in our legal services. Your privacy is our top
              priority, and we are dedicated to preserving the greatest data
              protection standards. You may be confident that by giving us your
              personal information, we will manage it with care, honesty, and in
              line with applicable data protection laws and regulations.
            </Text>
          </Box>
        </VStack>
      </Box>
      <Footer />
    </>
  );
};
export default PrivacyAndPolicy;
