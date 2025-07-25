import React from "react";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Badge,
  Progress,
  VStack,
  HStack,
  IconButton,
  Link,
  List,
  ListItem,
  ListIcon,
  Divider,
} from "@chakra-ui/react";
import { FaLinkedin, FaTwitter, FaCheckCircle } from "react-icons/fa";

const dummyUser = {
  name: "Arjun Kumar",
  college: "National Law School",
  yearOfStudy: "3rd",
  collegeId: "ILS201023",
  participations: [
    {
      competitionName: "NLU Delhi Moot 2023",
      role: "Certificate",
      position: "Semifinalist",
      year: 2023,
    },
    {
      competitionName: "RMLNLU Moot 2022",
      role: "Leader",
      position: "1st Place",
      year: 2021,
    },
    {
      competitionName: "HNLU Moot 2021",
      role: "Researcher",
      position: "Quarterfinalist",
      year: 2021,
    },
  ],
  totalPoints: 1500,
  badges: ["Best Speaker", "Winner", "Rising Star", "Rising Star"],
  skills: ["Researching", "Oral Advocacy", "Legal Writing"],
  extraSkill: "Rissard",
  linkedin: "https://linkedin.com/in/username",
  twitter: "https://twitter.com/username",
};

const DashboardPage = () => {
  const user = dummyUser;

  return (
    <Flex direction={{ base: "column", md: "row" }} minH="100vh" bg="gray.50">
      {/* Left Sidebar */}
      <Box
        w={{ base: "100%", md: "30%" }}
        p={6}
        bg="white"
        borderBottomWidth={{ base: "1px", md: "0" }}
        borderRightWidth={{ md: "1px" }}
      >
        <Flex direction="column" align="center">
          <Avatar size="2xl" name={user.name} mb={4} />
          <Text fontSize="xl" fontWeight="bold">
            {user.name}
          </Text>
          <Text>{user.college}</Text>
          <Text>{user.yearOfStudy} Year</Text>
          <Text>College ID: {user.collegeId}</Text>
        </Flex>
      </Box>

      {/* Right Content */}
      <Box w={{ base: "100%", md: "70%" }} p={6}>
        {/* Participation & History */}
        <Box mb={6}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Participation & History
          </Text>
          {user.participations.map((item, index) => (
            <Flex
              key={index}
              justify="space-between"
              flexWrap="wrap"
              p={2}
              borderBottomWidth="1px"
              gap={2}
            >
              <Text flex="1">{item.competitionName}</Text>
              <Text flex="1">{item.role}</Text>
              <Text flex="1">{item.position}</Text>
              <Text flex="1">{item.year}</Text>
            </Flex>
          ))}
          <Text mt={4} fontWeight="bold">
            Total points: {user.totalPoints}
          </Text>
        </Box>

        <Divider mb={6} />

        {/* Badges & Achievements */}
        <Box mb={6}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Badges & Achievements
          </Text>
          <HStack spacing={2} mb={4} flexWrap="wrap">
            {user.badges.map((badge, index) => (
              <Badge
                key={index}
                colorScheme="yellow"
                px={3}
                py={1}
                borderRadius="md"
              >
                {badge}
              </Badge>
            ))}
          </HStack>
          <Progress value={70} colorScheme="blue" size="sm" />
        </Box>

        <Divider mb={6} />

        {/* Skills & Expertise */}
        <Flex gap={4} mb={6} flexDirection={{ base: "column", md: "row" }}>
          <Box flex="1" p={4} borderWidth="1px" borderRadius="md">
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Skills & Expertise
            </Text>
            <List spacing={2}>
              {user.skills.map((skill, index) => (
                <ListItem key={index}>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  {skill}
                </ListItem>
              ))}
            </List>
          </Box>
          <Box flex="1" p={4} borderWidth="1px" borderRadius="md">
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Other Expertise
            </Text>
            <Text>{user.extraSkill}</Text>
          </Box>
        </Flex>

        <Divider mb={6} />

        {/* Social Links */}
        <Box>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Social Links & Contact
          </Text>
          <HStack spacing={4} flexWrap="wrap">
            <Link href={user.linkedin} isExternal>
              <IconButton icon={<FaLinkedin />} aria-label="LinkedIn" />
            </Link>
            <Link href={user.twitter} isExternal>
              <IconButton icon={<FaTwitter />} aria-label="Twitter" />
            </Link>
          </HStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default DashboardPage;
