import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  Button,
} from "@chakra-ui/react";
import { EmailIcon, ChatIcon, PhoneIcon } from "@chakra-ui/icons";
import Header from "../Navbar/Header";
import Footer from "../Navbar/Footer";

const HelpAndSupport = () => {
  return (
    <>
      <Header />
      <Box maxW="800px" mx="auto" p={6}>
        <Heading as="h2" size="xl" mb={4} textAlign="center">
          Help & Support
        </Heading>
        <Text fontSize="lg" textAlign="center" mb={6}>
          Need help with job applications or your profile? Check the FAQs below
          or reach out to our support team.
        </Text>

        {/* FAQ Section */}
        <Accordion allowMultiple mb={8}>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                How do I create an account on the job portal?
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              Click on the "Sign Up" button on the top right, fill in your
              details, and verify your email to activate your account.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                How can I apply for a job?
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              Once logged in, go to the "Jobs" section, select the job you’re
              interested in, and click on "Apply". Make sure your profile and
              resume are updated before applying.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Can I update my resume after applying?
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              Yes, you can update your resume anytime in your profile. However,
              the updated resume may not replace the one already submitted to
              employers.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                How do I track my job applications?
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              Go to the "My Applications" section in your dashboard to check the
              status of jobs you have applied for.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                What should I do if I forget my password?
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              Click on "Forgot Password" on the login page and follow the
              instructions to reset your password via email.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Divider mb={6} />

        {/* Contact Section */}
        <VStack spacing={4}>
          <Heading as="h3" size="lg">
            Contact Support
          </Heading>
          <Text>Still need help? Reach out to us:</Text>
          <Button
            leftIcon={<EmailIcon />}
            colorScheme="blue"
            variant="outline"
            as="a"
            href="mailto:info@lawvs.com"
          >
            info@lawvs.com
          </Button>
          <Button
            leftIcon={<PhoneIcon />}
            colorScheme="green"
            variant="outline"
          >
            +91 81719 74067
          </Button>
          <Button leftIcon={<ChatIcon />} colorScheme="teal" variant="solid">
            Chat
          </Button>
        </VStack>
      </Box>
      <Footer />
    </>
  );
};

export default HelpAndSupport;
