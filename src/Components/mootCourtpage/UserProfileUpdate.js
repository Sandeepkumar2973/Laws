import React from "react";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Input,
  FormControl,
  FormLabel,
  Button,
  VStack,
  HStack,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";

const dummyUser = {
  name: "Arjun Kumar",
  college: "National Law School",
  yearOfStudy: "3",
  collegeId: "ILS201023",
  participations: [
    {
      competitionName: "NLU Delhi Moot 2023",
      role: "Certificate",
      position: "Semifinalist",
      year: 2023,
    },
  ],
  skillsString: "Researching, Oral Advocacy",
  extraSkill: "Rissard",
  linkedin: "https://linkedin.com/in/username",
  twitter: "https://twitter.com/username",
};

const ProfileUpdatePage = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: dummyUser,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "participations",
  });

  const onSubmit = (data) => {
    const skills = data.skillsString.split(",").map((s) => s.trim());
    const updated = { ...data, skills };
    console.log("Updated Profile:", updated);
    // Send `updated` to backend
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      minH="100vh"
      bg="gray.50"
    >
      {/* Left Sidebar */}
      <Box
        w={{ base: "100%", md: "30%" }}
        p={6}
        bg="white"
        borderBottomWidth={{ base: "1px", md: "0" }}
        borderRightWidth={{ md: "1px" }}
      >
        <Flex direction="column" align="center">
          <Avatar size="2xl" name={dummyUser.name} mb={4} />
          <Text fontSize="xl" fontWeight="bold">
            {dummyUser.name}
          </Text>
          <Text>{dummyUser.college}</Text>
        </Flex>
      </Box>

      {/* Right Update Form */}
      <Box w={{ base: "100%", md: "70%" }} p={6}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Update Profile
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input {...register("name")} />
            </FormControl>

            <FormControl>
              <FormLabel>College</FormLabel>
              <Input {...register("college")} />
            </FormControl>

            <FormControl>
              <FormLabel>Year of Study</FormLabel>
              <Select {...register("yearOfStudy")}>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>College ID</FormLabel>
              <Input {...register("collegeId")} />
            </FormControl>

            {/* Participation Fields */}
            <Box borderWidth="1px" borderRadius="md" p={4}>
              <Text fontWeight="bold" mb={2}>
                Participations
              </Text>
              {fields.map((field, index) => (
                <Box
                  key={field.id}
                  mb={4}
                  p={2}
                  borderWidth="1px"
                  borderRadius="md"
                >
                  <FormControl mb={2}>
                    <FormLabel>Competition Name</FormLabel>
                    <Input {...register(`participations.${index}.competitionName`)} />
                  </FormControl>
                  <FormControl mb={2}>
                    <FormLabel>Role</FormLabel>
                    <Input {...register(`participations.${index}.role`)} />
                  </FormControl>
                  <FormControl mb={2}>
                    <FormLabel>Position</FormLabel>
                    <Input {...register(`participations.${index}.position`)} />
                  </FormControl>
                  <FormControl mb={2}>
                    <FormLabel>Year</FormLabel>
                    <Input type="number" {...register(`participations.${index}.year`)} />
                  </FormControl>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() =>
                  append({
                    competitionName: "",
                    role: "",
                    position: "",
                    year: "",
                  })
                }
              >
                Add Participation
              </Button>
            </Box>

            <FormControl>
              <FormLabel>Skills (comma separated)</FormLabel>
              <Textarea {...register("skillsString")} />
            </FormControl>

            <FormControl>
              <FormLabel>Extra Skill</FormLabel>
              <Input {...register("extraSkill")} />
            </FormControl>

            <HStack flexWrap="wrap" spacing={4}>
              <FormControl flex="1" minW="200px">
                <FormLabel>LinkedIn</FormLabel>
                <Input {...register("linkedin")} />
              </FormControl>

              <FormControl flex="1" minW="200px">
                <FormLabel>Twitter</FormLabel>
                <Input {...register("twitter")} />
              </FormControl>
            </HStack>

            <Button colorScheme="green" type="submit">
              Save Changes
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default ProfileUpdatePage;
