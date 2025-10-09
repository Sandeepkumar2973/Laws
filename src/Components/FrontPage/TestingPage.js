import { useState } from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Icon,
  Button,
  Input,
  useColorModeValue,
  FormControl,
  FormLabel,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  IconButton,
  SimpleGrid,
  Textarea,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { CheckCircleIcon, HamburgerIcon } from "@chakra-ui/icons";
import Header from "../Navbar/Header";

const STEPS = [
  {
    title: "Applicant Details",
    fields: [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        placeholder: "Enter case details here...",
        required: true,
      },

      {
        name: "address",
        label: "Full Address",
        required: true,
        type: "text",
        placeholder: "Enter case details here...",
      },
      {
        name: "mobile",
        label: "Mobile Number",
        type: "text",
        placeholder: "Enter case details here...",
        required: true,
      },
      {
        name: "email",
        label: "Email id",
        type: "email",
        placeholder: "Enter case details here...",
      },
      {
        name: "breif Detail",
        label: "Breif Detail",
        type: "textarea",
        placeholder: "write brief details about yourself and case details ",
        required: true,
      },
    ],
  },
  {
    title: "Opposition Party Details",
    fields: [
      {
        name: "PartyfullName",
        label: "Full Name",
        type: "text",
        placeholder: "Enter case details here...",
        required: true,
      },

      {
        name: "Partyaddress",
        label: "Full Address",
        type: "textarea",
        required: true,
        placeholder: "Enter case details here...",
      },
      {
        name: "Partymobile",
        label: "Mobile Number",
        type: "text",
        required: true,
        placeholder: "Enter case details here...",
      },
      {
        name: "Partyemail",
        label: "Email id",
        type: "email",
        placeholder: "Enter case details here...",
      },
      {
        name: "concernperson",
        label: "Concern Person",
        type: "text",
        required: true,
        placeholder: "Enter case details here...",
      },
      {
        name: "PartybreifDetail",
        label: "Breif Detail",
        type: "textarea",
        required: true,
        placeholder: "write brief details about yourself and case details ",
      },
    ],
  },
  {
    title: "Ducoments ",
    fields: [
      {
        name: "Document",
        label: "Upload multiple Ducoments",
        type: "file",
        required: true,
      },
    ],
  },
  {
    title: "Review",
    fields: [],
  },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [completedSteps, setCompletedSteps] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showSuccess, setShowSuccess] = useState(false);
  const sidebarBg = useColorModeValue("gray.50", "gray.800");
  const activeBg = useColorModeValue("purple.100", "purple.700");

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const fields = STEPS[currentStep].fields;
  const activeField = fields[currentSubStep];
  const handleNextField = () => {
    if (currentSubStep < fields.length - 1) {
      setCurrentSubStep((prev) => prev + 1);
    } else {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }

      // ✅ Step complete message show
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false); // hide message
        setCurrentStep((prev) => prev + 1); // move next step
        setCurrentSubStep(0);
      }, 1000); // 1 second बाद disappear + next step
    }
  };
  // const handleNextField = () => {
  //   if (currentSubStep < fields.length - 1) {
  //     setCurrentSubStep((prev) => prev + 1);
  //   } else {
  //     if (!completedSteps.includes(currentStep)) {
  //       setCompletedSteps((prev) => [...prev, currentStep]);
  //     }
  //     setCurrentStep((prev) => prev + 1);
  //     setCurrentSubStep(0);
  //   }
  // };

  const handleBack = () => {
    if (currentSubStep > 0) {
      setCurrentSubStep((prev) => prev - 1);
    } else if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setCurrentSubStep(STEPS[prevStep].fields.length - 1);
    }
  };
  const handleSkip = () => {
    if (currentSubStep < fields.length - 1) {
      setCurrentSubStep((prev) => prev + 1);
    } else {
      // if last sub-step, same behavior as Next
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }
      setCurrentStep((prev) => prev + 1);
      setCurrentSubStep(0);
    }
  };

  const SidebarContent = () => (
    <VStack align="start" spacing={4} p={5}>
      {STEPS.map((step, stepIndex) => {
        const isActive = stepIndex === currentStep;
        const isCompleted = completedSteps.includes(stepIndex);

        return (
          <HStack
            key={stepIndex}
            spacing={3}
            w="100%"
            p={2}
            rounded="md"
            bg={isActive ? activeBg : "transparent"}
            cursor={
              stepIndex <= currentStep || isCompleted
                ? "pointer"
                : "not-allowed"
            }
            onClick={() => {
              if (stepIndex <= currentStep || isCompleted) {
                setCurrentStep(stepIndex);
                setCurrentSubStep(0);
                onClose();
              }
            }}
          >
            <Icon
              as={CheckCircleIcon}
              color={
                isCompleted ? "green.400" : isActive ? "purple.500" : "gray.400"
              }
            />
            <Text
              fontWeight={isActive ? "bold" : "normal"}
              color={isCompleted ? "green.600" : "inherit"}
            >
              {step.title}
            </Text>
          </HStack>
        );
      })}
    </VStack>
  );

  const currentFields = STEPS[currentStep].fields;
  const filledCount = currentFields.filter(
    (f) => formData[f.name] && formData[f.name].toString().trim() !== ""
  ).length;
  const totalFields = currentFields.length;

  const handleSubmit = async () => {
    try {
      const formDataObj = new FormData();

      // append normal fields
      Object.keys(formData).forEach((key) => {
        if (key !== "Document") {
          formDataObj.append(key, formData[key]);
        }
      });

      // append multiple files
      if (formData.Document && formData.Document.length > 0) {
        Array.from(formData.Document).forEach((file) => {
          formDataObj.append("Ducoments", file);
        });
      }

      const res = await fetch("http://localhost:5000/api/cases", {
        method: "POST",
        body: formDataObj,
      });

      const data = await res.json();
      if (data.success) {
        alert("Case Created Successfully ✅");
        console.log(data.data);
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Header />
      <Flex minH="100vh" direction={{ base: "column", md: "row" }} m={5}>
        {/* Sidebar (desktop) */}
        <Box
          w="260px"
          // bg={sidebarBg}
          shadow="md"
          display={{ base: "none", md: "block" }}
        >
          <Text fontSize="xl" fontWeight="bold" mb={6}>
            Step {currentStep + 1} /{STEPS.length}
          </Text>
          <SidebarContent />
        </Box>

        {/* Mobile Menu Button */}
        <Box display={{ base: "block", md: "none" }} p={4}>
          <IconButton
            aria-label="Open Menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
          />
        </Box>

        {/* Mobile Sidebar Drawer */}
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>Steps</DrawerHeader>
            <DrawerBody>
              <SidebarContent />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        {/* success message */}
        {showSuccess && (
          <Box
            position="fixed"
            top="0"
            left="0"
            w="100%"
            h="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="rgba(0,0,0,0.5)"
            zIndex="9999"
          >
            <Alert
              status="success"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px"
              w="400px"
              borderRadius="md"
              boxShadow="lg"
              bg="white"
            >
              <AlertIcon boxSize="40px" mr={0} color="green.500" />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Step {currentStep + 1} Completed 🎉
              </AlertTitle>
              <AlertDescription>
                Moving to next step automatically...
              </AlertDescription>
            </Alert>
          </Box>
        )}
        {/* Main Content */}
        <Box flex="1">
          <Text fontSize="xl" fontWeight="bold" mb={3}>
            Step {currentStep + 1} {STEPS[currentStep].title}({filledCount}/
            {totalFields})
          </Text>

          <Box
            flex="1"
            // minH="70vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            //   bgGradient="linear(to-r, purple.50, blue.50)" //  background gradient
            p={{ base: 4, md: 10 }}
          >
            <Box
              bg="white"
              p={{ base: 4, md: 10 }}
              rounded="2xl"
              shadow="2xl"
              maxW="600px"
              w="100%"
              border="1px solid"
              borderColor="gray.100"
              transition="all 0.3s"
              _hover={{ transform: "translateY(-4px)", shadow: "xl" }} //  hover animation
            >
              {STEPS[currentStep].title === "Review" ? (
                <Box>
                  {/* <Text fontSize="xl" fontWeight="bold" mb={6}>
                    Review Your Details
                  </Text> */}

                  <VStack align="stretch" spacing={4}>
                    {STEPS.filter((s) => s.fields.length > 0).map(
                      (step, stepIndex) => (
                        <Box
                          key={stepIndex}
                          p={1}
                          // borderWidth="1px"
                          // rounded="lg"
                          shadow="sm"
                          bg="white"
                        >
                          {/* Step Title */}
                          <Text
                            fontSize="lg"
                            fontWeight="bold"
                            color="purple.600"
                            mb={1}
                          >
                            {step.title}
                          </Text>

                          <SimpleGrid columns={1} spacing={3}>
                            {step.fields.map((field) => (
                              <Box
                                key={field.name}
                                // p={1}
                                borderWidth="1px"
                                rounded="md"
                                bg="gray.50"
                              >
                                <Flex justify="space-between" align="center">
                                  <Text
                                    fontWeight="bold"
                                    color="gray.700"
                                    m={3}
                                  >
                                    {field.label}
                                  </Text>
                                  <Text color="gray.900" m={3}>
                                    {Array.isArray(formData[field.name])
                                      ? formData[field.name].map((file, i) => (
                                          <div key={i}>{file.name}</div>
                                        ))
                                      : formData[field.name]}
                                  </Text>
                                </Flex>
                              </Box>
                            ))}
                          </SimpleGrid>
                        </Box>
                      )
                    )}
                  </VStack>
                </Box>
              ) : (
                activeField && (
                  <FormControl isRequired={activeField.required} mb={4}>
                    <FormLabel
                      fontWeight="bold"
                      fontSize="lg"
                      color="purple.600"
                    >
                      {activeField.label}
                    </FormLabel>

                    {activeField.type === "choice" ? (
                      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                        {activeField.options.map((opt, i) => (
                          <Box
                            key={i}
                            borderWidth="2px"
                            rounded="xl"
                            p={6}
                            textAlign="center"
                            cursor="pointer"
                            transition="all 0.2s"
                            borderColor={
                              formData[activeField.name] === opt.label
                                ? "purple.500"
                                : "gray.200"
                            }
                            bg={
                              formData[activeField.name] === opt.label
                                ? "purple.50"
                                : "white"
                            }
                            _hover={{
                              shadow: "md",
                              borderColor: "purple.300",
                              transform: "scale(1.05)",
                            }}
                            onClick={() =>
                              updateField(activeField.name, opt.label)
                            }
                          >
                            <Text fontSize="3xl">{opt.icon}</Text>
                            <Text mt={2} fontWeight="medium" color="gray.700">
                              {opt.label}
                            </Text>
                          </Box>
                        ))}
                      </SimpleGrid>
                    ) : activeField.type === "textarea" ? (
                      <Textarea
                        value={formData[activeField.name] || ""}
                        onChange={(e) =>
                          updateField(activeField.name, e.target.value)
                        }
                        placeholder={activeField.placeholder || ""}
                        focusBorderColor="purple.500"
                        shadow="sm"
                        variant="outline"
                        rows={6}
                      />
                    ) : activeField.type === "file" ? (
                      <>
                        <Input
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const newFiles = Array.from(e.target.files);
                            const existingFiles =
                              formData[activeField.name] || [];
                            updateField(activeField.name, [
                              ...existingFiles,
                              ...newFiles,
                            ]);
                            e.target.value = null; // allow re-selecting same file
                          }}
                        />

                        {/* Preview */}
                        {formData[activeField.name] &&
                          formData[activeField.name].length > 0 && (
                            <VStack align="start" mt={3} spacing={2}>
                              {formData[activeField.name].map((file, i) => (
                                <Box
                                  key={i}
                                  borderWidth="1px"
                                  rounded="md"
                                  p={3}
                                  w="100%"
                                  bg="gray.50"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <Box>
                                    <Text fontSize="sm" fontWeight="bold">
                                      {file.name}
                                    </Text>
                                    {file.type.startsWith("image/") ? (
                                      <img
                                        src={URL.createObjectURL(file)}
                                        alt="preview"
                                        style={{
                                          maxHeight: "100px",
                                          marginTop: "5px",
                                        }}
                                      />
                                    ) : (
                                      <Text fontSize="xs" color="gray.500">
                                        📄 {file.type}
                                      </Text>
                                    )}
                                  </Box>

                                  {/* ❌ Remove button */}
                                  <Button
                                    size="sm"
                                    colorScheme="red"
                                    variant="ghost"
                                    onClick={() => {
                                      const updatedFiles = formData[
                                        activeField.name
                                      ].filter((_, index) => index !== i);
                                      updateField(
                                        activeField.name,
                                        updatedFiles
                                      );
                                    }}
                                  >
                                    ❌
                                  </Button>
                                </Box>
                              ))}
                            </VStack>
                          )}
                      </>
                    ) : (
                      <Input
                        type={activeField.type}
                        value={formData[activeField.name] || ""}
                        onChange={(e) =>
                          updateField(activeField.name, e.target.value)
                        }
                        placeholder={activeField.placeholder || ""}
                        focusBorderColor="purple.500"
                        variant="outline"
                        shadow="sm"
                      />
                    )}
                  </FormControl>
                )
              )}

              <HStack mt={10} spacing={4}>
                <Button
                  onClick={handleBack}
                  isDisabled={currentStep === 0 && currentSubStep === 0}
                >
                  Back
                </Button>

                {currentStep < STEPS.length - 1 ? (
                  <Button
                    colorScheme="purple"
                    onClick={handleNextField}
                    isDisabled={
                      fields[currentSubStep]?.required &&
                      !formData[fields[currentSubStep].name]
                    }
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    colorScheme="green"
                    onClick={() => alert("Form Submitted")}
                  >
                    Submit
                  </Button>
                )}

                {!fields[currentSubStep]?.required && (
                  <Button variant="outline" onClick={handleSkip}>
                    Skip
                  </Button>
                )}
              </HStack>
            </Box>
          </Box>

          {/* Navigation Buttons */}
        </Box>
      </Flex>
    </>
  );
}
