import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
  AspectRatio,
} from "@chakra-ui/react";
import Header from "../../Navbar/Header";

const videos = [
  {
    id: 1,
    title: "",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/OtgoOIxkbm8", // FIXED
  },
  {
    id: 2,
    title:
      "Saving Vrindavan Braj is the first objective of my life! I have dedicated my life to protect Thakurji's abode, this is my only goal",
    subtitle: "Trademark Registrati",
    embedUrl: "https://www.youtube.com/embed/-ebqFmxYP3Q", // FIXED
  },
  {
    id: 3,
    title: "Domestic violence ACT 2005",
    subtitle: "LAWVS India's first",
    embedUrl: "https://www.youtube.com/embed/1KtgrgsqDos",
  },
  {
    id: 4,
    title:
      "CAW Cell Kavach | Kya aapke bhi sasural wale pareshan karte hain | FIR darj karne ki poori prakriya",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/8PNvg3PjJmA",
  },
  {
    id: 5,
    title: "Cell proceeding after filing a complaint | Dowry",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/MKBnr5LyBOE",
  },
  {
    id: 6,
    title: "If in-laws harass me, how can I take legal action?",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/mjWbCj8Cy1k",
  },
  {
    id: 7,
    title: "Dowry Case | Dowry Case 498A IPC",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/v6O3jaf19g8",
  },
  {
    id: 8,
    title: "How to start litigation - Young Lawyer",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/IPA5U-MyU3I",
  },
  {
    id: 9,
    title: "Interview : Suryansh Dixit, Join The Revolution",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/O57VEkWvml8",
  },
  {
    id: 10,
    title: "aTrademark : Know the Law to Protect Your Brand!",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/EuriJGPv4iY",
  },
  {
    id: 11,
    title: "Interview : Madhav Goswami, Join The Revolution",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/dzTttVkG414",
  },
  {
    id: 12,
    title: "Lawvs updates- Mehul Bhatnagar, Join The Revolution ",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/gNycAhcCKYc",
  },
  {
    id: 13,
    title: "Lawvs updates- Avadhesh Pratap Singh, Join The Revolution",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/-SSWVVz4aw4",
  },
  {
    id: 14,
    title: "Lawvs updates, Join The Revolution",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/SVeB5g5QHPo",
  },
  {
    id: 15,
    title:
      "LAWVS India's fiirst Portal for legal jobs ,internship sample legal drafts latest judgement",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/R5D8wlvECYo",
  },
  {
    id: 16,
    title:
      "Caste based census and survey_Bihar_Caste_Survey_Report_Reservation",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/pEf7AlYHqF0",
  },
  {
    id: 17,
    title: "Job after Lawschool | Internship opportunity in top Law firm",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/3_cjDrVrIRU",
  },
  {
    id: 18,
    title:
      "aHunt for Junior/Intern🔍 Discover the Perfect Fit for Your Firm/Chamber",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/X4Kt38Dcpnc",
  },
  {
    id: 19,
    title:
      "Free AIBE Mock Exam preparation | Evaluate your Performance lawvs.com",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/bqELo81-Dg8",
  },
  {
    id: 20,
    title: "legal short",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/uKmQf5AuB60",
  },
  {
    id: 21,
    title: "the biggest challenges in our legal system ",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/8PiPKNPrHFE",
  },
  {
    id: 22,
    title: "the importance of safeguarding against false allegations",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/3V-xmTYbXSU",
  },
  {
    id: 23,
    title: "guidance on the steps to take if a false FIR ",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/rUSwwaxHVfE",
  },
  {
    id: 24,
    title: "How Section 125 of the CRPC ensures maintenance",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/hnUYXwsfCcU",
  },
  {
    id: 25,
    title: "If you're facing false allegations in a relationship",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/XYnudXj64ig",
  },
  {
    id: 26,
    title: "VIP culture and made other promises",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/TfCnYjVHjN4",
  },
  {
    id: 27,
    title: "Allegations between political partie",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/gR4JNSBggkM",
  },
  {
    id: 28,
    title: "How action can be taken against false promises",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/CVD0IUGjX5U",
  },
  {
    id: 29,
    title: "Protect a men of dowry, domestic violence ",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/fBtSfBb_5R8",
  },
  {
    id: 30,
    title: "Stable the career in law",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/uQ-UnvmSMr4",
  },
  {
    id: 31,
    title: "Cases of illegal possession of properties",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/wfqjzAvVX8o",
  },
  {
    id: 32,
    title: "We discuss the sensitive issue of live-in relationships",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/Z5IDcY7k8OQ",
  },
  {
    id: 33,
    title: "",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/PnV_zpbcJks",
  },
  {
    id: 34,
    title: "Allegations between political partie",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/We4Vi-EhYNY",
  },
  {
    id: 35,
    title: "Ailet_Exam_2024_AILET Preparation Guide",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/woiIRcKmgzA",
  },
  {
    id: 35,
    title: "CLAT Exam Eligibility Criteria _CLAT 2024 Exam Details ",
    subtitle: "",
    embedUrl: "https://www.youtube.com/embed/ZIBeaUFUiM0",
  },
];

const VideosPage = () => {
  return (
    <>
    <Header/>
    <Container maxW="7xl" py={10}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h2" size="xl" color="goldenrod">
          Videos&News
        </Heading>
        <Link color="goldenrod" fontWeight="bold">
          View All
        </Link>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {videos.map((video) => (
          <VStack
            key={video.id}
            spacing={4}
            align="center"
            borderRadius="md"
            overflow="hidden"
          >
            <AspectRatio w="100%" ratio={16 / 9}>
              <iframe
                title={video.title}
                src={video.embedUrl}
                allowFullScreen
              />
            </AspectRatio>
            <Box textAlign="center">
              <Heading as="h3" size="md" color="goldenrod">
                {video.title}
              </Heading>
              {/* {video.subtitle && <Text color="gray.600">{video.subtitle}</Text>} */}
            </Box>
          </VStack>
        ))}
      </SimpleGrid>
    </Container>
    </>
  );
};

export default VideosPage;
