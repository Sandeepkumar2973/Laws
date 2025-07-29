import React, { useEffect, useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileUpdatePage = () => {
  const [mootUser, setMootUser] = useState(null);
  const toast = useToast();
const Navigate = useNavigate();
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {},
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "participations",
  });

  const userId = JSON.parse(localStorage.getItem("MootUserInfo"));
  const token = userId?.token;
  const UserID = userId?.user.id;

  const getMootUserById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/MootUser/get_mootuser_profile/${UserID}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.data.user) {
        setMootUser(response.data.user);
      } else {
        toast({
          title: "Error",
          description: "User not found",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getMootUserById();
  }, []);

  // 🟢 KEY: When user data changes, reset form with new data:
  useEffect(() => {
    if (mootUser) {
      reset({
        name: mootUser.name,
        college: mootUser.institution,
        yearOfStudy: mootUser.pursuingYear,
        collegeId: mootUser.collegeId || "",
        participations: mootUser.participations || [],
        skillsString: mootUser.skills?.join(", ") || "",
        extraSkill: mootUser.extraSkill || "",
        linkedin: mootUser.linkedin || "",
        twitter: mootUser.twitter || "",
      });
    }
  }, [mootUser, reset]);

  const onSubmit = async (data) => {
    const skills = data.skillsString.split(",").map((s) => s.trim());
    const updatedProfile = {
      collegeId: data.collegeId,
      participations: data.participations,
      skills,
      extraSkill: data.extraSkill,
      linkedin: data.linkedin,
      twitter: data.twitter,
    };

    try {
      const response = await axios.put(
        "http://localhost:8000/api/v1/MootUser/update_mootuser_profile",
        updatedProfile,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      toast({
        title: "Profile Updated!",
        description: response.data.message,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      Navigate("/moot-user-dashboard");
    } catch (error) {
      console.error("Update failed:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Update failed",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

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
          <Avatar size="2xl" name={mootUser?.name} mb={4} />
          <Text fontSize="xl" fontWeight="bold">
            {mootUser?.name}
          </Text>
          <Text>{mootUser?.collegeId}</Text>
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
              <Input {...register("name")} isReadOnly />
            </FormControl>

            <FormControl>
              <FormLabel>College</FormLabel>
              <Input {...register("college")} isReadOnly />
            </FormControl>

            <FormControl>
              <FormLabel>Year of Study</FormLabel>
              <Select {...register("yearOfStudy")} isReadOnly>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="5th Year">5th Year</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>College ID</FormLabel>
              <Input {...register("collegeId")} />
            </FormControl>

            {/* Participations */}
            <Box borderWidth="1px" borderRadius="md" p={4}>
              <Text fontWeight="bold" mb={2}>Participations</Text>
              {fields.map((field, index) => (
                <Box key={field.id} mb={4} p={2} borderWidth="1px" borderRadius="md">
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
                  <Button size="sm" colorScheme="red" onClick={() => remove(index)}>Remove</Button>
                </Box>
              ))}
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() =>
                  append({ competitionName: "", role: "", position: "", year: "" })
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
